# Data Model: Site Vitrine Michel Gauthier

**Date**: 2026-05-07
**Source**: spec.md (Key Entities) + research.md (infrastructure décisions)

---

## Vue d'ensemble

5 types de documents Sanity :

| Type | Cardinalité | Description |
|------|-------------|-------------|
| `artiste` | Singleton (1) | Photo et biographie — page Accueil |
| `oeuvre` | Many (0–N) | Œuvres de la galerie avec section |
| `exposition` | Many (0–N) | Expositions (classification auto par date) |
| `distinction` | Many (0–N) | Distinctions reçues par l'artiste |
| `contact` | Singleton (1) | Email et téléphone — page Contact |

---

## Schéma : `artiste` (singleton)

```typescript
// src/sanity/schemas/artiste.ts
{
  name: 'artiste',
  title: 'Artiste',
  type: 'document',
  fields: [
    {
      name: 'photo',
      title: 'Photo de l\'artiste',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required().error('La photo est obligatoire'),
    },
    {
      name: 'biographie',
      title: 'Biographie',
      type: 'array',
      of: [{ type: 'block' }],           // Rich text (paragraphes)
      validation: (r) => r.required().error('La biographie est obligatoire'),
    },
  ],
  // Singleton : un seul document possible
  __experimental_actions: ['update', 'publish'],
}
```

**Contraintes**:
- Document unique — l'artiste ne peut pas en créer un second
- Photo et biographie obligatoires (validation `required()`)
- `hotspot: true` permet à l'artiste de définir le point focal de la photo pour le recadrage

---

## Schéma : `oeuvre`

```typescript
// src/sanity/schemas/oeuvre.ts
{
  name: 'oeuvre',
  title: 'Œuvre',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required().error('Le titre est obligatoire'),
    },
    {
      name: 'image',
      title: 'Image de l\'œuvre',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required().error('L\'image est obligatoire'),
    },
    {
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Terre', value: 'terre' },
          { title: 'Neige', value: 'neige' },
          { title: 'Mer',   value: 'mer'   },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required().error('La section est obligatoire'),
    },
    {
      name: 'description',
      title: 'Description (optionnelle)',
      type: 'text',
      rows: 3,
    },
  ],
  preview: {
    select: { title: 'titre', media: 'image', subtitle: 'section' },
  },
}
```

**Contraintes**:
- `titre` : string, obligatoire
- `image` : image avec hotspot, obligatoire
- `section` : enum strict parmi `terre` | `neige` | `mer`, obligatoire
- `description` : texte libre, optionnel
- Pas de champ `ordre` en v1 — tri par `_createdAt` descending (plus récentes en premier)

---

## Schéma : `exposition`

```typescript
// src/sanity/schemas/exposition.ts
{
  name: 'exposition',
  title: 'Exposition',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required().error('Le titre est obligatoire'),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'DD/MM/YYYY' },
      validation: (r) => r.required().error('La date est obligatoire'),
    },
    {
      name: 'lieu',
      title: 'Lieu',
      type: 'string',
      validation: (r) => r.required().error('Le lieu est obligatoire'),
    },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'date' },
  },
}
```

**Contraintes**:
- `titre`, `date`, `lieu` : tous obligatoires
- Pas de champ `type` — la catégorie (à venir / passée) est dérivée de `date` vs aujourd'hui
- Tri : à venir → date ascendante ; passées → date descendante

---

## Schéma : `distinction`

```typescript
// src/sanity/schemas/distinction.ts
{
  name: 'distinction',
  title: 'Distinction',
  type: 'document',
  fields: [
    {
      name: 'titre',
      title: 'Titre de la distinction',
      type: 'string',
      validation: (r) => r.required().error('Le titre est obligatoire'),
    },
    {
      name: 'annee',
      title: 'Année (optionnelle)',
      type: 'number',
    },
    {
      name: 'description',
      title: 'Description (optionnelle)',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: { title: 'titre', subtitle: 'annee' },
  },
}
```

---

## Schéma : `contact` (singleton)

```typescript
// src/sanity/schemas/contact.ts
{
  name: 'contact',
  title: 'Contact',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Adresse email',
      type: 'string',
      validation: (r) => r.required().email().error('Email valide requis'),
    },
    {
      name: 'telephone',
      title: 'Numéro de téléphone',
      type: 'string',
      validation: (r) => r.required().error('Le téléphone est obligatoire'),
    },
  ],
  __experimental_actions: ['update', 'publish'],
}
```

---

## Types TypeScript (générés depuis les schémas)

Voir [contracts/types.ts](contracts/types.ts) pour les types complets utilisés par le frontend.

---

## Relations entre entités

```
artiste (1)     ─── affiché sur ──→ Page Accueil
oeuvre (N)      ─── filtrée par ──→ section: 'terre' | 'neige' | 'mer'
exposition (N)  ─── classée par ──→ date < today → passée / date >= today → à venir
distinction (N) ─── affichée sur ──→ Page Expositions (section Distinctions)
contact (1)     ─── affiché sur ──→ Page Contact
```

Aucune relation directe entre entités — chaque type est indépendant.
