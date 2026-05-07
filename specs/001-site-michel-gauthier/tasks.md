---
description: "Task list for Site Vitrine Michel Gauthier"
---

# Tasks: Site Vitrine Michel Gauthier

**Input**: Design documents from `specs/001-site-michel-gauthier/`
**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | contracts/ ✅

**Stack**: Next.js 14 (App Router, TypeScript) + Sanity.io v3 + Tailwind CSS + Vercel
**Tests**: Hors périmètre v1 — aucune tâche de test automatisé.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Peut s'exécuter en parallèle (fichiers différents, pas de dépendances)
- **[Story]**: User story associée (US1–US7 depuis spec.md)
- Chemins relatifs depuis la racine du projet

---

## Phase 1 : Setup (Initialisation du projet)

**Purpose**: Créer le projet Next.js et configurer l'environnement de développement.

- [X] T001 Initialiser le projet Next.js 14 avec TypeScript, App Router, Tailwind et `--src-dir` à la racine (`npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir`)
- [ ] T002 [P] Créer le projet Sanity et configurer `.env.local` avec `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_API_VERSION`, `SANITY_API_READ_TOKEN` (suivre quickstart.md étape 2)
- [X] T003 [P] Installer les dépendances supplémentaires : `next-sanity @sanity/image-url @sanity/vision yet-another-react-lightbox @sanity/locale-fr-fr`
- [X] T004 Configurer `next.config.ts` avec le remote pattern `cdn.sanity.io` pour `next/image` (quickstart.md étape 8)
- [X] T005 [P] Configurer `tailwind.config.ts` avec une palette neutre (blanc, gris, noir) et la famille de police typographique sobre (ex: `font-serif` pour les titres)

---

## Phase 2 : Fondations (CMS + Infrastructure partagée)

**Purpose**: Schémas Sanity, client, queries, layout commun — bloques TOUTES les user stories.

**⚠️ CRITIQUE** : Aucune user story ne peut démarrer avant la fin de cette phase.

