import { NextSeo } from "next-seo";
import { OpenGraphMedia } from "next-seo/lib/types";

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
  );
}
