# Research: Site Vitrine Michel Gauthier

**Date**: 2026-05-07
**Feature**: specs/001-site-michel-gauthier/

---

## Décision 1 : Framework Frontend

**Decision**: Next.js 14+ (App Router, TypeScript)

**Rationale**: Framework React standard de l'industrie pour les sites web modernes. L'App Router
permet le SSG (génération statique) pour des pages ultra-rapides, les Server Components évitent
l'hydratation inutile côté client, et `next/image` optimise automatiquement les images en WebP
avec lazy loading. Parfaitement adapté à un site vitrine à faible fréquence de mise à jour.
La revalidation automatique (ISR — Incremental Static Regeneration) permet de refléter les
changements Sanity sans rebuild complet.

**Alternatives considered**:
- **Astro**: Excellent pour sites statiques purs mais studio admin non intégré nativement.
- **Nuxt.js 3**: Comparable en qualité mais écosystème Sanity plus riche côté Next.js.
- **Remix**: Orienté SSR dynamique, surdimensionné pour ce cas d'usage.
- **Vite + React SPA**: Mauvais pour le SEO (pas de SSR/SSG) — éliminé.

---

## Décision 2 : CMS Headless

**Decision**: Sanity.io v3

**Rationale**: Meilleure interface d'administration pour les utilisateurs non-techniques parmi
les CMS headless. Le Sanity Studio est hautement configurable, se déploie dans le même projet
Next.js (route `/studio`), gère l'authentification email+mot de passe avec réinitialisation
native, et dispose d'une gestion des médias intuitive (drag & drop, recadrage visuel).
Le Content Lake (base documentaire cloud) inclut sauvegardes automatiques. L'interface
Studio est configurable avec des labels en français. Le tier gratuit est largement suffisant
pour un site vitrine (100k requêtes/mois, 5 utilisateurs).

**Alternatives considered**:
- **WordPress**: Le plus connu mais nécessite PHP hébergé séparément, maintenance sécurité
  régulière, thème custom complexe — trop lourd pour un site vitrine moderne.
- **Strapi**: Admin correct mais nécessite un serveur Node.js séparé avec base de données
  relationnelle, plus de charge opérationnelle.
- **Directus**: Puissant mais admin moins accessible pour non-techniciens, SQL obligatoire.
- **Contentful**: Interface anglaise uniquement sur les plans gratuits et intermédiaires.
- **TinaCMS / Decap CMS**: Éditent directement des fichiers Git — trop technique pour l'artiste.

---

## Décision 3 : Hébergement et Déploiement

**Decision**: Vercel (Next.js) + Sanity Content Lake (CMS)

**Rationale**: Vercel est l'hébergeur officiel de Next.js (même éditeur). Déploiement automatique
depuis Git, CDN mondial pour les assets statiques, plan Hobby gratuit suffisant pour un site
vitrine. Les webhooks Sanity → Vercel déclenchent une revalidation ISR à chaque modification
de contenu, garantissant la fraîcheur des pages sans action manuelle de l'artiste.
Sanity Content Lake héberge toutes les données et médias avec CDN Cloudflare intégré.

**Alternatives considered**:
- **OVH / Infomaniak**: Hébergement français mais nécessite configuration manuelle (PM2, Nginx),
  moins adapté aux déploiements automatiques Git.
- **Netlify**: Alternative viable, intégration Next.js correcte mais légèrement moins optimale.
- **Render**: Bon mais CDN moins étendu, cold starts sur plan gratuit.

---

## Décision 4 : Styles

**Decision**: Tailwind CSS v3

**Rationale**: Approche utility-first permettant un design sur mesure précis sans écrire de
CSS personnalisé excessif. Bundle final minimal grâce au tree-shaking (purge CSS). Idéal pour
implémenter une palette sobre (blanc, gris, noir) avec typographie précise. Large communauté,
documentation exhaustive, intégration native avec Next.js. Excellente maintenabilité à long terme.

**Alternatives considered**:
- **CSS Modules**: Plus verbeux, moins adapté au prototypage rapide de design composant.
- **Styled Components**: Runtime CSS-in-JS, impact négatif sur les performances Server Components.
- **shadcn/ui**: Composants pré-stylés utiles mais risque d'uniformisation visuelle — à utiliser
  uniquement pour l'admin si besoin, pas pour le site public.

---

## Décision 5 : Lightbox Galerie

**Decision**: `yet-another-react-lightbox` (yarl) v3

**Rationale**: Bibliothèque légère (~30KB gzippé), entièrement accessible (navigation clavier,
attributs ARIA, gestion du focus), maintenue activement, supporte le swipe tactile sur mobile,
hautement personnalisable visuellement, compatible TypeScript. Respecte les critères WCAG AA.

**Alternatives considered**:
- `react-photo-view`: Alternative viable mais animations moins soignées, TypeScript partiel.
- `lightgallery`: Plus lourd (~100KB), licence commerciale pour certaines fonctionnalités.
- **Implémentation custom**: Possible (CSS + portal React) mais investissement temps plus élevé.

---

## Infrastructure : Authentification Admin

Sanity.io gère nativement l'authentification pour l'accès au Studio :
- L'artiste dispose d'un compte sanity.io avec email + mot de passe
- Réinitialisation de mot de passe par email (processus natif Sanity, aucun développement requis)
- L'artiste accède au studio via `https://[domaine-du-site]/studio`
- Un seul compte utilisateur — rôle "Editor" (peut modifier le contenu, pas les schémas)
- L'URL `/studio` est publiquement accessible mais protégée par l'auth Sanity

---

## Infrastructure : Images et Optimisation

- **Upload**: Fichiers glissés-déposés dans le Studio Sanity, stockage automatique dans Content Lake
- **CDN**: Cloudflare CDN intégré à Sanity pour la distribution des images
- **Transformation**: URL API Sanity (`?w=800&h=600&fit=crop&auto=format`) pour redimensionnement
- **Optimisation Next.js**: Composant `next/image` avec `loader` Sanity pour double optimisation
- **Limite recommandée**: 10MB par image (documentée dans le guide utilisateur)
- **Formats**: JPG, PNG, WebP acceptés à l'upload ; WebP servi automatiquement aux navigateurs compatibles

---

## Infrastructure : Classification Automatique des Expositions

La distinction "à venir" / "passée" est calculée à l'exécution via GROQ, sans champ dédié :

```groq
// À venir (date >= aujourd'hui)
*[_type == "exposition" && date >= $today] | order(date asc)

// Passées (date < aujourd'hui)
*[_type == "exposition" && date < $today] | order(date desc)
```

La variable `$today` est injectée côté serveur au moment du rendu :
```typescript
const today = new Date().toISOString().split('T')[0] // "2026-05-07"
```

Aucun champ "type" ou "catégorie" dans le schéma Exposition — classification purement dérivée.

---

## Infrastructure : SEO

- `generateMetadata()` Next.js par page pour balises `<title>` et `<meta description>`
- Balises OpenGraph pour partage réseaux sociaux
- `next/image` génère automatiquement `width`, `height`, `alt` depuis les métadonnées Sanity
- `next-sitemap` pour la génération automatique du sitemap XML
- Données structurées JSON-LD sur la page d'accueil (type `Person` pour l'artiste)
