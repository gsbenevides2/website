import { NextSeo } from "next-seo";
import { OpenGraphMedia } from "next-seo/lib/types";

interface Props {
    title: string;
    description: string;
    image: OpenGraphMedia;
    type: string;
    site_name: string;
}

export function DefaultSeo(props : Props) {
    const { title, description, image, type, site_name } = props;
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title,
        description,
        site_name,
        locale: "pt_BR",
        images: [image],
        type,
      }}
      twitter={{
        site: "@gsbenevides2",
        handle: "@gsbenevides2",
        cardType: "summary_large_image",
      }}
    />
  );
}
