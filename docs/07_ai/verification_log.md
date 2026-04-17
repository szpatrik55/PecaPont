# Verification Log – PecaPont

## V-001 – Angular architektúra validáció

**AI állítás:** Az Angular megfelelő választás skálázható frontend rendszerhez.

**Kockázat:** Rossz framework választás → nehezen karbantartható rendszer.

**Ellenőrzés módja:**

* projekt build teszt
* komponensstruktúra review
* Angular routing ellenőrzés

**Eredmény:** PASS

**Következtetés:**
Az Angular megfelelő választásnak bizonyult a komponens-alapú architektúrához.

---

## V-002 – User flow validáció

**AI állítás:** A fő felhasználói flow jól lefedi az MVP-t.

**Kockázat:** Nem teljesülnek a user story acceptance criteria-k.

**Ellenőrzés módja:**

* manuális UI teszt
* route navigáció ellenőrzés

**Eredmény:** PASS

---

## V-003 – Dokumentáció konzisztencia

**AI állítás:** A dokumentáció megfelel a szakdolgozati követelményeknek.

**Kockázat:** Pontlevonás hiányzó artefaktok miatt.

**Ellenőrzés módja:**

* repo struktúra audit
* PDF checklist összevetés

**Eredmény:** PASS

---

## V-004 – Tesztelési stratégia

**AI állítás:** A jelenlegi tesztstratégia megfelel a minimum követelményeknek.

**Kockázat:** Kevés teszt → pontlevonás.

**Ellenőrzés módja:**

* meglévő spec fájl audit
* test strategy review

**Eredmény:** PARTIAL

**Következtetés:**
A tesztszám növelése szükséges.

## V-005 – Firebase Authentication és Role-based Authorization validáció

**AI állítás:**  
A Firebase Authentication biztonságos megoldás felhasználói hitelesítéshez, és kiegészíthető role-based access control (RBAC) rendszerrel.

**Kockázat:**  
Hibás konfiguráció esetén:
- jogosulatlan hozzáférés admin funkciókhoz
- felhasználói adatok szivárgása
- role ellenőrzés hiánya miatt privilege escalation
- nem védett route-ok elérése autentikáció nélkül

**Ellenőrzés módja:**

* Firebase Authentication konfiguráció ellenőrzése
* manuális login teszt különböző role-okkal:
  - user
  - admin
  - news
* role alapú route védelem tesztelése (Angular route guards)
* admin funkciók hozzáférésének ellenőrzése
* nem megfelelő role esetén hozzáférés tiltás tesztelése
* hibás bejelentkezés teszt (invalid credentials)

**Eredmény:** PASS

**Bizonyíték (evidence):**

* különböző role-okkal eltérő UI és funkcionalitás jelenik meg
* admin funkciók csak admin role-lal érhetők el
* nem autentikált felhasználó nem fér hozzá védett oldalakhoz
* nem megfelelő role esetén hozzáférés megtagadva
* Firebase-ben a felhasználók megfelelően azonosíthatók

**Következtetés:**
A rendszer megfelelően implementálja a hitelesítést és az authorization logikát.  
A role-based access control biztosítja, hogy a felhasználók csak a jogosultságuknak megfelelő funkciókat érjék el.

**További fejlesztési lehetőségek:**
- role-ok központi kezelése (pl. Firestore)
- finomabb jogosultsági szintek
- audit log admin műveletekre