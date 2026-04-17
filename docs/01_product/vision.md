# Product Vision – PecaPont

## 1. Probléma leírás

A horgászok számára jelenleg nehézkes egy helyen megbízható információt találni tavakról, versenyekről, hírekről és horgászhelyekről. Az információk gyakran szétszórtan, különböző weboldalakon vagy közösségi média felületeken érhetők el, ami időigényessé és kényelmetlenné teszi a tervezést.

A PecaPont célja, hogy egy központi, könnyen használható digitális platformot biztosítson, ahol a felhasználók gyorsan hozzáférhetnek minden releváns horgászati információhoz.

---

## 2. Célfelhasználók (Personák)

### Persona 1 – Hobbi horgász

* 25–50 év közötti felhasználó
* hétvégi horgászatokat tervez
* fontos számára a tavak és halfajok információja
* gyors, mobilbarát használatot vár el
* rendelkezhet felhasználói fiókkal

### Persona 2 – Versenyhorgász

* rendszeresen részt vesz eseményeken
* figyeli a versenynaptárt
* gyors hozzáférést szeretne a nevezési információkhoz
* bejelentkezve követi a versenyeket

---

## 3. Értékajánlat

A PecaPont egy olyan integrált platform, amely:

* összegyűjti a tavak adatait
* megjeleníti a horgászversenyeket
* híreket és aktuális információkat biztosít
* lehetővé teszi felhasználói fiókok használatát (pl. személyre szabott élmény)
* javítja a felhasználói élményt modern, reszponzív webes felületen

---

## 4. Siker definíció

### North Star metric

* havi aktív felhasználók száma

### Guardrail metrikák

* oldalletöltési idő < 2 mp
* hibaarány < 1%
* visszatérő látogatók aránya > 40%

---

## 5. Non-goals

A jelenlegi scope-ban a rendszer nem célja:

* online jegyvásárlás
* közösségi funkciók (pl. chat, kommentelés)
* fizetési integráció
* natív mobilalkalmazás

---

## 6. Kockázatok és mitigációk

| Kockázat                     | Hatás                | Mitigáció                                    |
| ---------------------------- | -------------------- | -------------------------------------------- |
| Hiányos adatforrások         | pontatlan információ | manuális validáció                           |
| UI komplexitás               | rossz UX             | iteratív tesztelés                           |
| teljesítményproblémák        | lassú oldal          | lazy loading, optimalizálás                  |
| Felhasználói adatok kezelése | adatvédelmi kockázat | Firebase Authentication + biztonságos config |
