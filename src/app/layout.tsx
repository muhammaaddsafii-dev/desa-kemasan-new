import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "Desa Sukamakmur - Portal Resmi Desa",
  description:
    "Portal resmi Desa Sukamakmur — pusat informasi, layanan publik, dan data desa untuk masyarakat.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <ClientProviders>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}

