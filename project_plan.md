# Project Plan – PecaPont - Horgászhely foglaló és információ szerző webalkalmazás

## Egy mondatos értékajánlat

Egy webalkalmazás, amely lehetővé teszi a felhasználók számára horgászhelyek keresését, megtekintését és térképes böngészését,
Firebase alapú valós idejű adatkezeléssel, ami nem triviális a geolokáció, valós idejű adatszinkronizáció és jogosultságkezelés együttes megvalósítása miatt.


## Képességek

| Képesség                          | Kategória      | Komplexitás | Miért nem triviális?                             |
| --------------------------------- | -------------- | ----------- | ------------------------------------------------ |
| Bejelentkezés és regisztráció     | Productization | M           | Firebase Auth integráció + session kezelés       |
| Szerepkör alapú hozzáférés        | Productization | M           | Jogosultságok kezelése Firestore szabályokkal    |
| Térképes horgászhely megjelenítés | Value          | L           | Geolokáció + marker kezelés + UI integráció      |
| Horgászhelyek CRUD műveletek      | Value          | M           | Firestore adatmodell + valós idejű frissítés     |
| Kedvencek / mentett helyek        | Value          | S           | Felhasználóhoz kötött adatok kezelése            |
| Hiba- és állapotkezelés           | Productization | M           | Aszinkron műveletek, loading state, retry logika |
| Lazy loading / pagination         | Productization | L           | Teljesítmény optimalizálás nagy adatmennyiségnél |


## A legnehezebb rész

A térképes megjelenítés és a Firestore valós idejű adatkezelés összehangolása várhatóan nem működik megfelelően első implementáció során,
mivel a térképen megjelenített objektumok és az adatbázis változásainak szinkronizálása komplex állapotkezelést és optimalizációt igényel.
Külön kihívást jelent a nagyobb adatmennyiség kezelése és a teljesítmény fenntartása (pl. túl sok marker megjelenítése esetén).


## Tech stack – indoklással

| Réteg            | Technológia             | Miért ezt és nem mást?                                       |
| ---------------- | ----------------------- | ------------------------------------------------------------ |
| UI               | Angular                 | Strukturált, skálázható framework, erős TypeScript támogatás |
| Backend / logika | Firebase (serverless)   | Nem kell külön backend, gyors fejlesztés                     |
| Adattárolás      | Firestore               | Valós idejű NoSQL adatbázis, könnyű integráció               |
| Auth             | Firebase Authentication | Kész megoldás, biztonságos, gyorsan integrálható             |


## Ami kimarad (non-goals)

- Offline működés teljes támogatása

- Komplex ajánlórendszer (pl. AI alapú helyajánlás)


## Ami még nem tiszta

- Milyen mennyiségű adatot kell kezelni (skálázás kérdése)

- Firestore szabályok finomhangolása biztonsági szempontból