- [X] T006 Créer le schéma Sanity `artiste` (singleton, photo + biographie rich text, champs obligatoires, labels FR) dans `src/sanity/schemas/artiste.ts`
- [X] T007 [P] Créer le schéma Sanity `oeuvre` (titre obligatoire, image obligatoire + hotspot, section enum Terre/Neige/Mer obligatoire, description optionnelle, preview configuré, labels FR) dans `src/sanity/schemas/oeuvre.ts`
- [X] T008 [P] Créer le schéma Sanity `exposition` (titre, date et lieu obligatoires, format date DD/MM/YYYY, labels FR) dans `src/sanity/schemas/exposition.ts`
- [X] T009 [P] Créer le schéma Sanity `distinction` (titre obligatoire, année et description optionnels, labels FR) dans `src/sanity/schemas/distinction.ts`
- [X] T010 [P] Créer le schéma Sanity `contact` (singleton, email + téléphone obligatoires, validation email, labels FR) dans `src/sanity/schemas/contact.ts`
- [X] T011 Créer l'index des schémas dans `src/sanity/schemas/index.ts` exportant les 5 schémas
- [X] T012 Configurer `sanity.config.ts` avec le locale français (`@sanity/locale-fr-fr`), le Structure Builder personnalisé (sections : Artiste, Œuvres, Expositions, Distinctions, Contact), et tous les schémas
- [X] T013 Créer la route Sanity Studio dans `src/app/studio/[[...tool]]/page.tsx` (suivre quickstart.md étape 6)
- [X] T014 Créer le client Sanity dans `src/sanity/client.ts` avec configuration `useCdn: true` et variables d'environnement
- [X] T015 [P] Créer toutes les GROQ queries dans `src/sanity/queries.ts` en implémentant les 7 queries définies dans `specs/001-site-michel-gauthier/contracts/queries.groq`
- [X] T016 [P] Créer les types TypeScript dans `src/types/index.ts` en copiant les types de `specs/001-site-michel-gauthier/contracts/types.ts`
- [X] T017 Créer l'endpoint de revalidation webhook dans `src/app/api/revalidate/route.ts` (secret dans env var `SANITY_REVALIDATE_SECRET`)
- [X] T018 Créer le layout du site public dans `src/app/(site)/layout.tsx` (import Navigation + Footer, HTML structure de base)
- [X] T019 [P] Créer le composant Navigation dans `src/components/layout/Navigation.tsx` avec les 4 liens (Accueil, Galerie, Expositions, Contact) et indication de la page active
- [X] T020 [P] Créer le composant Footer dans `src/components/layout/Footer.tsx` (nom de l'artiste + année)

**Checkpoint** : Fondations prêtes — lancer `/studio` et vérifier que les 5 types de documents sont visibles.

---

## Phase 3 : User Story 1 — Accueil (Priority: P1) 🎯 MVP

**Goal**: Le visiteur voit la photo et la biographie de Michel Gauthier sur la page d'accueil.

**Independent Test**: Charger `/` — vérifier la photo de l'artiste et son texte biographique, navigation visible, responsive mobile.

- [X] T021 [US1] Créer le composant `ArtistPresentation` dans `src/components/ArtistPresentation.tsx` (afficher photo via `next/image` avec hotspot Sanity, biographie en rich text via `PortableText`)
- [X] T022 [US1] Implémenter la page Accueil dans `src/app/(site)/page.tsx` (Server Component, query `QUERY_ARTISTE`, rendu `ArtistPresentation`, revalidation ISR 3600s)

**Checkpoint** : Page `/` affiche photo + biographie. ✅ User Story 1 validée indépendamment.

---

## Phase 4 : User Story 2 — Galerie (Priority: P1) 🎯 MVP

**Goal**: Le visiteur parcourt les œuvres en galerie avec filtrage par section et lightbox au clic.

**Independent Test**: Charger `/galerie` — afficher toutes les œuvres, filtrer par Terre/Neige/Mer (< 1s), cliquer une œuvre → modale avec image grand format + titre + description.

- [X] T023 [P] [US2] Créer le composant `SectionFilter` dans `src/components/gallery/SectionFilter.tsx` (onglets Tout / Terre / Neige / Mer, prop `activeSection`, callback `onSectionChange`)
- [X] T024 [P] [US2] Créer le composant `ArtworkCard` dans `src/components/gallery/ArtworkCard.tsx` (image via `next/image`, titre en overlay, onClick pour ouvrir lightbox)
- [X] T025 [US2] Créer le composant `ArtworkModal` dans `src/components/gallery/ArtworkModal.tsx` (modale custom avec image grande, titre, description, fermeture Escape/click ou bouton)
- [X] T026 [US2] Créer le composant `GalleryGrid` dans `src/components/gallery/GalleryGrid.tsx` (Client Component, state `activeSection` + `selectedArtwork`, filtrage client-side, rendu `SectionFilter` + grille d'`ArtworkCard` + `ArtworkModal`, message vide si section vide)
- [X] T027 [US2] Implémenter la page Galerie dans `src/app/(site)/galerie/page.tsx` (Server Component, query `QUERY_OEUVRES_ALL`, passer les œuvres à `GalleryGrid`, revalidation ISR 3600s)

**Checkpoint** : Page `/galerie` affiche grille + filtre + lightbox. ✅ User Story 2 validée indépendamment.

---

## Phase 5 : User Story 5 — Admin Gestion Œuvres (Priority: P1) 🎯 MVP

**Goal**: L'artiste ajoute, modifie et supprime des œuvres depuis `/studio` sans compétence technique.

**Independent Test**: Se connecter à `/studio`, créer une œuvre (titre + image + section), vérifier qu'elle apparaît sur `/galerie`. Tenter de sauvegarder sans titre → message d'erreur.

- [X] T028 [US5] Configurer le Structure Builder dans `sanity.config.ts` pour organiser la navigation admin : sections nommées "Présentation artiste", "Œuvres", "Expositions", "Distinctions", "Contact"
- [ ] T029 [US5] Vérifier le workflow admin œuvre : connexion à `/studio`, ajout d'une œuvre avec titre + image + section → apparition sur `/galerie` ; tentative sans titre → message d'erreur en français ; suppression → disparition de la galerie

**Checkpoint** : L'artiste peut gérer ses œuvres depuis `/studio`. ✅ User Story 5 validée.

---

## Phase 6 : User Story 3 — Expositions (Priority: P2)

**Goal**: Le visiteur consulte expositions à venir, passées et distinctions sur une page dédiée.

**Independent Test**: Charger `/expositions` — deux listes distinctes (à venir et passées) classées automatiquement par date, section Distinctions présente.

- [X] T030 [P] [US3] Créer le composant `ExpositionsList` dans `src/components/ExpositionsList.tsx` (props `aVenir: Exposition[]`, `passees: Exposition[]`, affichage titre + date + lieu, message vide si liste vide)
- [X] T031 [P] [US3] Créer le composant `DistinctionsList` dans `src/components/DistinctionsList.tsx` (props `distinctions: Distinction[]`, affichage titre + année + description)
- [X] T032 [US3] Implémenter la page Expositions dans `src/app/(site)/expositions/page.tsx` (Server Component, 3 queries parallèles avec `$today`, rendu `ExpositionsList` + `DistinctionsList`, revalidation ISR 3600s)

**Checkpoint** : Page `/expositions` affiche les listes avec classification automatique. ✅ US3 validée.

---

## Phase 7 : User Story 4 — Contact (Priority: P2)

**Goal**: Le visiteur trouve l'email (cliquable) et le téléphone de l'artiste.

**Independent Test**: Charger `/contact` — email et téléphone affichés, email est un lien mailto cliquable, aucun formulaire présent.

- [X] T033 [US4] Créer le composant `ContactInfo` dans `src/components/ContactInfo.tsx` (email comme `<a href="mailto:...">`, téléphone comme `<a href="tel:...">`, aucun formulaire)
- [X] T034 [US4] Implémenter la page Contact dans `src/app/(site)/contact/page.tsx` (Server Component, query `QUERY_CONTACT`, rendu `ContactInfo`, message si contact non renseigné)

**Checkpoint** : Page `/contact` affiche email cliquable + téléphone. ✅ US4 validée.

---

## Phase 8 : User Story 6 — Admin Présentation (Priority: P2)

**Goal**: L'artiste met à jour sa photo et sa biographie depuis `/studio`.

**Independent Test**: Modifier la biographie dans `/studio` → vérifier que la page `/` affiche le nouveau texte après revalidation.

- [ ] T035 [US6] Vérifier le workflow admin présentation : modifier bio et photo dans `/studio` → confirmer la mise à jour sur `/` (revalidation ISR ou manuelle via webhook)

**Checkpoint** : L'artiste peut mettre à jour sa présentation. ✅ US6 validée.

---

## Phase 9 : User Story 7 — Admin Expositions (Priority: P2)

**Goal**: L'artiste ajoute et supprime des expositions et distinctions depuis `/studio`.

**Independent Test**: Ajouter une exposition avec date future → apparaît dans "À venir". Ajouter une distinction → apparaît dans section Distinctions.

- [ ] T036 [US7] Vérifier le workflow admin expositions : ajouter une exposition (titre + date future + lieu) → apparaît dans "À venir" sur `/expositions` ; ajouter une distinction → apparaît dans section Distinctions

**Checkpoint** : L'artiste peut gérer les expositions et distinctions. ✅ US7 validée.

---

## Phase 10 : Polish & Transversal

**Purpose**: SEO, accessibilité, déploiement, création du compte artiste.

- [X] T037 [P] Ajouter les métadonnées SEO pour les 4 pages publiques dans leurs `page.tsx` respectifs (titre, description, OpenGraph)
- [X] T038 [P] Créer le helper URL image Sanity dans `src/lib/imageUrl.ts` en utilisant `@sanity/image-url` pour les URLs de transformation (width, format, crop)
- [X] T039 Ajouter les textes d'état vide en français dans `GalleryGrid` (section vide), `ExpositionsList` (aucune exposition), `ContactInfo` (contact non renseigné)
- [ ] T040 [P] Déployer sur Vercel : connecter le repo Git, configurer les variables d'environnement, déclencher le premier déploiement (quickstart.md étape 9)
- [ ] T041 Configurer le webhook Sanity → Vercel pour la revalidation automatique (quickstart.md étape 10) et vérifier qu'une modification Sanity déclenche bien un rebuild
- [ ] T042 Inviter Michel Gauthier comme Editor dans Sanity Dashboard, vérifier qu'il peut se connecter à `/studio` et réinitialiser son mot de passe de façon autonome

---

## Dépendances et Ordre d'Exécution

### Dépendances entre phases

- **Setup (Phase 1)** : Aucune dépendance — démarrer immédiatement
- **Fondations (Phase 2)** : Dépend de Phase 1 — **bloque toutes les user stories**
- **US1, US2, US5 (Phases 3–5)** : Dépendent de Phase 2, peuvent s'exécuter en parallèle
- **US3, US4, US6, US7 (Phases 6–9)** : Dépendent de Phase 2, peuvent s'exécuter en parallèle
- **Polish (Phase 10)** : Dépend de toutes les user stories souhaitées

### Dépendances entre user stories

- **US1 (P1)** : Indépendante après Phase 2
- **US2 (P1)** : Indépendante après Phase 2
- **US5 (P1)** : Dépend de US2 (vérifie que les œuvres créées apparaissent en galerie)
- **US3 (P2)** : Indépendante après Phase 2
- **US4 (P2)** : Indépendante après Phase 2
- **US6 (P2)** : Dépend de US1 (vérifie que la présentation mise à jour apparaît sur l'accueil)
- **US7 (P2)** : Dépend de US3 (vérifie que les expositions créées apparaissent sur la page Expositions)

### Dans chaque user story

- Composants avant page (les pages importent les composants)
- Composants parallèles ([P]) peuvent démarrer ensemble
- Vérification manuelle (tâches "Vérifier le workflow") après implémentation

---

## Exécution en Parallèle par Phase

### Phase 2 — Fondations

```text
Démarrer ensemble (aucune dépendance entre eux) :
  T006  artiste.ts schema
  T007  oeuvre.ts schema
  T008  exposition.ts schema
  T009  distinction.ts schema
  T010  contact.ts schema

Après T006–T010 :
  T011  schemas/index.ts
  T012  sanity.config.ts + Structure Builder
  T013  Studio route

Démarrer ensemble :
  T014  client.ts
  T015  queries.ts
  T016  types/index.ts

Après T018 :
  T019  Navigation.tsx
  T020  Footer.tsx
```

### Phase 4 — Galerie

```text
Démarrer ensemble :
  T023  SectionFilter.tsx
  T024  ArtworkCard.tsx

Après T023 + T024 :
  T025  ArtworkModal.tsx
  T026  GalleryGrid.tsx
  T027  galerie/page.tsx
```

---

## Stratégie d'Implémentation

### MVP Minimum (User Stories P1 uniquement)

1. Compléter Phase 1 (Setup)
2. Compléter Phase 2 (Fondations) → Checkpoint Studio
3. Compléter Phase 3 (US1 — Accueil) → **STOP et valider**
4. Compléter Phase 4 (US2 — Galerie) → **STOP et valider**
5. Compléter Phase 5 (US5 — Admin Œuvres) → **STOP et valider**
6. **Déployer** → site fonctionnel avec accueil + galerie administrable

### Livraison Complète

7. Compléter Phases 6–9 (US3, US4, US6, US7)
8. Compléter Phase 10 (Polish, SEO, déploiement production, compte artiste)
9. Remettre le guide utilisateur à l'artiste

---

## Notes

- `[P]` = fichiers différents, pas de dépendances → parallélisable
- Les tâches "Vérifier le workflow" sont des validations manuelles, pas du code
- Commit après chaque phase ou groupe logique
- Consulter `specs/001-site-michel-gauthier/quickstart.md` pour toute commande d'initialisation
- Consulter `specs/001-site-michel-gauthier/contracts/queries.groq` pour les GROQ queries
- Consulter `specs/001-site-michel-gauthier/data-model.md` pour les schémas Sanity exacts
