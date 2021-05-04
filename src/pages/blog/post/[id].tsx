import React from 'react'

import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { v4 as getUuid } from 'uuid'

import Header from '../../../components/blog/Header'
import LoadingPage from '../../../components/LoadingPage'
import MarkdownView from '../../../components/MarkdownView'
import { WelcomeModal } from '../../../components/WelcomeModal'
import { Container } from '../../../styles/pages/BlogPost'
import firebase from '../../../utils/firebase'

interface FirebaseDocumentData {
  name: string
  date: firebase.firestore.Timestamp
  thumbnail: {
    originalWebp: string
    metaTag: string
  }
  description: string
  content: string
  views: string[]
}
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
function parseDocumentData(
  documentData: FirebaseDocumentData,
  id: string
): FormatedPost {
  const dateObject = documentData.date.toDate()
  const date = `${dateObject.getDate()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getFullYear()}`
  return {
    id,
    name: documentData.name,
    content: documentData.content,
    thumbnail: documentData.thumbnail.originalWebp,
    metaTag: documentData.thumbnail.metaTag,
    date,
    description: documentData.description,
    views: documentData.views?.length || 0,
    preview: false
  }
}

export interface ServerSideProps {
  post: FormatedPost
  url: string
}
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async context => {
  const { id } = context.params
  console.time('Obtendo Post')
  const documentSnapshot = await firebase
    .firestore()
    .doc(`apps/${process.env.NEXT_ENV}/postsOfBlog/${id}`)
    .get()
  console.timeEnd('Obtendo Post')
  if (!documentSnapshot.exists) {
    return {
      props: {},
      notFound: true
    }
  }
  return {
    props: {
      post: parseDocumentData(
        documentSnapshot.data() as FirebaseDocumentData,
        documentSnapshot.id
      ),
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
        <Head>
          <title>{props.post.name}</title>
          <meta property="description" content={props.post.description} />
          <meta property="og:site_name" content="Blog do Guilherme" />
          <meta property="og:title" content={props.post.name} />
          <meta property="og:description" content={props.post.description} />
          <meta property="og:image" content={props.post.metaTag} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={props.url} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
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
