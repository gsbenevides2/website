import React from 'react'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { NextSeo } from 'next-seo'
import NextImage from 'next/image'
import { parseCookies, setCookie } from 'nookies'
import { v4 as getUuid } from 'uuid'

import Header from '../../../components/blog/Header'
import LoadingPage from '../../../components/LoadingPage'
import MarkdownView from '../../../components/MarkdownView'
import { WelcomeModal } from '../../../components/WelcomeModal'
import { viewerCounter } from '../../../services/viewerCounter'
import { Container } from '../../../styles/pages/BlogPost'
import { getPost } from '../../../utils/firebase/post'

export interface FormatedPost {
  id: string
  name: string
  date: string
  thumbnail: string
  metaTag: string
  description: string
  content: string
  views: number
  thumbnailAlt: string
}

export interface ServerSideProps {
  post: FormatedPost
}
export const getServerSideProps: GetServerSideProps<ServerSideProps> =
  async context => {
    const { id } = context.params
    const postData = await getPost(id as string)

    if (!postData) {
      return {
        props: {},
        notFound: true
      }
    }
    const { views: viewsId, ...restOfPost } = postData
    let { 'blog.viewerId': viewerId } = parseCookies(context)
    if (!viewerId) {
      viewerId = getUuid()
      setCookie(context, 'blog.viewerId', viewerId)
    }
    const views = await viewerCounter(viewerId, viewsId, id as string)
    return {
      props: {
        post: { ...restOfPost, views }
      }
    }
  }
const PostPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = props => {
  if (props.post) {
    return (
      <React.Fragment>
        <NextSeo
          title={`${props.post.name} - Blog do Guilherme`}
          description={props.post.description}
          openGraph={{
            title: `${props.post.name} - Blog do Guilherme`,
            description: props.post.description,
            site_name: 'Blog do Guilherme',
            locale: 'pt_BR',
            url: `https://gui.dev.br/blog/post/${props.post.id}`,
            images: [
              {
                url: props.post.metaTag,
                alt: props.post.thumbnailAlt,
                width: 500,
                height: 334
              }
            ],

            type: 'blog'
          }}
          twitter={{
            site: '@gsbenevides2',
            handle: '@gsbenevides2',
            cardType: 'summary_large_image'
          }}
        />
        <Header />
        <WelcomeModal />
        <Container>
          <div className="thumbcontainer">
            <NextImage
              className="thumb"
              layout="fill"
              src={props.post.thumbnail}
              alt={props.post.thumbnailAlt}
            />
          </div>
          <h1>{props.post.name}</h1>
          <span>Por Guilherme da Silva Benevides</span>
          <br />
          <span>{props.post.date}</span>
          <div className="content">
            <MarkdownView text={props.post.content} />
          </div>
        </Container>
      </React.Fragment>
    )
  } else {
    return <LoadingPage />
  }
}

export default PostPage
