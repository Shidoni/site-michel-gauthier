# Feature Specification: Site Vitrine Michel Gauthier

**Feature Branch**: `001-site-michel-gauthier`
**Created**: 2026-05-07
**Status**: Draft
**Input**: Site vitrine administrable pour l'artiste Michel Gauthier avec galerie, expositions et contact.

## Clarifications

### Session 2026-05-07

- Q: Comment l'artiste s'authentifie-t-il pour accéder à l'administration ? → A: Compte personnel de l'artiste avec email + mot de passe, réinitialisable par email de façon autonome.
- Q: Comment les expositions basculent-elles de "À venir" vers "Passées" ? → A: Automatiquement selon la date — passée si date antérieure à aujourd'hui, à venir sinon, sans action de l'artiste.
- Q: Que se passe-t-il lorsqu'un visiteur clique sur une œuvre dans la galerie ? → A: Lightbox/modale — l'image s'affiche en grand dans une fenêtre superposée avec le titre et la description.

## User Scenarios & Testing

### User Story 1 — Visiteur découvre l'artiste sur la page d'accueil (Priority: P1)

Un visiteur arrive sur le site et découvre Michel Gauthier grâce à sa photo et sa biographie.

**Why this priority**: La page d'accueil est le premier point de contact. Elle pose l'identité
artistique et oriente le visiteur vers le reste du site.

**Independent Test**: Charger la page d'accueil et vérifier que la photo de l'artiste et son
texte biographique sont visibles, ainsi que la navigation vers les autres pages.

**Acceptance Scenarios**:

1. **Given** un visiteur arrive sur la page d'accueil, **When** la page se charge, **Then** il
   voit une photo de l'artiste et son texte de présentation biographique.
2. **Given** le visiteur est sur la page d'accueil, **When** il consulte la navigation,
   **Then** il voit des liens vers Galerie, Expositions et Contact.
3. **Given** la page d'accueil est chargée, **When** le visiteur est sur mobile,
   **Then** la photo et la biographie sont lisibles sans défilement horizontal.

---

### User Story 2 — Visiteur explore la galerie par sections (Priority: P1)

Un visiteur parcourt les œuvres de Michel Gauthier organisées en 3 thématiques : Terre, Neige, Mer.

**Why this priority**: La galerie est le cœur du site. Elle représente la raison principale
pour laquelle un visiteur vient et revient sur le site.

**Independent Test**: Naviguer sur la page Galerie, sélectionner chaque section, vérifier que
les œuvres correspondantes s'affichent avec leurs informations.

**Acceptance Scenarios**:

1. **Given** un visiteur est sur la page Galerie, **When** la page se charge,
   **Then** les 3 sections (Terre, Neige, Mer) sont visibles et toutes les œuvres sont affichées.
2. **Given** un visiteur sélectionne la section "Terre", **When** le filtre est appliqué,
   **Then** seules les œuvres de la section Terre sont affichées.
3. **Given** une œuvre est affichée dans la grille, **When** le visiteur clique dessus,
   **Then** une fenêtre modale s'ouvre avec l'image en grand format, le titre et la
   description (si elle existe).
4. **Given** la modale d'une œuvre est ouverte, **When** le visiteur clique en dehors ou
   sur un bouton de fermeture, **Then** la modale se ferme et le visiteur retrouve la galerie.
5. **Given** une section ne contient aucune œuvre, **When** elle est sélectionnée,
   **Then** un message indique qu'aucune œuvre n'est disponible dans cette section.

---

### User Story 3 — Visiteur consulte les expositions et distinctions (Priority: P2)

Un visiteur consulte les expositions passées et à venir, ainsi que les distinctions de l'artiste.

**Why this priority**: Les expositions témoignent de la carrière active de l'artiste. Les
distinctions renforcent sa légitimité auprès de nouveaux visiteurs.

**Independent Test**: Naviguer sur la page Expositions et vérifier que deux listes distinctes
(à venir / passées) et la section Distinctions sont présentes et lisibles.

**Acceptance Scenarios**:

1. **Given** un visiteur est sur la page Expositions, **When** la page se charge,
   **Then** il voit séparément les expositions à venir et les expositions passées.
2. **Given** la page Expositions est chargée, **When** le visiteur la parcourt,
   **Then** il voit une section Distinctions listant les reconnaissances reçues par l'artiste.
3. **Given** une exposition est listée, **When** le visiteur la lit,
   **Then** il voit au minimum le titre, la date et le lieu de l'exposition.
4. **Given** aucune exposition à venir n'existe, **When** la page se charge,
   **Then** la section "À venir" affiche un message indiquant l'absence d'exposition programmée.

