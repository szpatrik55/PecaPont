# Privacy és Licensing

## Adatkategóriák
Az alkalmazás az alábbi adatokat kezeli:
- Felhasználó neve (PII)
- Email cím (PII)
- Autentikációs azonosítók (Firebase Auth)

## Adatáramlás
- Felhasználó → Frontend (Angular)
- Frontend → Firebase Authentication
- Frontend → Firebase Database (ha használsz)

## Adatmegőrzés
- Az adatok a Firebase rendszerében tárolódnak
- A felhasználó kérésére törölhetők (account delete)

## Hozzáférés
- A felhasználó csak a saját adatait látja
- Admin funkció nincs (ha nincs)

## Biztonság
- Firebase Authentication kezeli a hitelesítést
- HTTPS kommunikáció
- Angular input validáció

## AI használat és adatok
- A rendszer nem küld személyes adatot AI szolgáltatásoknak

## Harmadik fél szolgáltatások
- Firebase (Google)
- Angular framework

## Licensing
- Angular: MIT
- Egyéb függőségek: npm licenc kompatibilis

## GDPR megfelelés
- A felhasználó kérheti adatainak törlését
- Az adatok csak a szolgáltatás működéséhez szükségesek
- Nem történik adatértékesítés vagy harmadik félnek továbbítás