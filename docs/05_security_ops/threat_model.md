# Threat Model

## Attack surface

* Web UI (Angular alkalmazás)
* Firebase Authentication (login / user kezelés)
* Routing és route guard logika
* Külső adatforrások (API / statikus adatok)

---

## Threats

| Threat                   | Impact | Likelihood | Mitigation                                       |
| ------------------------ | ------ | ---------- | ------------------------------------------------ |
| XSS                      | High   | Medium     | Angular beépített sanitization + input validáció |
| Unauthorized access      | High   | Medium     | Angular route guards + auth ellenőrzés           |
| Privilege escalation     | High   | Medium     | Role-based access control (RBAC)                 |
| Authentication bypass    | High   | Low        | Firebase Authentication + token ellenőrzés       |
| Data leak (PII)          | High   | Low        | Firebase secure storage + HTTPS + access control |
| API misuse               | Medium | Medium     | Input validation + controlled data access        |
| Dependency vulnerability | High   | Low        | npm audit + dependency update                    |
| Broken navigation        | Low    | Medium     | Fallback route + error handling                  |

---

## Residual Risk

Alacsony–közepes.

Indoklás:

* A Firebase csökkenti az autentikációs kockázatokat
* Az Angular beépített védelmei csökkentik az XSS támadások esélyét
* A role-based access control minimalizálja a jogosultsági hibákat

---

## Verification

* manuális tesztelés (login, role alapú hozzáférés)
* route guard viselkedés ellenőrzése
* hibás login próbák tesztelése
* npm audit futtatása
* Firebase konfiguráció ellenőrzése (console)
