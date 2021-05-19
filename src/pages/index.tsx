import React from 'react'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'

import { ArrowDownSvg } from '../components/home/ArrowDownSvg'
import { BlogSvg } from '../components/home/BlogSvg'
import { CurriculumSvg } from '../components/home/CurriculumSvg'
import { GitHubSvg } from '../components/home/GitHubSvg'
import { InstagramSvg } from '../components/home/InstagramSvg'
import { LinkedinSvg } from '../components/home/LinkedinSvg'
import { TwitterSvg } from '../components/home/TwitterSvg'
import { Container } from '../styles/commons/GradientContainer'
import { FirstPage, SeccoundPage } from '../styles/pages/Home'
import { calculateAge } from '../utils/calculateAge'

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      age: calculateAge()
    },
    revalidate: 2629746
  }
}

const Home: React.FC<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  const [page, setPage] = React.useState(1)
  function setDocumentHeightCssVariable() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  const scrollTo = React.useCallback((pageTo: number) => {
    document.getElementById(`page_${pageTo}`).scrollIntoView({
      behavior: 'smooth'
    })
    setPage(pageTo)
  }, [])
  const callbackToOnResizeWindow = React.useCallback(() => {
    setDocumentHeightCssVariable()
    scrollTo(page)
  }, [page])
  React.useEffect(() => {
    function disableScroll() {
      document.body.style.overflow = 'hidden'
    }
    setDocumentHeightCssVariable()
    disableScroll()
    window.addEventListener('resize', callbackToOnResizeWindow)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('resize', callbackToOnResizeWindow)
    }
  })
  return (
    <Container>
      <Head>
        <title>Página Inicial</title>
        <meta property="description" content="Site do Guilherme" />
        <meta property="og:site_name" content="Site do Guilherme" />
        <meta property="og:title" content="Site do Guilherme" />
        <meta property="og:description" content="Site do Guilherme" />
        <meta property="og:type" content="website" />
      </Head>
      <FirstPage id="page_1">
        <div className="card">
          <img
            src="https://avatars0.githubusercontent.com/u/45762112?s=460&u=94ef867a7a94c17a8205b3cf5fe6cd0384dd7c36&v=4"
            alt="Rosto de Guilherme"
          />
          <h1>Bem-Vindo</h1>
          <button onClick={() => scrollTo(2)}>
            <ArrowDownSvg />
          </button>
        </div>
      </FirstPage>
      <SeccoundPage id="page_2">
        <div className="card">
          <p onClick={() => scrollTo(1)}>
            Olá me chamo Guilherme, {` ${props.age} `} tenho anos, seja muito
            bem-vindo ao meu site. Sou desenvolvedor Javascript, crio sites,
            WebApps e Apps para celular(Expo/React Native). Caso queira me
            conhecer mais acesse os links abaixo.
          </p>
        </div>
        <ul className="social-media">
          <li>
            <Link href="/curriculo">
              <a>
                <CurriculumSvg />
                <span>Curriculo</span>
              </a>
            </Link>
          </li>
          <li>
            <a
              href="https://twitter.com/gsbenevides2"
              target="_blank"
              rel="noreferrer"
              className="twitter"
            >
              <TwitterSvg />
              <span>Twitter</span>
            </a>
          </li>
          <li>
            <Link href="/blog">
              <a>
                <BlogSvg />
                <span>Blog</span>
              </a>
            </Link>
          </li>
          <li>
            <a
              href="https://linkedin.com/gsbenevides2"
              className="linkedin"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedinSvg />
              <span>Linkedin</span>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/gsbenevides2"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubSvg />
              <span>Github</span>
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/gsbenevides2"
              className="instagram"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramSvg />
              <span>Instagram</span>
            </a>
          </li>
        </ul>
      </SeccoundPage>
    </Container>
  )
}

export default Home
