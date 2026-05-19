# 🎣 PecaPont

PecaPont egy Angular és Firebase alapú webalkalmazás, amely a horgászok számára biztosít központi platformot tavak, versenyek, hírek és foglalások kezelésére.

A projekt a Szegedi Tudományegyetemen készült szakdolgozat részeként.

---

## 🚀 Funkciók

### Felhasználói funkciók

* regisztráció és bejelentkezés
* Google alapú hitelesítés
* tavak böngészése és keresése
* tó részletes adatlapok
* foglalási rendszer
* fogások feltöltése
* értékelések és vélemények
* profil kezelés

### Közösségi és szerkesztői funkciók

* hírek publikálása
* versenyek kezelése
* galéria rendszer
* közösségi tartalmak megjelenítése

### Jogosultságkezelés

* adminisztrátor
* újságíró
* szervező
* tókezelő
* felhasználó

---

## 🛠 Technológiák

### Frontend

* Angular
* TypeScript
* SCSS
* Angular Signals
* Angular Router

### Backend / Cloud

* Firebase
* Firestore
* Firebase Authentication
* Firebase Storage
* Firebase Hosting

### Fejlesztői eszközök

* GitHub
* GitHub Actions
* Vitest
* Angular CLI
* Draw.io

### AI támogatás

* ChatGPT
* Gemini AI

---

## ⚡ Telepítés

### Függőségek telepítése

```bash
npm install --legacy-peer-deps
```

### Fejlesztői szerver indítása

```bash
ng serve
```

### Alkalmazás elérése

```text
http://localhost:4200
```

---

## 🧪 Kipróbálás

Az alkalmazás az alábbi próba felhasználókkal tesztelhető:

| Szerepkör | Email | Jelszó |
|---|---|---|
| Adminisztrátor | admin@pecapont.com | PecaPont*1 |
| Tókezelő | tokezelo@pecapont.com | PecaPont*1 |
| Szervező | szervezo@pecapont.com | PecaPont*1 |
| Újságíró | ujsagiro@pecapont.hu | PecaPont*1 |
| Felhasználó | regisztrációval elérhető | |

Bejelentkezés után a különböző jogosultsági szintekhez tartozó funkciók kipróbálhatók.


## 🏗 Build

```bash
npm run build
```

---

## 🧪 Tesztelés

### Tesztek futtatása

```bash
npm test -- --watch=false
```

### Automatizált ellenőrzések

* komponens tesztek
* route guard tesztek
* alapvető UI validációk
* CI build ellenőrzés GitHub Actions segítségével

### Manuálisan tesztelt funkciók

* regisztráció
* bejelentkezés
* tófoglalás
* tókezelői jóváhagyás / elutasítás
* hírszerkesztés
* versenyszerkesztés
* fogás feltöltés
* jogosultságkezelés

---

## 🔐 Biztonság

A projekt Firebase Security Rules alapú jogosultságkezelést használ.

A rendszer:

* szerepkör alapú hozzáférés-kezelést alkalmaz
* route guard védelmet használ
* Firestore szabályokkal védi az adatokat

---

## 📂 Dokumentáció

A szakdolgozati és fejlesztői dokumentáció a repository részeként érhető el.

Főbb dokumentumok:

* architektúra
* tesztelési dokumentáció
* AI használati dokumentáció
* Firestore rules
* rendszertervek
* mellékletek

---

## 🌐 Hosted alkalmazás

Firebase Hosting segítségével publikálva.

pecapont--pecapont-50489.europe-west4.hosted.app

---

## 👨‍💻 Fejlesztő

Szabó Patrik Péter
Szegedi Tudományegyetem
Programtervező informatikus

---

A projekt szakdolgozati célból készült.
