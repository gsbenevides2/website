import { NextSeo } from "next-seo";
import { OpenGraphMedia } from "next-seo/lib/types";
import { JsonLd } from "@/components/JsonLd";
import { buildOrganizationJsonLd, buildWebPageJsonLd } from "@/utils/jsonld";

export interface DefaultSeoProps {
  title: string;
  description?: string;
  image?: OpenGraphMedia;
  type?: string;
  site_name: string;
  canonical?: string;
  keywords?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
}

export function DefaultSeo(props: DefaultSeoProps) {
  const {
    title,
    description,
    image,
    type,
    site_name,
    canonical,
    keywords,
    noIndex,
    noFollow,
  } = props;

  let organizationUrl: string | undefined = undefined;
  try {
    if (canonical) organizationUrl = new URL(canonical).origin;
  } catch {
    organizationUrl = canonical;
  }

  const organizationJsonLd =
    organizationUrl && site_name
      ? buildOrganizationJsonLd({
          url: organizationUrl,
          name: site_name,
        })
      : null;

  const webpageJsonLd =
    canonical && title
      ? buildWebPageJsonLd({
          url: canonical,
          name: title,
          description,
        })
      : null;

  const aditionalMetaTags = [
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "author",
      content: "Guilherme Benevides",
    },
  ];

  const images = image ? [image] : [];
  if (keywords && keywords.length > 0) {
    aditionalMetaTags.push({
      name: "keywords",
      content: keywords.join(", "),
    });
  }
  if (image) {
    aditionalMetaTags.push({
      name: "twitter:image",
      content: image.url,
    });
  }

  if (description) {
    aditionalMetaTags.push({
      name: "twitter:description",
      content: description,
    });
  }

  return (
    <>
      {organizationJsonLd && <JsonLd id="org" jsonLd={organizationJsonLd} />}
      {webpageJsonLd && <JsonLd id="webpage" jsonLd={webpageJsonLd} />}
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        noindex={noIndex}
        openGraph={{
          title,
          description,
          site_name,
          locale: "pt_BR",
          images,
          type,
        }}
        nofollow={noFollow}
        additionalMetaTags={aditionalMetaTags}
        twitter={{
          site: "@gsbenevides2",
          handle: "@gsbenevides2",
          cardType: "summary_large_image",
        }}
      />
    </>
  );
}
