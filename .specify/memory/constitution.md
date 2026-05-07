<!--
Sync Impact Report
==================
Version: 1.0.0 → 1.1.0 (MINOR — ajout de la section "Références de Design")
Type de bump: MINOR (nouvelle section ajoutée)

Principes modifiés: Aucun

Sections ajoutées:
  - Références de Design (URL du site existant + critères d'inspiration)

Sections supprimées: Aucune

Templates mis à jour:
  ✅ .specify/memory/constitution.md (ce fichier)
  ✅ .specify/templates/plan-template.md (aucune modification requise)
  ✅ .specify/templates/spec-template.md (aucune modification requise)
  ✅ .specify/templates/tasks-template.md (aucune modification requise)

TODOs différés:
  - Le site http://www.michelgauthier-jorrand.fr/ est inaccessible depuis l'environnement
    de développement (ECONNREFUSED). Il DOIT être consulté manuellement par le développeur
    lors de la phase de design pour capturer la palette, la typographie et la structure
    existantes que l'artiste souhaite conserver ou moderniser.
-->

# Site Michel Gauthier — Constitution

## Core Principles

### I. Maintenabilité Non-Technique (NON-NÉGOCIABLE)

Le site DOIT être administrable par un utilisateur sans connaissance technique du web.
Toute fonctionnalité nécessitant une modification de code pour mettre à jour du contenu
est interdite. L'interface d'administration DOIT permettre sans aucune ligne de code :

- Modification de la photo et du texte de présentation de l'artiste
- Ajout, modification et suppression d'œuvres (titre, description, image, section)
- Gestion des expositions (passées et à venir) et des distinctions
- Mise à jour des coordonnées de contact (email, téléphone)

**Rationale**: L'artiste doit pouvoir maintenir son site de façon totalement autonome.
Toute dépendance à un développeur pour des mises à jour de contenu ordinaires est un échec
de conception.

### II. Sobriété Visuelle et Identité Artistique

Le design DOIT refléter l'esthétique d'un site d'artiste contemporain sobre et actuel :

- Typographie élégante, espaces blancs généreux, hiérarchie visuelle claire
- Focus sur les images d'œuvres : format pleine largeur ou grille aérée, sans distraction
- Palette neutre (blancs, gris, noirs) avec accent chromatique minimal si nécessaire
- Navigation épurée : aucun élément superflu, aucune animation gratuite
- Le design DOIT être responsive et lisible sur mobile, tablette et desktop

**Rationale**: Le design ne doit jamais concurrencer les œuvres. Son rôle est de les
mettre en valeur avec discrétion et élégance.

### III. Intégrité des Données d'Œuvre

Chaque œuvre DOIT impérativement contenir les quatre champs suivants :

- **Titre** : nom de l'œuvre (texte, obligatoire)
- **Description** : texte de présentation de l'œuvre (optionnel, mais champ prévu)
- **Image** : fichier image de l'œuvre (obligatoire)
- **Section** : appartenance exclusive à l'une des trois thématiques : Terre, Neige ou Mer

Une œuvre ne PEUT PAS exister sans image ni titre.
Une œuvre DOIT appartenir à une et une seule section parmi Terre, Neige, Mer.

**Rationale**: La galerie est le cœur du site. La cohérence des données d'œuvre garantit
une présentation professionnelle et une navigation thématique fiable pour les visiteurs.

### IV. Architecture de Pages Fixe

Le site DOIT comporter exactement quatre pages publiques :

1. **Accueil** — Photo de l'artiste + texte de présentation biographique
2. **Galerie** — Œuvres organisées en 3 sections navigables : Terre, Neige, Mer
3. **Expositions** — Liste des expositions passées et à venir + section Distinctions
4. **Contact** — Email et numéro de téléphone uniquement, sans formulaire

Toute demande d'ajout de page NÉCESSITE un amendement constitutionnel explicite.
La page Contact DOIT afficher uniquement les coordonnées : aucun formulaire, aucun autre contenu.

**Rationale**: Une structure fixe et minimaliste réduit la charge cognitive de maintenance
et garantit une navigation intuitive pour les visiteurs comme pour l'administrateur.

### V. Simplicité et Pérennité Technique

La stack technique DOIT favoriser les solutions éprouvées, simples et pérennes :

- Un seul CMS avec interface d'administration accessible sans compétence technique
- Nombre de dépendances minimisé ; aucune dépendance non indispensable
- Déploiement automatisé ou en un clic pour les mises à jour de contenu
- Les pages DOIVENT se charger en moins de 3 secondes sur une connexion standard (4G/fibre)

Toute complexité technique introduite DOIT être justifiée dans le plan d'implémentation.
Les images DOIVENT être optimisées automatiquement (compression, formats modernes).

**Rationale**: Un site complexe techniquement devient rapidement obsolète et coûteux à
maintenir. La simplicité garantit la pérennité du projet sur le long terme.

## Stack Technique et Contraintes

- **CMS** : Interface d'administration WYSIWYG avec gestion des médias intégrée (ex: Sanity,
  Strapi, WordPress, Directus — à décider en phase plan)
