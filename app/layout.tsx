import type { Metadata, Viewport } from "next";
import { Unna } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { env } from "@/env.mjs";
import { siteConfig } from "@/config/site";
import { absoluteUrl, cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers";
import { SiteHeader } from "@/components/layouts/site-header";
import LayoutFooter from "@/components/LayoutFooter";

const unna = Unna({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-unna",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "nextjs",
    "react",
    "react server components",
    "Alter Ego",
    "skateboarding",
    "kickflip",
  ],
  authors: [
    {
      name: "JakiSundays",
      url: "https://www.sadmn.com",
    },
  ],
  creator: "JakiSundays",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@JakiSundays",
  },
  icons: {
    icon: "/icon.png",
  },
  manifest: absoluteUrl("/site.webmanifest"),
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
