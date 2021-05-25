import React from 'react'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import { v4 as getUuid } from 'uuid'

import Header from '../../../components/blog/Header'
import LoadingPage from '../../../components/LoadingPage'
import MarkdownView from '../../../components/MarkdownView'
import { WelcomeModal } from '../../../components/WelcomeModal'
import { Container } from '../../../styles/pages/BlogPost'
import { getPost } from '../../../utils/firebase/post'

interface FormatedPost {
  id: string
  name: string
  date: string
  thumbnail: string
  metaTag: string
  description: string
  content: string
  views: number
  preview: boolean
}

export interface ServerSideProps {
  post: FormatedPost
  url: string
}
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async context => {
  const { id } = context.params
  const post = await getPost(id as string)
  if (!post) {
    return {
      props: {},
      notFound: true
    }
  }
  return {
    props: {
      post,
      url: context.req.url
    }
  }
}
const PostPage: React.FC<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = props => {
  const [postViews, setViews] = React.useState('Carregando visualizações')
  React.useEffect(() => {
    function loadUuid() {
      let uuid = localStorage.getItem('userId')
      if (!uuid) {
        uuid = getUuid()
        localStorage.setItem('userId', uuid)
      }
      return uuid
    }
    function setView(uuid: string) {
      fetch(`/api/views?postId=${props.post.id}&userId=${uuid}`, {
        method: 'PUT'
      })
        .then(async response => {
          const { successCode } = await response.json()
          if (successCode === 1) {
            setViews(`${props.post.views + 1} Visualizações`)
          } else if (successCode === 2) {
            setViews(`${props.post.views} Visualizações`)
          } else {
            setViews('Erro ao carreagar visualizações')
          }
        })
        .catch(() => {
          setViews('Erro ao carreagar visualizações')
        })
    }
    if (!props.post.preview) {
      setView(loadUuid())
    } else {
      setViews(`${props.post.views} Visualizações`)
    }
  }, [props.post.id, props.post.views, props.post.preview])
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
            images: [{ url: props.post.metaTag }],
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
          <img src={props.post.thumbnail} />
          <h1>{props.post.name}</h1>
          <span>Por Guilherme da Silva Benevides</span>
          <br />
          <span>{postViews}</span>
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
