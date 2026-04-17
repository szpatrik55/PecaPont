# ADR 0004 – API integráció

## Status
Accepted

## Context
Frontend külső API-kat használ.

## Decision
HttpClient service wrapper használata.

## Alternatives
- Direct HTTP hívások
- GraphQL

## Consequences
+ Egységes API layer
+ Könnyebb mockolás
- Extra absztrakció

## Verification
- API hívások tesztelve