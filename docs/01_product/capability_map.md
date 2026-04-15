# Capability Map – PecaPont

| Capability              | Kategória      | Evidence                         | Teszt               | Státusz |
| ----------------------- | -------------- | -------------------------------- | ------------------- | ------- |
| Tavak listázása         | Value          | `src/app/` tavak komponens       | `app.spec.ts`       | Done    |
| Hírek megjelenítése     | Value          | `public/javascript/hirek.js`     | `app.spec.ts`       | Done    |
| Versenyek megjelenítése | Value          | `public/javascript/versenyek.js` | `app.spec.ts`       | Done    |
| Reszponzív felület      | Productization | UI screenshot                    | manuális UI teszt   | Partial |
| Hibakezelés             | Productization | Angular route fallback           | unit test planned   | Planned |
| Dokumentációs struktúra | Productization | `docs/`                          | dokumentáció review | Done    |
| Tesztelhetőség          | Productization | `*.spec.ts`                      | unit tests          | Partial |

---

## Megjegyzések

A capability map célja annak bemutatása, hogy a rendszer nem kizárólag felhasználói funkciókat tartalmaz, hanem a termékminőséghez szükséges engineering képességeket is.

A következő iterációkban a Productization capability-k tovább bővülnek:

* CI/CD
* logging
* healthcheck
* security baseline
