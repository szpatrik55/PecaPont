# ADR-0001 – Angular frontend architektúra választása

**Státusz:** Accepted
**Dátum:** 2026-01-15

---

## Context

A PecaPont elsődleges célja egy modern, gyorsan fejleszthető webes alkalmazás létrehozása, amely jól strukturált komponens-alapú frontend architektúrát használ.

A projekt szakdolgozati céljai között szerepel a karbantarthatóság, bővíthetőség és modern webes technológiák alkalmazása.

---

## Decision

A frontend megvalósításához az **Angular framework** került kiválasztásra.

---

## Alternatívák

### React

Előnyök:

* széles körű ipari használat
* nagy ökoszisztéma

Hátrányok:

* több architekturális döntést igényel
* kevésbé opinionated

---

### Vue

Előnyök:

* gyors fejlesztés
* egyszerű szintaxis

Hátrányok:

* kevésbé enterprise fókuszú

---

## Következmények

### Pozitív

* jól strukturált komponensmodell
* beépített routing
* TypeScript natív támogatás
* könnyebb tesztelhetőség

### Negatív

* nagyobb kezdeti komplexitás
* meredekebb tanulási görbe

---

## Verification

Az architektúra helyességét az alábbiak igazolják:

* futó Angular projektstruktúra
* komponens-alapú felépítés
* unit teszt támogatás (`app.spec.ts`)
* skálázható mappastruktúra
