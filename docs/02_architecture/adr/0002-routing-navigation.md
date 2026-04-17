# ADR 0002 – Routing és navigáció

## Status
Accepted

## Context
Az alkalmazás több oldalas SPA Angularban.

## Decision
Angular Router használata lazy loadinggal.

## Alternatives
- Manual routing
- Full page reload alapú navigáció

## Consequences
+ Gyors navigáció
+ SEO korlátozott
- Bonyolultabb route config

## Verification
- Router működés tesztelve manuálisan
- E2E navigáció teszt