import React from 'react'

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
        <title>Página Não Encontrada</title>
      </Head>
      <div className="card">
        <img
          onClick={playMusic}
          src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/openmoji/272/robot_1f916.png"
          alt="Robo"
        />
        <h1>Ops não encontrei o que procuras</h1>
        <p>Talvez o link que você abriu esteja quebrado ou errado.</p>
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
