import React from 'react'
import Header from '../../components/blog/Header'
import { PageContainer } from '../../styles/pages/BlogHome'
import Link from 'next/link'
import Head from 'next/head'

const BlogIndexPage: React.FC = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Blog do Guilherme</title>
      </Head>
      <Header />
      <PageContainer>
        <Link href="/blog/post/criar-sites-com-react-e-ssr">
          <li className="firstPost">
            <img src="https://picsum.photos/300/200" />
            <h2>Como desenvolver aplicações performaticas com next</h2>
          </li>
        </Link>
        <Link href="/blog/post/criar-sites-com-react-e-cu">
          <li className="post postA">
            <img src="https://picsum.photos/300/200" />
            <h2>Como desenvolver aplicações performaticas com next</h2>
          </li>
        </Link>
        <li className="post postMore">
          <img src="https://picsum.photos/300/200" />
          <h2>Como desenvolver aplicações performaticas com next</h2>
        </li>
      </PageContainer>
    </React.Fragment>
  )
}

export default BlogIndexPage
