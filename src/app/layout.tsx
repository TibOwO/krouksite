// app/layout.tsx
import "./globals.css";
import Link from "next/link";
import Image from "next/image"; // 🔥 On ajoute Image pour le logo
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
      <body className=" min-h-screen bg-transparent ">
        {/* Header transparent */}
        <header className=" fixed text-white w-full backdrop-blur-md border-b border-white/20 gradient-move transition h-23 ">
          <div className="max-w-6xl mx-auto flex justify-between items-center ">
            {/* Logo en .webp */}
            <Link href="/" className="hover:opacity-50 transition flex items-center">
              <Image 
                src="/logo.webp"   // 👈 Mets ton fichier logo.webp dans /public
                alt="Logo Krouks"
                width={70}        // ajuste la taille
                height={40} 
                priority           // optimisation du chargement
              />
            </Link>
            {/* Menu */}
            <nav className=" flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-orange-400 transition">Accueil</Link>
              <Link href="/projects" className="hover:text-orange-400 transition">Projets</Link>
              <Link href="/contact" className="hover:text-orange-400 transition">Contact</Link>
            </nav>
          </div>
        </header>

        {/* Décale le contenu pour pas qu'il passe sous la nav */}
        <main className="pt-20 main-div-color">{children}</main>
      </body>
    </html>
  );
}
