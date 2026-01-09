export function PersonJsonLd({ lang = "en" }) {
  const isAr = lang === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://fs-17.github.io/#person",
    name: isAr ? "فيصل السويد" : "Faisal Alsaweed",
    alternateName: ["Faisal", "فيصل", "FS-17"],
    givenName: isAr ? "فيصل" : "Faisal",
    familyName: isAr ? "السويد" : "Alsaweed",
    url: "https://fs-17.github.io",
    image: {
      "@type": "ImageObject",
      url: "https://fs-17.github.io/main.png",
      width: 1200,
      height: 630,
    },
    jobTitle: isAr ? "مطور برمجيات" : "Software Developer",
    description: isAr
      ? "مطور برمجيات متخصص في تطوير تطبيقات الويب والموبايل وحلول الذكاء الاصطناعي في المملكة العربية السعودية"
      : "Software developer specializing in web applications, mobile development, and AI solutions based in Saudi Arabia",
    email: "FaisalSaweed@gmail.com",
    sameAs: [
      "https://github.com/FS-17",
      "https://linkedin.com/in/faisal-alsaweed",
      "https://fs-17.github.io",
    ],
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Python",
      "AI/ML",
      "Mobile Development",
      "UI/UX Design",
      "Flutter",
      "Node.js",
      "TensorFlow",
      "Machine Learning",
      "Computer Vision",
    ],
    knowsLanguage: [
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
      {
        "@type": "Language",
        name: "Arabic",
        alternateName: "ar",
      },
    ],
    nationality: {
      "@type": "Country",
      name: isAr ? "المملكة العربية السعودية" : "Saudi Arabia",
      alternateName: "SA",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressRegion: isAr ? "المملكة العربية السعودية" : "Saudi Arabia",
    },
    worksFor: {
      "@type": "Organization",
      name: isAr ? "عمل حر" : "Freelance",
    },
    hasOccupation: {
      "@type": "Occupation",
      name: isAr ? "مطور برمجيات" : "Software Developer",
      occupationLocation: {
        "@type": "Country",
        name: "Saudi Arabia",
      },
      skills: "React, Next.js, Python, JavaScript, TypeScript, Flutter, AI/ML",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebsiteJsonLd({ lang = "en" }) {
  const isAr = lang === "ar";
  const baseUrl = "https://fs-17.github.io";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: isAr ? "فيصل السويد - معرض الأعمال" : "Faisal Alsaweed - Portfolio",
    alternateName: isAr
      ? ["معرض أعمال فيصل", "Faisal Portfolio"]
      : ["Faisal Portfolio", "معرض أعمال فيصل"],
    url: isAr ? `${baseUrl}/ar` : baseUrl,
    description: isAr
      ? "معرض أعمال فيصل السويد - مطور برمجيات متخصص في تطوير الويب والتطبيقات وحلول الذكاء الاصطناعي في السعودية"
      : "Faisal Alsaweed's portfolio showcasing web development, mobile apps, and AI solutions in Saudi Arabia",
    inLanguage: isAr ? "ar-SA" : "en-US",
    isAccessibleForFree: true,
    isFamilyFriendly: true,
    copyrightYear: new Date().getFullYear(),
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: isAr ? "فيصل السويد" : "Faisal Alsaweed",
    },
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: isAr ? "فيصل السويد" : "Faisal Alsaweed",
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${baseUrl}${
            isAr ? "/ar" : ""
          }/projects?search={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      {
        "@type": "ReadAction",
        target: isAr ? `${baseUrl}/ar` : baseUrl,
      },
    ],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isAr ? "الرئيسية" : "Home",
          url: isAr ? `${baseUrl}/ar` : baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: isAr ? "المشاريع" : "Projects",
          url: isAr ? `${baseUrl}/ar/projects` : `${baseUrl}/projects`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: isAr ? "تواصل معي" : "Contact",
          url: isAr ? `${baseUrl}/ar/contact` : `${baseUrl}/contact`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Professional Service schema for geo-targeting
export function ProfessionalServiceJsonLd({ lang = "en" }) {
  const isAr = lang === "ar";
  const baseUrl = "https://fs-17.github.io";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#service`,
    name: isAr
      ? "فيصل السويد - خدمات تطوير البرمجيات"
      : "Faisal Alsaweed - Software Development Services",
    description: isAr
      ? "خدمات تطوير برمجيات احترافية تشمل تطبيقات الويب والجوال وحلول الذكاء الاصطناعي"
      : "Professional software development services including web applications, mobile apps, and AI solutions",
    url: baseUrl,
    image: `${baseUrl}/main.png`,
    priceRange: "$$",
    telephone: "+966",
    email: "FaisalSaweed@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      addressRegion: isAr ? "المملكة العربية السعودية" : "Saudi Arabia",
    },

    areaServed: [
      {
        "@type": "Country",
        name: "Saudi Arabia",
        alternateName: "SA",
      },
      {
        "@type": "Country",
        name: "United Arab Emirates",
        alternateName: "UAE",
      },
      "Worldwide",
    ],
    serviceType: [
      "Web Development",
      "Mobile App Development",
      "AI Solutions",
      "Machine Learning",
      "UI/UX Design",
      "Full Stack Development",
      "React Development",
      "Next.js Development",
      "Python Development",
      "Flutter Development",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isAr ? "خدمات التطوير" : "Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "تطوير تطبيقات الويب" : "Web Application Development",
            description: isAr
              ? "تطوير تطبيقات ويب حديثة باستخدام React و Next.js"
              : "Modern web application development using React and Next.js",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "تطوير تطبيقات الجوال" : "Mobile App Development",
            description: isAr
              ? "تطوير تطبيقات جوال متعددة المنصات باستخدام Flutter"
              : "Cross-platform mobile app development using Flutter",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isAr ? "حلول الذكاء الاصطناعي" : "AI & ML Solutions",
            description: isAr
              ? "حلول الذكاء الاصطناعي وتعلم الآلة المخصصة"
              : "Custom AI and machine learning solutions",
          },
        },
      ],
    },
    sameAs: [
      "https://github.com/FS-17",
      "https://linkedin.com/in/faisal-alsaweed",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// FAQ Schema for AI assistants
export function FAQJsonLd({ lang = "en" }) {
  const isAr = lang === "ar";

  const faqData = isAr
    ? [
        {
          question: "من هو فيصل السويد؟",
          answer:
            "فيصل السويد مطور برمجيات متخصص من المملكة العربية السعودية، يعمل في مجال تطوير تطبيقات الويب والجوال وحلول الذكاء الاصطناعي.",
        },
        {
          question: "ما هي الخدمات التي يقدمها فيصل؟",
          answer:
            "يقدم فيصل خدمات تطوير تطبيقات الويب، تطوير تطبيقات الجوال، حلول الذكاء الاصطناعي، تصميم واجهات المستخدم، والتطوير المتكامل باستخدام React و Next.js و Flutter و Python.",
        },
        {
          question: "أين يقع فيصل السويد؟",
          answer:
            "فيصل مقيم في المملكة العربية السعودية ويقدم خدماته محلياً ودولياً.",
        },
        {
          question: "كيف يمكنني التواصل مع فيصل؟",
          answer:
            "يمكنك التواصل عبر البريد الإلكتروني FaisalSaweed@gmail.com أو من خلال LinkedIn أو صفحة التواصل في الموقع.",
        },
      ]
    : [
        {
          question: "Who is Faisal Alsaweed?",
          answer:
            "Faisal Alsaweed is a professional software developer from Saudi Arabia, specializing in web applications, mobile development, and AI solutions.",
        },
        {
          question: "What services does Faisal offer?",
          answer:
            "Faisal offers web application development, mobile app development, AI/ML solutions, UI/UX design, and full-stack development using React, Next.js, Flutter, and Python.",
        },
        {
          question: "Where is Faisal Alsaweed located?",
          answer:
            "Faisal is based in Saudi Arabia and provides services both locally and internationally.",
        },
        {
          question: "How can I contact Faisal?",
          answer:
            "You can reach Faisal via email at FaisalSaweed@gmail.com, through LinkedIn, or via the contact page on his website.",
        },
        {
          question: "What technologies does Faisal work with?",
          answer:
            "Faisal works with React, Next.js, TypeScript, JavaScript, Python, Flutter, Node.js, TensorFlow, AWS, GCP, and various other modern technologies.",
        },
      ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ProjectJsonLd({ project, lang = "en" }) {
  const isAr = lang === "ar";
  const baseUrl = "https://fs-17.github.io";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.metaDescription || project.description,
    url: `${baseUrl}${isAr ? "/ar" : ""}/projects/${project.slug}`,
    image: project.thumbnail
      ? `${baseUrl}${project.thumbnail}`
      : `${baseUrl}/main.png`,
    author: {
      "@type": "Person",
      name: isAr ? "فيصل السويد" : "Faisal Alsaweed",
      url: baseUrl,
    },
    dateCreated: project.date,
    keywords: project.categories?.join(", "),
    inLanguage: isAr ? "ar-SA" : "en-US",
  };

  // Add client/organization if available
  if (project.client) {
    jsonLd.sourceOrganization = {
      "@type": "Organization",
      name: project.client,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function BreadcrumbJsonLd({ items, lang = "en" }) {
  const baseUrl = "https://fs-17.github.io";
  const isAr = lang === "ar";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ContactPageJsonLd({ lang = "en" }) {
  const isAr = lang === "ar";
  const baseUrl = "https://fs-17.github.io";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: isAr ? "تواصل معي - فيصل السويد" : "Contact - Faisal Alsaweed",
    description: isAr
      ? "تواصل مع فيصل السويد لمناقشة مشاريعك البرمجية"
      : "Get in touch with Faisal Alsaweed to discuss your software projects",
    url: `${baseUrl}${isAr ? "/ar" : ""}/contact`,
    mainEntity: {
      "@type": "Person",
      name: isAr ? "فيصل السويد" : "Faisal Alsaweed",
      url: baseUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
