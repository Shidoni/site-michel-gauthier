import { groq } from 'next-sanity'

const IMAGE_FRAGMENT = groq`{
  asset-> { _id, url, metadata { dimensions } },
  hotspot,
  crop,
  alt
}`

export const QUERY_ARTISTE = groq`
  *[_type == "artiste"][0] {
    photo ${IMAGE_FRAGMENT},
    biographie
  }
`

export const QUERY_OEUVRES_ALL = groq`
  *[_type == "oeuvre"] | order(_createdAt desc) {
    _id,
    titre,
    section,
    description,
    image ${IMAGE_FRAGMENT}
  }
`

export const QUERY_OEUVRES_BY_SECTION = groq`
  *[_type == "oeuvre" && section == $section] | order(_createdAt desc) {
    _id,
    titre,
    section,
    description,
    image ${IMAGE_FRAGMENT}
  }
`

export const QUERY_EXPOSITIONS_A_VENIR = groq`
  *[_type == "exposition" && date >= $today] | order(date asc) {
    _id,
    titre,
    date,
    lieu
  }
`

export const QUERY_EXPOSITIONS_PASSEES = groq`
  *[_type == "exposition" && date < $today] | order(date desc) {
    _id,
    titre,
    date,
    lieu
  }
`

export const QUERY_DISTINCTIONS = groq`
  *[_type == "distinction"] | order(annee desc, _createdAt desc) {
    _id,
    titre,
    annee,
    description
  }
`

export const QUERY_CONTACT = groq`
  *[_type == "contact"][0] {
    email,
    telephone
  }
`