---

### User Story 4 — Visiteur trouve les coordonnées de l'artiste (Priority: P2)

Un visiteur souhaite contacter Michel Gauthier et trouve ses coordonnées directement sur la
page Contact.

**Why this priority**: La page Contact est essentielle pour les demandes professionnelles
(galeries, presse, collectionneurs).

**Independent Test**: Naviguer sur la page Contact et vérifier que l'email et le numéro de
téléphone sont affichés, sans formulaire.

**Acceptance Scenarios**:

1. **Given** un visiteur est sur la page Contact, **When** la page se charge,
   **Then** il voit l'adresse email et le numéro de téléphone de l'artiste.
2. **Given** la page Contact est affichée, **When** le visiteur la consulte,
   **Then** aucun formulaire de contact n'est présent.
3. **Given** l'email est affiché, **When** le visiteur clique dessus,
   **Then** son client mail s'ouvre avec l'adresse pré-remplie.

---

### User Story 5 — Artiste gère ses œuvres via l'administration (Priority: P1)

L'artiste ajoute, modifie ou supprime des œuvres depuis l'interface d'administration, sans
connaissance technique.

**Why this priority**: La gestion des œuvres est la fonctionnalité administrative principale.
Un site dont le contenu ne peut pas être mis à jour perd rapidement sa valeur.

**Independent Test**: Se connecter à l'admin, ajouter une œuvre complète (titre, image,
section), vérifier son apparition dans la galerie publique.

**Acceptance Scenarios**:

1. **Given** l'artiste est connecté à l'admin, **When** il ajoute une œuvre avec titre,
   image et section, **Then** l'œuvre apparaît dans la section correspondante de la galerie.
2. **Given** l'artiste modifie une œuvre existante, **When** il enregistre,
   **Then** la galerie publique reflète immédiatement les changements.
3. **Given** l'artiste supprime une œuvre, **When** la suppression est confirmée,
   **Then** l'œuvre disparaît de la galerie publique.
4. **Given** l'artiste tente d'enregistrer une œuvre sans titre ou sans image,
   **When** il soumet le formulaire, **Then** un message d'erreur clair s'affiche
   et l'œuvre n'est pas sauvegardée.

---

### User Story 6 — Artiste met à jour sa présentation (Priority: P2)

L'artiste met à jour sa photo et son texte biographique depuis l'administration.

**Independent Test**: Modifier la biographie dans l'admin et vérifier que la page d'accueil
affiche le nouveau texte.

**Acceptance Scenarios**:

1. **Given** l'artiste modifie son texte biographique dans l'admin, **When** il enregistre,
   **Then** la page d'accueil affiche le nouveau texte.
2. **Given** l'artiste téléverse une nouvelle photo, **When** enregistrée,
   **Then** la page d'accueil affiche la nouvelle photo.

---

### User Story 7 — Artiste gère les expositions et distinctions (Priority: P2)

L'artiste ajoute, modifie ou supprime des expositions et des distinctions.

**Acceptance Scenarios**:

1. **Given** l'artiste ajoute une exposition avec titre, date et lieu,
   **When** enregistrée, **Then** elle apparaît automatiquement dans "À venir" si sa date
   est future, ou dans "Passées" si sa date est déjà dépassée.
2. **Given** une exposition était dans "À venir", **When** sa date est dépassée et qu'un
   visiteur consulte la page Expositions, **Then** l'exposition apparaît automatiquement
   dans "Passées" sans intervention de l'artiste.
3. **Given** l'artiste ajoute une distinction, **When** enregistrée,
   **Then** elle apparaît dans la section Distinctions de la page Expositions.

---

### Edge Cases

- Qu'arrive-t-il si une section (Terre, Neige ou Mer) ne contient aucune œuvre ?
  → La section reste visible avec un message "Aucune œuvre disponible dans cette section."
- Qu'arrive-t-il si le fichier image téléversé est trop volumineux ?
  → L'admin affiche un message d'erreur avec la taille maximale autorisée.
- Qu'arrive-t-il si aucune exposition à venir n'est enregistrée ?
  → La section "À venir" affiche "Aucune exposition programmée pour le moment."
- Qu'arrive-t-il si les coordonnées de contact n'ont pas été renseignées ?
  → La page Contact affiche un message invitant l'artiste à renseigner ses informations.

## Requirements

### Functional Requirements

- **FR-001**: Le site DOIT comporter exactement 4 pages publiques : Accueil, Galerie,
  Expositions, Contact.
