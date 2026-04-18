# Observability

## Logging

Az alkalmazás az alábbi logolási szinteket használja:

* info: normál működés
* warn: nem kritikus problémák
* error: hibák

A logolás jelenleg a böngésző konzolban történik.

---

## Strukturált logolás

A logok tartalmazhatják:

* timestamp
* hiba típusa
* user action (ha releváns)

---

## Healthcheck

Healthcheck definíció:

* Az alkalmazás betöltődik hiba nélkül
* Firebase kapcsolat működik (adat lekérdezés sikeres)

---

## Metrikák

Az alábbi metrikák figyelhetők:

* Oldal betöltési idő (load time)
* Hibaarány (error rate)
* Firebase lekérdezések válaszideje

---

## Hibakeresés (Debugging)

Hiba esetén:

1. Browser console ellenőrzése
2. Network tab (Firebase requestek)
3. Firebase console ellenőrzése
4. Angular error stack elemzése

---

## Log példa

```
ERROR: Firestore query failed - permission denied
```

---

## Limitációk

* Nincs központi loggyűjtés
* Nincs backend logging rendszer