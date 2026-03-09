// app/admin/layout.js
// Ce layout remplace la navigation principale pour toutes les pages /admin

export const metadata = {
  title: 'Admin — Dr Serge Chaussé',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-cream">
      {/* Barre admin simple */}
      <div className="bg-charcoal text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="font-display text-lg">Dr Chaussé</span>
          <span className="text-white/40 text-sm">|</span>
          <span className="text-white/60 text-sm">Administration</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="/admin" className="text-white/60 hover:text-white transition-colors">Dashboard</a>
          <a href="/admin/analytics" className="text-white/60 hover:text-white transition-colors">Analytics</a>
          <a href="/" className="text-accent-400 hover:text-accent-300 transition-colors">← Site public</a>
        </div>
      </div>
      {/* Contenu */}
      {children}
    </div>
  )
}
