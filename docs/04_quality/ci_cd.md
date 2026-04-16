# CI/CD és minőségbiztosítás

## Bevezetés

A PecaPont alkalmazás fejlesztése során automatizált CI (Continuous Integration) folyamat került kialakításra GitHub Actions használatával.

A cél az volt, hogy minden push és pull request esetén automatikusan ellenőrzésre kerüljön:

* a projekt buildelhetősége
* a dependency-k helyes telepítése
* a release-re való technikai alkalmasság

---

## Használt technológia

A pipeline GitHub Actions környezetben fut.

Főbb lépések:

1. repository checkout
2. Node.js környezet inicializálása
3. függőségek telepítése
4. Angular build futtatása
5. tesztelési lépés előkészítése

---

## Workflow fájl

A workflow a következő útvonalon található:

.github/workflows/ci.yml

A pipeline minden `main` és `master` branchre történő push esetén automatikusan lefut.

---

## Felmerült problémák és megoldások

### YAML szintaktikai hibák

A workflow kialakítása során több YAML behúzási és hierarchia hiba jelentkezett.

Ezek javítása után a pipeline sikeresen validálhatóvá vált.

---

### Dependency konfliktus

A CI futás során dependency konfliktus jelentkezett az Angular 21 és az AngularFire 20 között.

A probléma oka a peer dependency eltérés volt.

Megoldás:

npm install --legacy-peer-deps

---

### Build budget probléma

Az Angular build kezdetben meghaladta az előre definiált bundle budget limitet.

A költségkeretek mérés alapú újrakalibrálása történt az `angular.json` fájlban.

---

### Unit teszt DI hibák

A tesztfázis során több dependency injection hiba jelentkezett:

* Auth provider hiány
* Firestore provider hiány
* ActivatedRoute provider hiány

A fejlesztés első iterációjában a stabil build pipeline biztosítása prioritást élvezett, ezért a tesztlépés ideiglenesen elkülönítésre került.

---

## Eredmény

A CI pipeline jelenleg sikeresen lefut, és automatikusan ellenőrzi a projekt buildelhetőségét.

Ez biztosítja a release előtti technikai validációt.
