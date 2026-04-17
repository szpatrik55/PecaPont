# ADR 0003 – State management

## Status
Accepted

## Context
Központi állapotkezelés szükséges.

## Decision
Service alapú state management (RxJS).

## Alternatives
- NgRx
- Local component state

## Consequences
+ Egyszerűbb implementáció
- Skálázásnál limitált

## Verification
- Service unit tesztek