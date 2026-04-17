# Quality Attributes

## Áttekintés
Ez a dokumentum a rendszer nemfunkcionális követelményeit írja le.

---

## 1. Performance
- Oldalbetöltési idő: p95 < 2s
- API válaszidő: < 500ms

## 2. Reliability
- Hibaarány < 1%
- Graceful fallback külső API hibánál

## 3. Security
- Unauthorized hozzáférés blokkolva
- Input validáció minden user inputnál

## 4. Usability
- Egyszerű navigáció
- Mobilbarát UI

## 5. Maintainability
- Moduláris Angular architektúra
- Könnyen bővíthető komponensek

## 6. Observability
- Logging minden kritikus eseménynél
- Hibák visszakövethetők

---

# Quality Attribute Scenarios

## Scenario 1 – Performance

- Source: Felhasználó
- Stimulus: Oldal megnyitása
- Environment: Normál használat
- Artifact: Frontend alkalmazás
- Response: Oldal betöltése < 2 másodperc
- Measure: p95 latency < 2s

---

## Scenario 2 – Reliability

- Source: Külső API hiba
- Stimulus: API nem válaszol
- Environment: Runtime
- Artifact: API integration layer
- Response: Hibaüzenet + retry lehetőség
- Measure: Error handling sikeres 100%-ban