import React from 'react'

import { NextSeo } from 'next-seo'

export function SEO(props: Props): React.ReactElement {
  return (
    <NextSeo
      title={props.title}
      description={props.description}
      openGraph={{
        title: props.title,
        description: props.description,
        url: props.url,
        images: [
          {
            url: props.image,
					 alt: props.alt,
					 width:500,
					 height:334
          }
        ],
				type:props.type,
				profile:
      }}
    />
  )
}
