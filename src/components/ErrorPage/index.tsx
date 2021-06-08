import React from 'react'
import YouTube from 'react-youtube'

import { NextSeo } from 'next-seo'
import Link from 'next/link'

import { Container } from './styles'
const videos = [
  'cm66nazK6SY',
  'k6LB6nrkoJU',
  'uKxyLmbOc0Q',
  'AiosKUO7oqo',
  'dv13gl0a-FA',
  '3fBEWU4q5fg',
  'RudoiNohQ3Q',
  'RudoiNohQ3Q',
  'gDRg8I5S5IE',
  'yxxyjDFnbb0',
  'dBymYOAvgdA',
  '-1Q6Iep70wo',
  '5BZLz21ZS_Y',
  'D3-vBBQKOYU',
  '3UV8OZj2olg',
  '5TGgJQgDf68',
  'cm66nazK6SY'
]
function getVideoId(): string {
  return videos[Math.floor(Math.random() * videos.length)]
}
interface Props {
  options: {
    header: {
      title: string
      description: string
      url: string
      alt: string
    }
    page: {
      h1: string
      p: string
    }
  }
}
export const ErrorPage: React.FC<Props> = props => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ytPlayer, setYtPlayer] = React.useState<any>()
  const play = React.useCallback(() => {
    if (!ytPlayer) return
    const player = document.getElementById('player')
    player.style.display = 'flex'
    ytPlayer?.playVideo?.()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ytPlayer?.addEventListener?.('onStateChange', (event: any) => {
      console.log(event, 'oi')
      if (event.data === 0) {
        ytPlayer?.loadVideoById?.(getVideoId())
      }
    })
  }, [ytPlayer])
  const close = React.useCallback(() => {
    const player = document.getElementById('player')
    player.style.display = 'none'
    ytPlayer?.pauseVideo?.()
  }, [ytPlayer])
  function setDocumentHeightCssVariable() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  React.useEffect(() => {
    setDocumentHeightCssVariable()
    window.addEventListener('resize', setDocumentHeightCssVariable)
  })
  return (
    <Container>
      <NextSeo
        title={props.options.header.title}
        description={props.options.header.description}
        openGraph={{
          title: props.options.header.title,
          description: props.options.header.description,
          site_name: 'Site e Blog do Guilherme',
          type: 'website',
          locale: 'pt_BR',
          images: [
            {
              url: props.options.header.url,
              alt: props.options.header.alt,
              width: 500,
              height: 334
            }
          ]
        }}
        twitter={{
          site: '@gsbenevides2',
          cardType: 'summary_large_image'
        }}
      />
      <div className="card">
        <img
          onClick={play}
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/openmoji/272/robot_1f916.png"
          alt="Robo"
        />
        <h1>{props.options.page.h1}</h1>
        <p>{props.options.page.p}</p>
        <Link href="/">
          <a />
        </Link>
      </div>
      <div id="player" onClick={close}>
        <YouTube
          videoId={getVideoId()}
          className="youtube"
          opts={{ playerVars: { autoplay: 1 }, width: '100%' }}
          onReady={event => {
            setYtPlayer(event.target)
          }}
        />
      </div>
    </Container>
  )
}
