export default function Footer() {
  return (
    <footer className="border-t border-bordeaux-light mt-16">
      <div className="max-w-4xl mx-auto px-6 py-6 text-center">
        <p className="font-serif text-or-dark text-sm tracking-wide">
          © {new Date().getFullYear()} Michel Gauthier — Artiste peintre
        </p>
      </div>
    </footer>
  )
}
