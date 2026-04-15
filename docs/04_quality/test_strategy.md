# Test Strategy – PecaPont

## 1. Tesztelési cél

A tesztstratégia célja a rendszer stabilitásának, regresszióvédelmének és karbantarthatóságának biztosítása.

Kiemelt cél a fő user flow-k és a kritikus UI komponensek ellenőrzése.

---

## 2. Teszt piramis

### Unit tesztek

A komponenslogika és utility funkciók ellenőrzése.

Példák:

* komponens inicializáció
* adatbetöltés logika
* route működés

---

### Integration tesztek

Komponensek és adatforrások együttműködésének vizsgálata.

Példák:

* hírek modul + UI
* tavak modul + UI
* verseny modul + UI

---

### UI / E2E jellegű tesztek

Fő felhasználói útvonalak ellenőrzése.

Példák:

* főoldal betöltés
* tó lista megjelenítés
* verseny oldal navigáció

---

## 3. Kritikus flow-k

* tavak böngészése
* hírek megtekintése
* verseny információk elérése

---

## 4. Quality gate-ek

* Angular build sikeres
* lint hibamentes
* unit tesztek sikeresek
* dokumentáció frissítve

---

## 5. Futtatás

npm test

ng test

---

## 6. Következő cél

A szakdolgozati minimum eléréséhez a tesztek száma fokozatosan bővül legalább 30 automata tesztre.
