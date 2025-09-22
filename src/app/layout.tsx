import "./globals.css";
import Link from "next/link";
import Image from "next/image";
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
      <body className="bg-transparent">
        <header className="fixed z-50 w-full text-white backdrop-blur-md border-b border-white/20 transition h-24">
          <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
            <Link href="/" className="flex items-center hover:opacity-50 transition">
              <Image
                src="/logo.png"
                alt="Logo Krouks"
                width={80}
                height={40}
                priority
              />
            </Link>

            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-orange-400 transition">Accueil</Link>
              <Link href="/projects" className="hover:text-orange-400 transition">Projets</Link>
              <Link href="/contact" className="hover:text-orange-400 transition">Contact</Link>
            </nav>
          </div>
        </header>
        <main className="pt-24">{children}</main>
      </body>
    </html>
  );
}
