import { Tajawal } from "next/font/google";
import "../globals.css";
import {
  PersonJsonLd,
  WebsiteJsonLd,
  ProfessionalServiceJsonLd,
  FAQJsonLd,
} from "@/components/JsonLd";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

const BASE_URL = "https://fs-17.github.io";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "فيصل السويد | مطور برمجيات ومهندس تطبيقات | السعودية",
    template: "%s | فيصل السويد",
  },
  description:
    "فيصل السويد - مطور برمجيات متخصص في المملكة العربية السعودية في React و Next.js و Python والذكاء الاصطناعي وتطوير تطبيقات الجوال. استعرض معرض أعمالي من تطبيقات الويب والحلول التفاعلية والمشاريع المبتكرة. متاح للتوظيف.",
  keywords: [
    "فيصل السويد",
    "مطور برمجيات",
    "مطور ويب",
    "مطور تطبيقات",
    "مهندس برمجيات",
    "React",
    "Next.js",
    "Python",
    "ذكاء اصطناعي",
    "تعلم آلي",
    "مطور سعودي",
    "مطور الرياض",
    "تطوير واجهات",
    "JavaScript",
    "TypeScript",
    "معرض أعمال",
    "مطور حر السعودية",
    "Faisal Alsaweed",
    "Software Developer",
    "Saudi Arabia Developer",
  ],
  authors: [{ name: "فيصل السويد", url: `${BASE_URL}/ar` }],
  creator: "فيصل السويد",
  publisher: "فيصل السويد",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: `${BASE_URL}/ar`,
    languages: {
      "en-US": BASE_URL,
      "ar-SA": `${BASE_URL}/ar`,
      "x-default": BASE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: ["en_US"],
    url: `${BASE_URL}/ar`,
    siteName: "معرض أعمال فيصل السويد",
    title: "فيصل السويد | مطور برمجيات ومهندس تطبيقات | السعودية",
    description:
      "مطور برمجيات متخصص في المملكة العربية السعودية في React و Next.js و Python والذكاء الاصطناعي. استكشف معرض أعمالي من تطبيقات الويب والحلول التفاعلية.",
    images: [
      {
        url: `${BASE_URL}/main.png`,
        width: 1200,
        height: 630,
        alt: "فيصل السويد - معرض أعمال مطور برمجيات",
        type: "image/png",
      },
    ],
    countryName: "Saudi Arabia",
  },
  twitter: {
    card: "summary_large_image",
    title: "فيصل السويد | مطور برمجيات ومهندس تطبيقات",
    description:
      "مطور برمجيات متخصص في المملكة العربية السعودية في React و Next.js و Python والذكاء الاصطناعي وتطوير تطبيقات الجوال.",
    images: [`${BASE_URL}/main.png`],
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "geo.region": "SA",
    "geo.country": "المملكة العربية السعودية",
    "geo.placename": "الرياض، السعودية",
    "dc.language": "ar",
    "dc.coverage": "المملكة العربية السعودية",
    "dc.creator": "فيصل السويد",
    "dc.subject": "تطوير البرمجيات، تطوير الويب، الذكاء الاصطناعي، تعلم الآلة",
    "ai.description":
      "فيصل السويد مطور برمجيات من المملكة العربية السعودية متخصص في تطوير الويب وتطبيقات الجوال وحلول الذكاء الاصطناعي. يعمل مع React و Next.js و Python و Flutter وأكثر.",
    "ai.keywords":
      "مطور برمجيات، مطور ويب، السعودية، React، Next.js، Python، ذكاء اصطناعي، تعلم آلي، تطوير جوال",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
        />
        <meta name="theme-color" content="#1e3a8a" />
        <meta
          name="google-site-verification"
          content="Vmw4tRlC_16LzAOBiyGfAUtkf_GQDztEQMN2_1m-3Gk"
        />
        <meta name="geo.region" content="SA" />
        <meta name="geo.placename" content="المملكة العربية السعودية" />
        <meta name="language" content="Arabic" />
        <meta httpEquiv="content-language" content="ar-SA" />
        <PersonJsonLd lang="ar" />
        <WebsiteJsonLd lang="ar" />
        <ProfessionalServiceJsonLd lang="ar" />
        <FAQJsonLd lang="ar" />
      </head>
      <body
        className={`${tajawal.variable} font-tajawal antialiased bg-gray-900 text-gray-200`}
      >
        {children}
      </body>
    </html>
  );
}
