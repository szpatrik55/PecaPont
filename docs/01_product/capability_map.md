# Capability Map – PecaPont

| Capability                    | Kategória      | Evidence                               | Teszt                     | Státusz |
| ----------------------------- | -------------- | -------------------------------------- | ------------------------- | ------- |
| Tavak listázása               | Value          | `src/app/lakes/lakes.component.ts`     | `lakes.component.spec.ts` | Done    |
| Hírek megjelenítése           | Value          | `public/javascript/hirek.js`           | `news.spec.ts`            | Done    |
| Versenyek megjelenítése       | Value          | `public/javascript/versenyek.js`       | `competitions.spec.ts`    | Done    |
| Felhasználói autentikáció     | Productization | Firebase auth + login UI screenshot    | `auth.service.spec.ts`    | Done    |
| Role-based jogosultságkezelés | Productization | route guard + role check               | `auth.guard.spec.ts`      | Done    |
| Routing és navigáció          | Productization | Angular routing config                 | navigation e2e test       | Done    |
| Reszponzív felület            | Productization | UI screenshot (mobile + desktop)       | manuális UI teszt         | Partial |
| Hibakezelés                   | Productization | Angular error handler / fallback route | error handling test       | Partial |
| Tesztelhetőség                | Productization | `*.spec.ts` fájlok                     | unit tests                | Partial |
| Dokumentációs struktúra       | Productization | `docs/` mappa                          | dokumentáció review       | Done    |

---

## Megjegyzések

A capability map célja annak bemutatása, hogy a rendszer nem kizárólag felhasználói funkciókat tartalmaz, hanem a termékminőséghez szükséges engineering képességeket is.

A Value capability-k a felhasználói élményt biztosítják, míg a Productization capability-k a rendszer megbízhatóságát, biztonságát és karbantarthatóságát támogatják.

---

## További fejlesztési irányok

* CI/CD pipeline (GitHub Actions)
* strukturált logging
* healthcheck endpoint
* security baseline (input validation, auth protection)
* performance mérés