- **Hébergement** : Plateforme stable avec sauvegarde automatique du contenu
- **Images** : Optimisation automatique obligatoire (compression, WebP ou équivalent)
- **Accessibilité** : WCAG AA minimum — textes alternatifs obligatoires sur toutes les images
  d'œuvres
- **SEO** : Balises meta par page, titres descriptifs, attributs alt sur toutes les images
- **Langue** : Interface publique en français ; interface d'administration en français si possible

## Références de Design

Le développeur DOIT consulter le site existant de l'artiste avant toute décision de design :

- **Site actuel** : http://www.michelgauthier-jorrand.fr/
- **Page expositions** : http://www.michelgauthier-jorrand.fr/exposdeux.html

**Usage de ces références** :
- Identifier les éléments du site actuel que l'artiste souhaite conserver (structure, tons, esprit)
- Identifier les points de rupture à moderniser (responsive, accessibilité, administration)
- Le nouveau site DOIT représenter une évolution sobre du site existant, pas une rupture totale

**Note** : Ces URLs peuvent être temporairement inaccessibles. Le développeur DOIT demander
à l'artiste un accès direct ou des captures d'écran si le site est hors ligne lors de la
phase de design.

## Workflow de Contenu et Administration

- L'artiste gère l'intégralité du contenu via l'interface d'administration (aucun accès FTP
  ni modification de code requise)
- Les sauvegardes du contenu DOIVENT être automatiques ou documentées avec une procédure
  en langage clair (non-technique)
- Un guide utilisateur simplifié (en français, avec captures d'écran) DOIT accompagner la
  livraison du site
- Toute mise en production d'une mise à jour de contenu DOIT pouvoir être effectuée par
  l'artiste seul via l'interface d'administration

## Governance

Cette constitution régit toutes les décisions d'architecture, de design et de contenu du
site Michel Gauthier. Elle prend le dessus sur tout autre document ou préférence exprimée
en dehors d'un amendement formel.

**Procédure d'amendement** :
1. Proposer la modification via `/speckit-constitution` avec justification explicite
2. Évaluer l'impact sur les principes existants et les templates dépendants
3. Incrémenter la version selon les règles sémantiques ci-dessous
4. Documenter le changement dans le Sync Impact Report en tête de ce fichier

**Politique de versioning** :
- MAJOR : Suppression ou redéfinition incompatible d'un principe existant
- MINOR : Ajout d'un principe ou d'une section, extension significative du périmètre
- PATCH : Clarifications, reformulations, corrections sans impact sémantique

**Conformité** : Chaque spec et plan DOIT vérifier la conformité avec cette constitution.
Toute violation DOIT être justifiée dans la section "Complexity Tracking" du plan concerné.

**Version**: 1.1.0 | **Ratified**: 2026-05-07 | **Last Amended**: 2026-05-07
