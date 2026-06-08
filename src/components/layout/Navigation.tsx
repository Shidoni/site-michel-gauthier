'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/',            label: 'Accueil' },
  { href: '/galerie',     label: 'Galerie' },
  { href: '/expositions',        label: 'Expositions' },
  { href: '/articles-de-presse', label: 'Articles de presse' },
  { href: '/contact',            label: 'Contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header>
      {/* Titre */}
      <div className="bg-bordeaux-dark py-4 px-6 flex items-center justify-between border-b border-bordeaux-light">
        <Link
          href="/"
          className="font-serif text-3xl text-creme tracking-wide hover:text-or transition-colors"
          onClick={() => setOpen(false)}
        >
          Michel Gauthier
        </Link>

        {/* Bouton hamburger — mobile uniquement */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2 text-or"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation desktop */}
      <nav className="hidden md:block bg-bordeaux-nav border-b border-or-dark">
        <ul className="max-w-4xl mx-auto flex items-center justify-center">
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

      {/* Menu mobile */}
      {open && (
        <nav className="md:hidden bg-bordeaux-nav border-b border-or-dark">
          <ul>
            {links.map(({ href, label }) => (
              <li key={href} className="border-b border-bordeaux-light last:border-0">
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-4 font-sans text-sm tracking-widest uppercase transition-colors ${
                    pathname === href
                      ? 'text-or'
                      : 'text-creme hover:text-or'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
