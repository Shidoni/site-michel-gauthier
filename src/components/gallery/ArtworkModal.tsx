'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/lib/imageUrl'
import type { ArtworkModalProps } from '@/types'

export default function ArtworkModal({ oeuvre, isOpen, onClose }: ArtworkModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || !oeuvre) return null

  const imageUrl = urlForImage(oeuvre.image).width(1200).height(1200).fit('max').url()

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 lg:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={oeuvre.titre}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
        aria-label="Fermer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        className="flex flex-col lg:flex-row items-center gap-8 max-w-5xl w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-shrink-0 max-h-[70vh] max-w-full lg:max-w-2xl">
          <Image
            src={imageUrl}
            alt={oeuvre.image.alt || oeuvre.titre}
            width={900}
            height={900}
            className="object-contain max-h-[70vh] w-auto"
            style={{ maxHeight: '70vh' }}
          />
        </div>

        <div className="text-white lg:min-w-48">
          <p className="text-xs tracking-widest uppercase text-white/50 mb-2">
            {oeuvre.section.charAt(0).toUpperCase() + oeuvre.section.slice(1)}
          </p>
          <h2 className="font-serif text-2xl font-light mb-4">{oeuvre.titre}</h2>
          {oeuvre.description && (
            <p className="text-sm text-white/70 leading-relaxed">{oeuvre.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}
