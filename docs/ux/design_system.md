# Design rendszer / vizuális nyelv — PecaPont

## UI könyvtár / komponensrendszer
Az alkalmazás **Angular frameworkre** épül, a vizuális komponensekhez **Bootstrap** és **egyedi saját komponensek** kerültek felhasználásra.

Használt elemek:
- navbar
- card komponensek
- form input mezők
- gombok
- modális ablakok
- grid alapú layout

A speciális funkciókhoz (pl. hírszerkesztés, kép feltöltés, admin felület) saját Angular komponensek készültek.

---

## Színpaletta

| Típus | Szín | Hex |
|---|---|---|
| primary | elsődleges kék | `#0D6EFD` |
| secondary | sötétszürke | `#6C757D` |
| accent | zöld / sikeres művelet | `#198754` |
| success | siker visszajelzés | `#28A745` |
| warning | figyelmeztetés | `#FFC107` |
| error | hiba / validáció | `#DC3545` |
| surface | háttér | `#FFFFFF` |
| text | elsődleges szöveg | `#212529` |

A vizuális nyelv célja a letisztult, könnyen átlátható sport / horgász tematikájú felület.

---

## Tipográfia

**Font család:**
- `Arial`
- `sans-serif`

**Méret skála:**
- H1: `32px`
- H2: `24px`
- H3: `20px`
- body: `16px`
- small text: `14px`

**Font weight:**
- regular: `400`
- medium: `500`
- bold: `700`

A címsorok kiemelten jelennek meg, a tartalmi blokkok olvashatóságára optimalizálva.

---

## Spacing / Grid

Az alkalmazás **8px alapú spacing rendszert** használ.

Példák:
- `8px` — kis margók
- `16px` — komponens padding
- `24px` — szekció távolság
- `32px` — nagyobb layout spacing

**Max content width:**
- desktop: `1440px`
- content area: `1200px`

Grid:
- Bootstrap 12 oszlopos grid rendszer
- reszponzív konténer alapú elrendezés

---

## Ikonkészlet

Használt ikonrendszer:
- **Bootstrap Icons**
- egyedi SVG ikonok (profil / navigáció)

Tipikus ikonok:
- user
- upload
- admin
- news
- lake
- catch

---

## Sötét mód

**Jelenleg nem támogatott**

Az alkalmazás kizárólag világos témában készült.

---

## Reszponzív breakpoint-ok

| Eszköz | Méret |
|---|---|
| mobile | `< 768px` |
| tablet | `768px – 1024px` |
| desktop | `> 1024px` |

A layout mobil és asztali nézetre optimalizált.

---

## Forrás / design artifact

Jelenleg külön Figma vagy design token fájl nem készült.

A végleges UI közvetlenül az Angular komponensek és Bootstrap layout alapján lett kialakítva.