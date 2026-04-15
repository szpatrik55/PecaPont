# Journey 1 — Bejelentkezés és profil elérés

**Persona:**  
Egy visszatérő felhasználó szeretne belépni a rendszerbe, hogy feltölthessen képet és kezelhesse a profilját.

**Belépési pont:**  
App icon → S01 (Főoldal)

## Lépések

1. **S01 — Főoldal**  
   A felhasználó megnyitja az alkalmazást.  
   A főoldal és a navigációs sáv jelenik meg.  
   **Művelet:** a „Bejelentkezés” menüpontra kattint.  
   → **S11 — Bejelentkezés** nyílik meg.

2. **S11 — Bejelentkezés**  
   A user kitölti az email és jelszó mezőket.  
   **Művelet:** „Bejelentkezés” gomb megnyomása.  
   → siker esetén **S09 — Profil** jelenik meg.  
   **Hibaág:** hibás email vagy jelszó esetén piros hibaüzenet jelenik meg.

3. **S09 — Profil**  
   A rendszer betölti a felhasználó adatait és korábbi feltöltéseit.  
   A user sikeresen belépett.

**Sikerkritérium:**  
A felhasználó eléri a profil oldalát és látja a saját adatait.

**Mért időtartam:**  
10–15 másodperc / 3 kattintás

# Journey 2 — Tó keresése és részletek megtekintése

**Persona:**  
Egy hobbi horgász szeretne megfelelő tavat találni a következő hétvégére.

**Belépési pont:**  
App icon → S01 (Főoldal)

## Lépések

1. **S01 — Főoldal**  
   A felhasználó megnyitja az alkalmazást.  
   **Művelet:** „Tavak” menüpont kiválasztása.  
   → **S02 — Tavak**

2. **S02 — Tavak**  
   A user megnyitja a tólistát.  
   **Művelet:** „Lista megnyitása” gomb.  
   → **S03 — Tavak listája**

3. **S03 — Tavak listája**  
   A rendszer betölti a tavak listáját.  
   A user kiválaszt egy tavat.  
   → részletes információk jelennek meg.  
   **Hibaág:** ha nincs találat, empty state üzenet jelenik meg.

**Sikerkritérium:**  
A felhasználó megtalálja és megnyitja a számára megfelelő tavat.

**Mért időtartam:**  
8–12 másodperc / 3 kattintás

# Journey 3 — Hír létrehozása admin felhasználóként

**Persona:**  
Egy admin felhasználó új hírt szeretne közzétenni az alkalmazásban.

**Belépési pont:**  
App icon → S01 (Főoldal) → bejelentkezett admin user

## Lépések

1. **S01 — Főoldal**  
   Az admin user megnyitja az alkalmazást.  
   **Művelet:** „Hírek” menüpont.  
   → **S04 — Hírek**

2. **S04 — Hírek**  
   A rendszer betölti az aktuális híreket.  
   **Művelet:** „Új hír” gomb megnyomása.  
   → **S05 — Hírek írása**

3. **S05 — Hírek írása**  
   A user kitölti a cím és tartalom mezőket.  
   **Művelet:** Mentés  
   → **D01 — Hír szerkesztő modál**, majd mentés után **S04**

   **Hibaág:**  
   üres cím vagy tartalom esetén validációs hibaüzenet.

**Sikerkritérium:**  
Az új hír megjelenik a hírek listájában.

**Mért időtartam:**  
20–30 másodperc / 4–5 kattintás