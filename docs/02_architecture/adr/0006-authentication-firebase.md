# ADR 0006 – Authentication Firebase

## Status
Accepted

## Context
Felhasználói autentikáció szükséges.

## Decision
Firebase Authentication használata.

## Alternatives
- Saját backend auth
- JWT alapú auth

## Consequences
+ Gyors implementáció
+ Biztonságos (Google)
- Külső dependency

## Verification
- Login működés tesztelve
- Firebase console ellenőrzés