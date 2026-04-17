# ADR 0005 – Error handling

## Status
Accepted

## Context
Egységes hibakezelés szükséges.

## Decision
Global error handler + interceptor.

## Alternatives
- Component szintű kezelés
- No handling

## Consequences
+ Konzisztens UX
- Több boilerplate

## Verification
- Hibakezelési tesztek
- Manuális teszt