- **FR-002**: La page Accueil DOIT afficher la photo et la biographie de l'artiste.
- **FR-003**: La page Galerie DOIT organiser les œuvres en 3 sections : Terre, Neige, Mer.
- **FR-004**: Les visiteurs DOIVENT pouvoir filtrer la galerie par section sans rechargement
  complet de la page.
- **FR-005**: Chaque œuvre DOIT avoir un titre (obligatoire) et une image (obligatoire) ;
  la description est optionnelle ; la section est obligatoire.
- **FR-006**: La page Expositions DOIT afficher séparément les expositions passées et à venir.
- **FR-007**: La page Expositions DOIT inclure une section Distinctions.
- **FR-008**: Chaque entrée d'exposition DOIT contenir au minimum : titre, date, lieu.
- **FR-009**: La page Contact DOIT afficher uniquement l'email et le numéro de téléphone.
  Aucun formulaire ne DOIT être présent.
- **FR-010**: L'artiste DOIT pouvoir gérer tout le contenu du site via une interface
  d'administration sans écrire de code.
- **FR-014**: L'artiste DOIT accéder à l'administration via un compte personnel (email +
  mot de passe). La réinitialisation du mot de passe DOIT être possible de façon autonome
  par email, sans intervention du développeur.
- **FR-016**: Au clic sur une œuvre dans la galerie, une fenêtre modale (lightbox) DOIT
  s'ouvrir et afficher l'image en grand format, le titre et la description de l'œuvre.
  La modale DOIT se fermer au clic en dehors ou via un bouton de fermeture explicite.
- **FR-015**: Le classement des expositions en "À venir" ou "Passées" DOIT être automatique
  et basé sur la date de l'exposition : passée si la date est antérieure à aujourd'hui,
  à venir sinon. Aucune action manuelle de l'artiste n'est requise pour ce basculement.
- **FR-011**: L'interface d'administration DOIT empêcher la sauvegarde d'une œuvre sans
  titre ou sans image.
- **FR-012**: Le site DOIT être responsive et lisible sur mobile (≥320px), tablette et
  desktop (≥1200px).
- **FR-013**: L'email affiché sur la page Contact DOIT être cliquable (lien mailto).

### Key Entities

- **Artiste** : photo (image, unique), biographie (texte long)
- **Œuvre** : titre (texte, obligatoire), description (texte, optionnel), image (fichier,
  obligatoire), section (enum : Terre | Neige | Mer, obligatoire)
- **Exposition** : titre (texte), date (date), lieu (texte) — la catégorie (à venir / passée)
  est dérivée automatiquement : passée si date < aujourd'hui, à venir sinon
- **Distinction** : titre (texte), année (optionnel), description (optionnel)
- **Contact** : email (texte), téléphone (texte)

## Success Criteria

### Measurable Outcomes

- **SC-001**: Les 4 pages publiques se chargent en moins de 3 secondes sur une connexion
  4G/fibre standard.
- **SC-002**: L'artiste peut ajouter une nouvelle œuvre (titre + image + section) en moins
  de 2 minutes depuis l'interface d'administration.
- **SC-003**: Un visiteur peut accéder à la page Contact en moins de 10 secondes depuis
  n'importe quelle page du site.
- **SC-004**: 100% des œuvres s'affichent correctement sur mobile (≥320px) et desktop
  (≥1200px).
- **SC-005**: L'artiste peut mettre à jour sa biographie sans assistance technique en moins
  de 5 minutes.
- **SC-006**: Le filtrage de la galerie par section réagit en moins d'1 seconde.
- **SC-007**: L'interface d'administration est entièrement en français.

## Assumptions

- L'artiste dispose d'un ordinateur ou d'une tablette avec accès internet pour utiliser
  l'administration.
- Le site est destiné à un public principalement francophone ; la langue du site est le français.
- L'artiste fournira ses propres photos et textes biographiques. Le chargement initial du
  contenu peut nécessiter une assistance développeur ponctuelle (une seule fois).
- Les fichiers image téléversés seront aux formats standards (JPG, PNG, WebP) ; la vidéo
  est hors périmètre.
- Le site concerne un seul artiste — aucun support multi-artiste n'est requis.
- Les réseaux sociaux sont hors périmètre (non mentionnés par l'artiste).
- Le classement passée/à venir des expositions est automatique, basé sur la date saisie
  (pas d'action manuelle requise de la part de l'artiste).
- L'ordre d'affichage des œuvres dans la galerie est chronologique (plus récentes en premier)
  par défaut ; l'artiste ne peut pas réordonner manuellement (hors périmètre v1).
- "Michel Gauthier" désigne le sculpteur/céramiste Michel Gauthier-Jorrand référencé sur
  michelgauthier-jorrand.fr.
