'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',            label: 'Accueil' },
  { href: '/galerie',     label: 'Galerie' },
  { href: '/expositions', label: 'Expositions' },
  { href: '/contact',     label: 'Contact' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header>
      <div className="bg-bordeaux-dark py-4 px-6 text-center border-b border-bordeaux-light">
        <Link href="/" className="font-serif text-3xl text-creme tracking-wide hover:text-or transition-colors">
          Michel Gauthier
        </Link>
      </div>

      <nav className="bg-bordeaux-nav border-b border-or-dark">
        <ul className="max-w-4xl mx-auto flex items-center justify-center gap-0">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block px-8 py-3 font-sans text-sm tracking-widest uppercase transition-colors border-r border-or-dark first:border-l ${
                  pathname === href
                    ? 'text-or underline underline-offset-4'
                    : 'text-creme hover:text-or hover:underline underline-offset-4'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
