# Scope Contract – PecaPont

## 1. MVP User Story lista

### US-01 – Tavak böngészése

Felhasználóként szeretném megtekinteni az elérhető tavakat, hogy kiválaszthassam a számomra megfelelő helyszínt.

**Acceptance criteria**

* a tavak listája megjelenik
* név és alapinformáció látható
* kattintható részletek

---

### US-02 – Horgászversenyek megtekintése

Felhasználóként szeretném látni az aktuális versenyeket, hogy tájékozódni tudjak az eseményekről.

**Acceptance criteria**

* versenyek listázása
* dátum megjelenítése
* helyszín megjelenítése

---

### US-03 – Hírek olvasása

Felhasználóként szeretnék horgászattal kapcsolatos híreket olvasni.

**Acceptance criteria**

* hírek listázása
* cím + rövid leírás
* részletes nézet

---

### US-04 – Felhasználói regisztráció és bejelentkezés

Felhasználóként szeretnék regisztrálni és bejelentkezni, hogy személyre szabott funkciókat használhassak.

**Acceptance criteria**

* regisztráció email + jelszó segítségével
* sikeres login esetén a felhasználó bejelentkezett állapotba kerül
* hibás adatok esetén hibaüzenet jelenik meg
* kijelentkezés működik

---

### US-05 – Szerepkör alapú hozzáférés (RBAC)

Felhasználóként csak a jogosultságomnak megfelelő funkciókat szeretném elérni.

**Acceptance criteria**

* user role → alap funkciók elérése
* admin role → admin funkciók elérése
* news role → hírek kezelése (ha van ilyen funkció)
* nem megfelelő role esetén hozzáférés tiltva

---

## 2. Stretch célok

* keresési funkció
* szűrés tó típus szerint
* felhasználói profil bővítése
* role-ok finomítása (pl. több jogosultsági szint)

---

## 3. Korlátok

* web platform
* Angular frontend
* Firebase Authentication használata
* külső adatforrások / statikus adatok

---

## 4. Definition of Done

Egy funkció akkor tekinthető késznek, ha:

* implementálva van
* UI szinten kipróbálható
* legalább 1 automata teszt védi
* dokumentációban szerepel
* hibakezelés legalább alapszinten megoldott
* jogosultságkezelés megfelelően működik (ha releváns)
