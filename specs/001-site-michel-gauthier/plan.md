# Implementation Plan: Site Vitrine Michel Gauthier

**Branch**: `001-site-michel-gauthier` | **Date**: 2026-05-07 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/001-site-michel-gauthier/spec.md`

## Summary

Site vitrine 4 pages pour l'artiste Michel Gauthier, administrable sans compétences techniques.
Stack retenue : **Next.js 14+ (App Router, TypeScript)** + **Sanity.io v3** (CMS headless) +
**Vercel** (hébergement et déploiement automatique). Le Sanity Studio est embarqué dans
l'application (`/studio`) et permet à l'artiste de gérer ses contenus avec son compte
email + mot de passe, sans aucune compétence technique.

## Technical Context

**Language/Version**: TypeScript 5.x / Node.js 20 LTS
**Primary Dependencies**: Next.js 14 (App Router), Sanity.io v3, Tailwind CSS 3,
  yet-another-react-lightbox
**Storage**: Sanity Content Lake (base documentaire hébergée, sauvegardes automatiques)
**Testing**: N/A — hors périmètre v1 (non requis dans le spec)
**Target Platform**: Web responsive (mobile-first) — déployé sur Vercel (CDN mondial)
**Project Type**: Web application (site vitrine + CMS headless intégré)
**Performance Goals**: Pages < 3s (SC-001), filtrage galerie < 1s (SC-006),
  images auto-optimisées (WebP via Sanity CDN + next/image)
**Constraints**: Interface admin entièrement en français (SC-007) ; aucune compétence
  technique requise pour la gestion du contenu (Principe I constitution)
**Scale/Scope**: ~50–200 œuvres, 1 artiste, 1 administrateur unique, trafic modéré

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principe | Exigence | Statut | Justification |
|----------|----------|--------|---------------|
| I. Maintenabilité Non-Technique | Admin sans code, FR | ✅ PASS | Sanity Studio embarqué — gestion complète des contenus en français, compte email+password avec reset natif |
| II. Sobriété Visuelle | Design sobre, responsive | ✅ PASS | Tailwind CSS palette neutre, grille aérée, Next.js Image pleine qualité |
| III. Intégrité des Données d'Œuvre | Titre + Image requis, section enum | ✅ PASS | Schéma Sanity avec `.validation(r => r.required())` sur titre, image, section |
| IV. Architecture de Pages Fixe | Exactement 4 pages | ✅ PASS | 4 routes Next.js : `/(site)/page.tsx`, `/galerie`, `/expositions`, `/contact` |
| V. Simplicité et Pérennité | Stack minimale, < 3s, images optimisées | ✅ PASS | next/image + Sanity CDN, Vercel edge, dépendances minimales et pérennes |

**Résultat : GATE PASSED ✅ — Aucune violation constitutionnelle. Procéder à la Phase 0.**

## Project Structure

### Documentation (this feature)

```text
specs/001-site-michel-gauthier/
├── plan.md              # Ce fichier (/speckit-plan)
├── research.md          # Phase 0 — décisions stack et alternatives
├── data-model.md        # Phase 1 — schémas Sanity et types TypeScript
├── quickstart.md        # Phase 1 — guide de démarrage développeur
├── contracts/           # Phase 1 — GROQ queries et contrats API
│   ├── queries.groq     # Toutes les queries par page
│   └── types.ts         # Types TypeScript du contrat de données
└── tasks.md             # Phase 2 — généré par /speckit-tasks
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx              # Layout commun (nav + footer)
│   │   ├── page.tsx                # Page Accueil
│   │   ├── galerie/
│   │   │   └── page.tsx            # Page Galerie (3 sections)
│   │   ├── expositions/
│   │   │   └── page.tsx            # Page Expositions + Distinctions
│   │   └── contact/
│   │       └── page.tsx            # Page Contact
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx            # Sanity Studio embarqué
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── gallery/
│   │   ├── GalleryGrid.tsx         # Grille des œuvres filtrables
│   │   ├── ArtworkCard.tsx         # Carte d'une œuvre
│   │   ├── SectionFilter.tsx       # Onglets Terre / Neige / Mer
│   │   └── ArtworkModal.tsx        # Lightbox au clic
│   ├── home/
│   │   └── ArtistPresentation.tsx  # Photo + biographie
│   ├── expositions/
│   │   ├── ExpositionsList.tsx     # Listes à venir / passées
│   │   └── DistinctionsList.tsx    # Section distinctions
│   └── contact/
│       └── ContactInfo.tsx         # Email (mailto) + téléphone
├── sanity/
│   ├── schemas/
│   │   ├── artiste.ts              # Singleton artiste
│   │   ├── oeuvre.ts               # Œuvres avec section
│   │   ├── exposition.ts           # Expositions (date = classification auto)
│   │   ├── distinction.ts          # Distinctions
│   │   └── contact.ts              # Singleton contact
│   ├── queries.ts                  # GROQ queries (import depuis contracts/)
│   └── client.ts                  # Sanity client (server + browser)
└── types/
    └── index.ts                    # Re-export des types depuis contracts/

public/
sanity.config.ts                    # Configuration Sanity Studio
next.config.ts
tailwind.config.ts
package.json
```

**Structure Decision**: Application Next.js unique avec Sanity Studio co-localisé à la route
`/studio`. Pas de projet séparé backend/frontend — Sanity est le backend, Next.js gère
le frontend et l'accès admin dans le même déploiement Vercel.

## Complexity Tracking

> Aucune violation constitutionnelle — section vide.
