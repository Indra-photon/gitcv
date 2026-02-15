import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./tiptap-editor.css";
import { GoogleTagManager } from '@next/third-parties/google'
import { Toaster } from "@/components/ui/sonner"
import { NavBar } from "@/components/NavBar";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { UserSync } from "@/components/UserSync";
import Script from 'next/script'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://git-cv.com/"), // Update with your actual domain
  title: {
    default: "GitHub Resume Builder | Transform Your Repos into Professional Resumes in Minutes",
    template: "%s | GitHub Resume Builder"
  },
  description: "AI-powered resume builder for developers. Transform your GitHub repositories into professional, ATS-friendly resumes in 10-15 minutes. Perfect for CS students, bootcamp graduates, and junior developers.",
  keywords: [
    // Primary Keywords
    "GitHub resume builder",
    "AI resume generator",
    "developer resume builder",
    "ATS-friendly resume",
    "tech resume generator",
    
    // Target Audience
    "CS student resume",
    "bootcamp graduate resume",
    "junior developer resume",
    "software engineer resume",
    "developer portfolio",
    
    // Features
    "GitHub integration",
    "AI-powered resume",
    "role-specific resume",
    "resume from GitHub projects",
    "code portfolio to resume",
    "automated resume builder",
    
    // Use Cases
    "resume for developers",
    "programming resume",
    "tech job resume",
    "software development resume",
    "GitHub projects resume",
    
    // Technologies
    "Next.js resume builder",
    "React resume generator",
    "TypeScript resume builder",
    
    // Long-tail
    "how to create resume from GitHub",
    "best resume builder for developers",
    "free developer resume builder",
    "ATS resume for tech jobs"
  ],
  
  authors: [
    {
      name: "GitHub Resume Builder Team",
      url: "https://git-cv.com/" // Update with your GitHub
    }
  ],
  
  creator: "GitHub Resume Builder",
  publisher: "GitHub Resume Builder",
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://git-cv.com/",
    siteName: "GitHub Resume Builder",
    title: "GitHub Resume Builder | AI-Powered Resumes from Your Code",
    description: "Transform your GitHub repositories into professional, ATS-friendly resumes in 10-15 minutes. AI-powered, role-specific, and designed for developers.",
    images: [
      {
        url: "/Logo1.svg", // Main OG image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "GitHub Resume Builder - Transform Your Code into Professional Resumes",
        type: "image/png"
      },
      {
        url: "/Logo1.svg", // Square variant for social media
        width: 1200,
        height: 1200,
        alt: "GitHub Resume Builder Logo",
        type: "image/png"
      }
    ]
  },
  
  twitter: {
    card: "summary_large_image",
    title: "GitHub Resume Builder | AI-Powered Resumes from Your Code",
    description: "Transform GitHub repos into professional, ATS-friendly resumes in minutes. Built for CS students, bootcamp grads, and junior developers.",
    images: ["/twitter-image.png"], // 1200x675px recommended
    creator: "@Nil_phy_dreamer", // Update with your Twitter handle
    site: "@Nil_phy_dreamer"
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  icons: {
    icon: [
      { url: "/Logo1.svg", sizes: "16x16", type: "image/png" },
      { url: "/Logo1.svg", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/Logo1.svg", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000"
      }
    ]
  },
  
  manifest: "/site.webmanifest",
  
  alternates: {
    canonical: "https://git-cv.com/",
    languages: {
      'en-US': 'https://git-cv.com/',
    }
  },
  
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  
  category: "Technology",
  
  // Additional metadata for enhanced SEO
  other: {
    "application-name": "GitHub Resume Builder",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "GitHub Resume",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#000000",
    "msapplication-tap-highlight": "no",
    "theme-color": "#000000"
  }
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NavBar />
          <UserSync />
          {children}
          <GoogleTagManager gtmId="Your GTM ID" />
          <Script src="https://cloud.umami.is/script.js" data-website-id="9d2e381e-ed5b-4571-84fc-610ba02bc3cf" />
          <Toaster position="top-right" />
        </body>
      </html>
    </ClerkProvider>
  );
}
