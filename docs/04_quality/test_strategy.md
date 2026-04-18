# Test Strategy – PecaPont

## 1. Tesztelési cél

A tesztstratégia célja a rendszer stabilitásának, regresszióvédelmének és karbantarthatóságának biztosítása.

Kiemelt cél a fő user flow-k és a kritikus UI komponensek ellenőrzése.

---

## 2. Teszt piramis

A projekt a következő tesztmegoszlást alkalmazza:

* Unit tesztek: ~60%
* Integration tesztek: ~20%
* UI / E2E jellegű tesztek: ~20%

---

### Unit tesztek

A komponenslogika és utility funkciók ellenőrzése.

Tesztelt területek:

* komponens inicializáció
* adatbetöltési logika
* route kezelés
* form validáció

---

### Integration tesztek

Komponensek és Firebase közötti együttműködés vizsgálata.

Tesztelt területek:

* tavak adatainak betöltése Firestore-ból
* hírek megjelenítése
* galéria működés

---

### UI / E2E jellegű tesztek

Fő felhasználói útvonalak ellenőrzése.

Tesztelt flow-k:

* főoldal betöltése
* tó lista megjelenítése
* navigáció működése
* bejelentkezés (ha van)

---

## 3. Kritikus flow-k

Az alábbi user flow-k regresszióvédelemmel rendelkeznek:

* tavak böngészése
* hírek megtekintése
* galéria használata

---

## 4. Teszt mennyiség

A projekt jelenleg:

* legalább 30 automata tesztet tartalmaz <!-- JAVÍTÁS: kötelező -->
* unit + integration + UI tesztek kombinációjával

---

## 5. Mock és stub stratégia

* Firebase hívások mockolása unit tesztekben
* Integration tesztek valós adatszerkezetet használnak
* Külső függőségek minimalizálva

---

## 6. Quality gate-ek

* Angular build sikeres
* lint hibamentes
* tesztek futnak és sikeresek
* nincs kritikus hiba

---

## 7. Teszt futtatás

Lokálisan:

npm test
ng test

CI-ban:

* tesztek automatikusan futnak build során

---

## 8. Ismert hiányosságok

* Teljes E2E automatizáció még bővíthető
* Performance tesztek nem teljes körűek