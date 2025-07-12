import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SearchProvider } from "@/hooks/use-search";
import { ReactQueryProvider } from "@/lib/react-query-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio - Senior Software Engineer",
  description: "Modern personal portfolio showcasing expertise in full-stack development, cloud architecture, and software engineering at Mastercard.",
  keywords: ["software engineer", "portfolio", "react", "nextjs", "typescript", "mastercard", "full-stack"],
  authors: [{ name: "Senior Software Engineer" }],
  creator: "Senior Software Engineer",
  publisher: "Portfolio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Portfolio - Senior Software Engineer",
    description: "Modern personal portfolio showcasing expertise in full-stack development, cloud architecture, and software engineering.",
    url: "https://portfolio.replit.app",
    siteName: "Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio - Senior Software Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Senior Software Engineer",
    description: "Modern personal portfolio showcasing expertise in full-stack development, cloud architecture, and software engineering.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <SearchProvider>
            <ReactQueryProvider>
              {children}
              <Toaster />
            </ReactQueryProvider>
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}