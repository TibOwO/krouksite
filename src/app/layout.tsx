import "./globals.css";
import Image from "next/image";
import { Roboto } from "next/font/google";
import { SectionProvider } from "./context/SectionContext";
import Navbar from "./components/Navbar";

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
        <SectionProvider>
          <header className="fixed z-50 w-full text-white backdrop-blur-md border-b border-white/20 transition h-24">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo Krouks"
                  width={80}
                  height={40}
                  priority
                />
              </div>
              <Navbar />
            </div>
          </header>
          <main className="pt-24">{children}</main>
        </SectionProvider>
      </body>
    </html>
  );
}
