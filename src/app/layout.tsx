// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata = {
  title: "Krouks - Monteur Vidéo",
  description: "Portfolio de monteur vidéo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={roboto.className}>
      <body className="bg-black text-white antialiased">
        {/* Header translucide */}
        <header className="fixed top-0 left-0 w-full z-20 backdrop-blur-lg bg-black/30 border-b border-white/10">
          <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
            <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-80 transition">
              🎬 Krouk’s
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-orange-400 transition">Accueil</Link>
              <Link href="/projects" className="hover:text-orange-400 transition">Projets</Link>
              <Link href="/contact" className="hover:text-orange-400 transition">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
