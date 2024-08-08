import type { Metadata, Viewport } from "next";
import { Unna } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers";
import { SiteHeader } from "@/components/layouts/site-header";
import LayoutFooter from "@/components/LayoutFooter";
import Favicon from "/favicon_io/favicon.ico";

const unna = Unna({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-unna",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alterego4k.com.ar"),
  title: {
    default: "alterego4k®",
    template: "%s | alterego4k®",
  },
  description:
    "marca de diseño argentino que comunica sobre la creación de un alter ego.",
  applicationName: "alterego4k®",
  authors: [
    {
      name: "alterego4k®",
      url: "https://www.instagram.com/alterego4k/",
    },
    {
      name: "Jacob Dominguez",
      url: "https://www.linkedin.com/in/jacobguillermo/",
    },
    {
      name: "Iconiq Nerds",
      url: "https://www.iconiqnerds.com/",
    },
  ],
  generator: "Next.js",
  keywords: [
    "camperas oversized",
    "bullbenny",
    "marca de ropa argentina",
    "ropa argentina",
    "enlighted",
    "moda",
    "buzos oversized",
    "cybersigilism",
    "marca de ropa de argentina",
    "moda argentina",
    "ropa de diseño",
    "ropa de diseñador",
    "marca de diseño",
    "marca de diseñador",
    "psicología",
    "indumentaria",
    "indumentaria argentina",
  ],
  referrer: "origin",
  creator: "alterego4k®",
  publisher: "alterego4k®",
  robots: "index",
  icons: {
    icon: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
  },
  // icons: [{ rel: "icon", url: Favicon.src }],
  openGraph: {
    type: "website",
    url: "https://alterego4k.com.ar",
    title: "alterego4k® | por qué crear tu alter ego",
    description:
      "marca de diseño argentino que comunica sobre la creación de un alter ego.",
    siteName: "alterego4k®",
    images: [
      {
        url: "/alteregologo.png",
        width: 1200,
        height: 630,
        alt: "Logotipo de alterego4K",
      },
    ],
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            unna.variable,
            inter.variable,
            "min-h-screen bg-background font-sans antialiased"
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            // disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">
                <SiteHeader user={null} />

                {children}
                <LayoutFooter />
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
