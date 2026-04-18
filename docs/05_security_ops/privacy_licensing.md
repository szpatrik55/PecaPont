# Privacy és Licensing

## Adatkategóriák

Az alkalmazás az alábbi adatokat kezeli:

* Felhasználó neve (PII)
* Email cím (PII)
* Felhasználói szerepkör (role)
* Autentikációs azonosítók (Firebase Auth)
* Feltöltött képek (Firebase Storage)

---

## Adatáramlás

* Felhasználó → Angular frontend
* Frontend → Firebase Authentication (login)
* Frontend → Firebase Firestore (tavak, felhasználók, galéria, hírek)
* Frontend → Firebase Storage (képfeltöltés)

---

## Adatmegőrzés

* Az adatok a Firebase rendszerében tárolódnak
* A felhasználó kérheti adatainak törlését
* Törlés esetén a felhasználóhoz tartozó adatok eltávolításra kerülnek

---

## Hozzáférés

* A felhasználó csak a saját adatait olvashatja
* Admin jogosultságú felhasználó kezelheti a felhasználókat
* A hozzáférést Firestore security rules szabályozzák

---

## Biztonság

* Firebase Authentication kezeli a hitelesítést
* Firestore security rules enforce-olják a jogosultságokat
* HTTPS kommunikáció
* Angular input validáció

---

## AI használat és adatok

* A rendszer nem küld személyes adatot AI szolgáltatásoknak

---

## Harmadik fél szolgáltatások

* Firebase (Google)
* Angular framework

---

## Licensing

* Angular: MIT
* Egyéb függőségek: npm licenc kompatibilis

---

## GDPR megfelelés

* A felhasználó kérheti adatainak törlését
* Az adatok csak a szolgáltatás működéséhez szükségesek
* Nem történik adatértékesítés vagy harmadik félnek továbbítás
