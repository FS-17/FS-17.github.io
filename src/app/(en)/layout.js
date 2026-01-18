import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {
  PersonJsonLd,
  WebsiteJsonLd,
  ProfessionalServiceJsonLd,
  FAQJsonLd,
} from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://fs-17.github.io";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:
      "Faisal Alsaweed | Software Developer & Full Stack Engineer | Saudi Arabia",
    template: "%s | Faisal Alsaweed",
  },
  description:
    "Faisal Alsaweed - Expert Software Developer in Saudi Arabia specializing in React, Next.js, Python, AI/ML, and mobile app development. View my portfolio of web applications, interactive solutions, and innovative projects. Available for hire.",
  keywords: [
    "Faisal Alsaweed",
    "Software Developer",
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "AI Developer",
    "Machine Learning",
    "Mobile App Developer",
    "Saudi Arabia Developer",
    "Riyadh Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "Freelance Developer Saudi Arabia",
    "مطور برمجيات",
    "فيصل السويد",
    "مطور سعودي",
  ],
  authors: [{ name: "Faisal Alsaweed", url: BASE_URL }],
  creator: "Faisal Alsaweed",
  publisher: "Faisal Alsaweed",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-US": BASE_URL,
      "ar-SA": `${BASE_URL}/ar`,
      "x-default": BASE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ar_SA"],
    url: BASE_URL,
    siteName: "Faisal Alsaweed Portfolio",
    title:
      "Faisal Alsaweed | Software Developer & Full Stack Engineer | Saudi Arabia",
    description:
      "Expert Software Developer in Saudi Arabia specializing in React, Next.js, Python, AI/ML, and mobile app development. Explore my portfolio of innovative web applications and interactive solutions.",
    images: [
      {
        url: "/main.png",
        width: 1200,
        height: 630,
        alt: "Faisal Alsaweed - Software Developer Portfolio",
        type: "image/png",
      },
    ],
    countryName: "Saudi Arabia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Faisal Alsaweed | Software Developer & Full Stack Engineer",
    description:
      "Expert Software Developer in Saudi Arabia specializing in React, Next.js, Python, AI/ML, and mobile app development.",
    images: ["/main.png"],
    creator: "@faisal_alsaweed",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "Vmw4tRlC_16LzAOBiyGfAUtkf_GQDztEQMN2_1m-3Gk",
  },
  category: "technology",
  classification: "Software Development Portfolio",
  other: {
    "geo.region": "SA",
    "geo.country": "Saudi Arabia",
    "geo.placename": "Riyadh, Saudi Arabia",
    "dc.language": "en",
    "dc.coverage": "Saudi Arabia",
    "dc.creator": "Faisal Alsaweed",
    "dc.subject": "Software Development, Web Development, AI, Machine Learning",
    "ai.description":
      "Faisal Alsaweed is a software developer from Saudi Arabia specializing in web development, mobile apps, and AI solutions. He works with React, Next.js, Python, Flutter, and more.",
    "ai.keywords":
      "software developer, web developer, Saudi Arabia, React, Next.js, Python, AI, machine learning, mobile development",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/main.png" />
        <meta name="theme-color" content="#1e3a8a" />
        <meta name="google-site-verification" content="Vmw4tRlC_16LzAOBiyGfAUtkf_GQDztEQMN2_1m-3Gk" />
        <meta name="geo.region" content="SA" />
        <meta name="geo.placename" content="Saudi Arabia" />
        <meta name="language" content="English" />
        <meta httpEquiv="content-language" content="en-US" />
        <PersonJsonLd lang="en" />
        <WebsiteJsonLd lang="en" />
        <ProfessionalServiceJsonLd lang="en" />
        <FAQJsonLd lang="en" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-900 text-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
