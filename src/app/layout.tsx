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
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body>
        <ClientProviders>
          <div className="min-h-screen flex flex-col">
            <Navbar adminUrl={process.env.ADMIN_URL ?? "http://localhost:3000/"} />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  );
}

