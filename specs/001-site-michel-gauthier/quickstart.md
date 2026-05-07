# Quickstart — Site Michel Gauthier

**Stack**: Next.js 14 + Sanity.io v3 + Tailwind CSS + Vercel
**Prérequis**: Node.js 20 LTS, compte Vercel gratuit, compte Sanity.io gratuit

---

## 1. Initialiser le projet Next.js

```bash
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

---

## 2. Créer et configurer le projet Sanity

```bash
# Installer les dépendances Sanity dans le projet Next.js
npm install next-sanity @sanity/image-url @sanity/vision

# Initialiser le Studio Sanity (choisir "Add Sanity to an existing Next.js project")
npx sanity@latest init --env
```

Cela crée :
- `.env.local` avec `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`
- `sanity.config.ts` à la racine

---

## 3. Ajouter la lightbox

```bash
npm install yet-another-react-lightbox
```

---

## 4. Structure des variables d'environnement

Créer `.env.local` (ne jamais commiter ce fichier) :

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx          # ID projet Sanity
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=sk...                  # Token lecture seule (server-side)
```

Variables à configurer aussi dans Vercel Dashboard → Settings → Environment Variables.

---

## 5. Configurer le client Sanity

```typescript
// src/sanity/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
})
```

---

## 6. Configurer le Studio embarqué

```typescript
// src/app/studio/[[...tool]]/page.tsx
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-dynamic'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

```typescript
// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { frFRLocale } from '@sanity/locale-fr-fr'   // npm install @sanity/locale-fr-fr
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'michel-gauthier',
  title: 'Site Michel Gauthier',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
    frFRLocale(),                                    // Interface admin en français
  ],
  schema: { types: schemaTypes },
})
```

---

## 7. Importer les schémas

```typescript
// src/sanity/schemas/index.ts
import artiste from './artiste'
import oeuvre from './oeuvre'
import exposition from './exposition'
import distinction from './distinction'
import contact from './contact'

export const schemaTypes = [artiste, oeuvre, exposition, distinction, contact]
```

---

## 8. Configurer next.config.ts pour les images Sanity

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

---

## 9. Déployer sur Vercel

```bash
# Installer la CLI Vercel
npm install -g vercel

# Déployer (première fois)
vercel

# Configurer les variables d'environnement dans Vercel Dashboard
# puis déployer en production
vercel --prod
```

---

## 10. Configurer le webhook Sanity → Vercel (revalidation automatique)

Dans Sanity Dashboard → API → Webhooks :
- **URL**: `https://[votre-domaine].vercel.app/api/revalidate`
- **Trigger on**: Create, Update, Delete
- **Secret**: Une chaîne aléatoire sécurisée

Dans Vercel, ajouter la variable : `SANITY_REVALIDATE_SECRET=<même valeur>`

```typescript
// src/app/api/revalidate/route.ts
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }
  revalidatePath('/', 'layout')    // Revalider toutes les pages
  return NextResponse.json({ revalidated: true })
}
```

---

## 11. Créer le compte admin artiste

1. Aller sur https://[domaine]/studio
2. Se connecter avec votre compte Sanity (développeur)
3. Sanity Dashboard → Manage → Members → Inviter Michel Gauthier avec son email
4. Lui attribuer le rôle **Editor** (peut modifier le contenu, pas les schémas)
5. L'artiste reçoit un email d'invitation, crée son mot de passe, accède au studio

---

## Validation de l'environnement

Vérifier que tout fonctionne :

```bash
# Démarrer en dev
npm run dev

# Vérifier les pages publiques
curl http://localhost:3000/          # Accueil
curl http://localhost:3000/galerie   # Galerie
curl http://localhost:3000/expositions
curl http://localhost:3000/contact

# Vérifier le studio
open http://localhost:3000/studio
```

---

## Référence de design

Consulter le site existant de l'artiste (si accessible) avant toute décision visuelle :
- http://www.michelgauthier-jorrand.fr/
- http://www.michelgauthier-jorrand.fr/exposdeux.html

Si le site est hors ligne, demander des captures d'écran à l'artiste.
