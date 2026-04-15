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
   → siker esetén **S01 — Főoldal** jelenik meg.  
   **Hibaág:** hibás email vagy jelszó esetén piros hibaüzenet jelenik meg.

3. **S01 — Főoldal**  
   A főoldal és a navigációs sáv jelenik meg benne a profil és kijelentkezés menüponttal.
   A user sikeresen belépett.

**Sikerkritérium:**  
A felhasználó eléri a főoldalt és látja a navigációs menüben az új füleket.

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
   **Művelet:** „Részletek” gomb.  
   → **S03 — Tó részletek**

3. **S03 — Tó részletek**  
   A rendszer betölti a kiválasztott tó részleteit.  
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
   **Művelet:** „Hírek írása” menüpont megnyomása.  
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