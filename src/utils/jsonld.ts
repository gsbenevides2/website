export type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

export function toJsonLdScript(jsonLd: JsonLd): string {
  return JSON.stringify(jsonLd);
}

export function buildOrganizationJsonLd(params: {
  url: string;
  name: string;
  logo?: string;
  sameAs?: string[];
  email?: string;
  telephone?: string;
}): Record<string, unknown> {
  const { url, name, logo, sameAs, email, telephone } = params;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    url,
    name,
    ...(logo ? { logo } : {}),
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
    ...(email ? { email } : {}),
    ...(telephone ? { telephone } : {}),
  };
}

export function buildWebSiteJsonLd(params: {
  url: string;
  name: string;
  potentialActionTarget?: string;
}): Record<string, unknown> {
  const { url, name, potentialActionTarget } = params;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url,
    name,
    ...(potentialActionTarget
      ? {
          potentialAction: {
            "@type": "SearchAction",
            target: potentialActionTarget,
            "query-input": "required name=search_term_string",
          },
        }
      : {}),
  };
}

export function buildPersonJsonLd(params: {
  name: string;
  url: string;
  sameAs?: string[];
}): Record<string, unknown> {
  const { name, url, sameAs } = params;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildWebPageJsonLd(params: {
  url: string;
  name: string;
  description?: string;
  isPartOf?: {
    url: string;
    name: string;
  };
}): Record<string, unknown> {
  const { url, name, description, isPartOf } = params;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name,
    ...(description ? { description } : {}),
    ...(isPartOf ? { isPartOf } : {}),
  };
}

export function buildBlogPostingJsonLd(params: {
  url: string;
  headline: string;
  description?: string;
  datePublished?: string;
  dateModified?: string;
  author?: { name: string; url?: string };
  publisher?: { name: string; url?: string; logo?: string };
  image?: string;
}): Record<string, unknown> {
  const {
    url,
    headline,
    description,
    datePublished,
    dateModified,
    author,
    publisher,
    image,
  } = params;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    url,
    headline,
    ...(description ? { description } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(image ? { image } : {}),
    ...(author ? { author } : {}),
    ...(publisher
      ? {
          publisher,
        }
      : {}),
  };
}

export function buildServiceJsonLd(params: {
  serviceType: string;
  provider: {
    name: string;
    url?: string;
  };
  url?: string;
  description?: string;
  areaServed?: string;
}): Record<string, unknown> {
  const { serviceType, provider, url, description, areaServed } = params;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType,
    provider,
    ...(url ? { url } : {}),
    ...(description ? { description } : {}),
    ...(areaServed ? { areaServed } : {}),
  };
}

export function buildFAQPageJsonLd(params: {
  url: string;
  mainEntity: Array<{
    question: string;
    acceptedAnswer: string;
  }>;
}): Record<string, unknown> {
  const { url, mainEntity } = params;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    mainEntity: mainEntity.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.acceptedAnswer,
      },
    })),
  };
}

export function buildCreativeWorkJsonLd(params: {
  url: string;
  name: string;
  description?: string;
  image?: string;
  sameAs?: string[];
}): Record<string, unknown> {
  const { url, name, description, image, sameAs } = params;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    url,
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildCourseJsonLd(params: {
  url: string;
  name: string;
  description?: string;
  provider: { name: string; url?: string };
  datePublished?: string;
  image?: string;
}): Record<string, unknown> {
  const { url, name, description, provider, datePublished, image } = params;

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    url,
    ...(description ? { description } : {}),
    provider,
    ...(datePublished ? { datePublished } : {}),
    ...(image ? { image } : {}),
  };
}
