import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer, Toaster } from "@/components/cart/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";

export const metadata: Metadata = {
  title: {
    default: "RFI Comunicaciones · Comunicación sin límites",
    template: "%s · RFI Comunicaciones",
  },
  description:
    "Soluciones integrales en radiocomunicación, comunicación satelital y redes para operaciones que mantienen el mundo en movimiento. Motorola, ICOM, Hytera, Garmin, Iridium e Inmarsat en Colombia.",
  keywords: ["radios de dos vías", "Motorola Colombia", "teléfono satelital", "Iridium", "Inmarsat", "Garmin inReach", "radiocomunicación"],
};

export const viewport: Viewport = {
  themeColor: "#060b16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-navy antialiased">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <Toaster />
          <FloatingActions />
        </CartProvider>
      </body>
    </html>
  );
}
