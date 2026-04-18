# Deploy Runbook

## Környezeti modell

Az alkalmazás két környezetben fut:

* Local (fejlesztői környezet)
* Production (Firebase Hosting)

---

## Előfeltételek

* Node.js telepítve
* Angular CLI telepítve
* Firebase CLI telepítve
* Firebase projekt konfigurálva (`firebase login`, `firebase init`)

---

## Konfiguráció

* A Firebase konfiguráció az Angular environment fájlokban található:

  * `environment.ts`
  * `environment.prod.ts`

* Nem tartalmaz érzékeny adatokat (Firebase public config)

---

## Deploy lépések (Production)

1. Függőségek telepítése:

```
npm install
```

2. Production build:

```
ng build --configuration production
```

3. Firebase deploy:

```
firebase deploy
```

4. Sikeres deploy után az alkalmazás elérhető a Firebase Hosting URL-en

---

## Lokális futtatás

```
npm install
ng serve
```

Az alkalmazás elérhető: http://localhost:4200

---

## Rollback stratégia

* Firebase Hosting verziózott deploy-t használ
* Korábbi verzió visszaállítható:

```
firebase hosting:rollback
```

---

## Verziózás

* Git commit hash alapján történik
* Deploy minden esetben verziózott

---

## Gyakori hibák

* Firebase nincs bejelentkezve → `firebase login`
* Hibás build → Angular error a konzolban
* Deploy hiba → Firebase CLI hibaüzenet

## Runbook – Incident kezelési forgatókönyvek

### Incident 1: Firebase nem elérhető

**Tünetek:**

* Az alkalmazás betölt, de az adatok (pl. tavak listája) nem jelennek meg
* Üres lista látható
* Browser console hibát jelez (pl. network error vagy permission denied)

**Diagnózis:**

1. Browser console ellenőrzése
2. Network tab → Firebase requestek státusza
3. Firebase Console státusz ellenőrzése

**Ideiglenes mitigáció:**

* Oldal újratöltése (retry)
* Internet kapcsolat ellenőrzése
* Firebase újrahívás (manual retry)

**Végleges megoldás:**

* Hibakezelés implementálása (retry logika)
* Felhasználói hibaüzenet megjelenítése
* Monitoring bővítése

---

### Incident 2: Felhasználó nem tud bejelentkezni

**Tünetek:**

* Login sikertelen
* Hibaüzenet jelenik meg

**Diagnózis:**

1. Firebase Auth státusz ellenőrzése
2. Console hibák elemzése
3. Helyes email/jelszó ellenőrzése

**Ideiglenes mitigáció:**

* Újrapróbálkozás
* Jelszó reset

**Végleges megoldás:**

* Auth error kezelés javítása
* User feedback javítása