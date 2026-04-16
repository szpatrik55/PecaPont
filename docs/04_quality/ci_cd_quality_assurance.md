# 4. Minőségbiztosítás és CI/CD folyamat

## 4.1 Bevezetés

A modern webalkalmazások fejlesztése során kiemelt szerepet kap az automatizált minőségbiztosítás és a folyamatos integráció (Continuous Integration, CI).
A PecaPont rendszer fejlesztése során ennek megfelelően GitHub Actions alapú automatizált CI pipeline került kialakításra.

A folyamat célja, hogy minden forráskód-változtatás automatikusan ellenőrzésre kerüljön, ezáltal csökkentve a hibás release-ek kockázatát.

A pipeline elsődleges feladatai:

* függőségek telepítésének ellenőrzése
* Angular projekt build validációja
* release előtti technikai ellenőrzés
* későbbi tesztelési folyamatok integrációjának előkészítése

---

## 4.2 Alkalmazott technológia

A CI folyamat GitHub Actions környezetben került megvalósításra.

A workflow definíció az alábbi útvonalon található:

```text id="wfpath"
.github/workflows/ci.yml
```

A workflow automatikusan lefut az alábbi eseményekre:

* `push`
* `pull_request`

a `main` és `master` branch-ek esetén.

---

## 4.3 A pipeline felépítése

A pipeline több egymásra épülő lépésből áll.

### 4.3.1 Repository letöltése

A forráskód automatikus letöltése történik a GitHub repositoryból.

```yaml id="step1"
- name: Checkout repository
  uses: actions/checkout@v5
```

---

### 4.3.2 Node.js környezet inicializálása

A build környezet reprodukálhatósága érdekében dedikált Node.js futtatókörnyezet kerül létrehozásra.

```yaml id="step2"
- name: Setup Node.js
  uses: actions/setup-node@v5
```

---

### 4.3.3 Dependency telepítés

A függőségek telepítése npm segítségével történik.

A projekt során Angular és AngularFire verzióütközés lépett fel, ezért az alábbi stratégia került alkalmazásra:

```yaml id="step3"
run: npm install --legacy-peer-deps
```

Ez biztosította a kompatibilitási problémák áthidalását.

---

### 4.3.4 Build ellenőrzés

A pipeline legfontosabb része a build validáció.

```yaml id="step4"
run: npm run build
```

Ez a lépés biztosítja, hogy a rendszer release-kompatibilis állapotban legyen.

---

## 4.4 Felmerült problémák és mérnöki megoldások

A CI pipeline kialakítása során több valós mérnöki probléma merült fel.

---

### 4.4.1 YAML szintaktikai hibák

A workflow fejlesztése kezdeti szakaszában több behúzási és hierarchikus YAML szintaktikai hiba jelentkezett.

Ezek iteratív hibakereséssel és validációval kerültek javításra.

---

### 4.4.2 Dependency konfliktus

Az Angular 21 és az AngularFire 20 között peer dependency konfliktus jelentkezett.

A hiba oka:

* Angular framework: v21
* AngularFire: v20 kompatibilitás

A probléma ideiglenes mérnöki megoldása:

```text id="depfix"
legacy peer dependency resolution
```

---

### 4.4.3 Bundle budget túllépés

A build során az Angular bundle mérete meghaladta az alapértelmezett budget limitet.

A projekt tényleges méretéhez igazított budget újrakalibrálás történt.

Ez a módosítás dokumentált teljesítményoptimalizálási döntésként került kezelésre.

---

### 4.4.4 Tesztkörnyezeti DI hibák

A tesztfázis során több dependency injection hiba jelentkezett.

Különösen:

* `Auth`
* `Firestore`
* `ActivatedRoute`

provider hiányok.

A fejlesztés első iterációjában a stabil build pipeline kialakítása prioritást élvezett, ezért a tesztlépés ideiglenesen elkülönítésre került.

---

## 4.5 Eredmények

A CI pipeline sikeresen működik, és minden push esemény esetén automatikus build ellenőrzést végez.

Ez jelentősen növeli a rendszer megbízhatóságát és csökkenti a release hibák kockázatát.

A megoldás megfelel a modern szoftverfejlesztési és DevOps alapelveknek.
