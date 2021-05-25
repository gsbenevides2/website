import React from 'react'

import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Link from 'next/link'

import { Container } from '../styles/pages/Error'

const Page: React.FC = () => {
  const playMusic = React.useCallback(() => {
    document.getElementsByTagName('audio')[0].play()
  }, [])
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
      <Head>
        <title>Erro Interno no Servidor</title>
      </Head>
      <NextSeo
        title="Erro Interno do Servidor"
        description="Aconteceu um erro ao processar sua requisição."
        openGraph={{
          title: 'Erro Interno do Servidor',
          description: 'Aconteceu um erro ao processar sua requisição.',
          type: 'website',
          locale: 'pt_BR',
          site_name: 'Site e Blog do Guilherme',
          images: [
            {
              url: '/500.png',
              alt:
                'A minha foto de perfil no fundo preto ao lado um texto em branco escrito: Erro Interno do Servidor.',
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
          onClick={playMusic}
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/openmoji/272/robot_1f916.png"
          alt="Robo"
        />
        <h1>Ops, algo de errado aconteceu!</h1>
        <p>
          Algo estava fora dos planos. E aconteceu um erro no sistema. Reporte o
          erro para o Gui.
        </p>
        <Link href="/">
          <a />
        </Link>
      </div>
      <audio>
        <source src="/error.mp3" type="audio/mpeg" />
      </audio>
    </Container>
  )
}
export default Page
