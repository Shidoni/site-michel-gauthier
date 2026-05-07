export default function Footer() {
  return (
    <footer className="border-t border-stone-100 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center">
        <p className="text-xs text-stone-400 tracking-wide">
          © {new Date().getFullYear()} Michel Gauthier
        </p>
      </div>
    </footer>
  )
}
