import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType
} from 'next'
import Head from 'next/head'
import React from 'react'
import Header from '../../../components/blog/Header'
import LoadingPage from '../../../components/LoadingPage'
import MarkdownView from '../../../components/MarkdownView'
import { WelcomeModal } from '../../../components/WelcomeModal'
import { Container } from '../../../styles/pages/BlogPost'
import firebase from '../../../utils/firebase'

interface FirebaseDocumentData {
  name: string
  date: firebase.firestore.Timestamp
  image: string
  content: string
}
interface FormatedPost {
  name: string
  date: string
  image: string
  content: string
}
/*
export const getStaticPaths: GetStaticPaths = async () => {
  const documentsSnapshot = await firebase
    .firestore()
    .collection('postsOfBlog')
    .orderBy('date', 'desc')
    .limit(5)
    .get()
  const paths = documentsSnapshot.docs.map(doc => {
    return {
      params: {
        id: doc.id
      }
    }
  })
  return {
    paths,
    fallback: 'blocking'
  }
}
	*/
function parseDocumentData(documentData: FirebaseDocumentData): FormatedPost {
  const dateObject = documentData.date.toDate()
  const date = `${dateObject.getDate()}/${
    dateObject.getMonth() + 1
  }/${dateObject.getFullYear()}`
  return {
    ...documentData,
    date
  }
}
export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.params

  const documentSnapshot = await firebase
    .firestore()
    .doc(`postsOfBlog/${id}`)
    .get()
  if (!documentSnapshot.exists) {
    return {
      props: {},
      notFound: true
    }
  }
  return {
    props: {
      post: parseDocumentData(documentSnapshot.data() as FirebaseDocumentData)
    }
  }
}
const PostPage: React.FC<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = props => {
  if (props.post) {
    return (
      <React.Fragment>
        <Head>
          <title>{props.post.name}</title>
          <meta
            property="description"
            content="Blog do Guilherme: um lugar de informação e conhecimento."
          />
          <meta property="og:site_name" content="Blog do Guilherme" />
          <meta property="og:title" content={props.post.name} />
          <meta
            property="og:description"
            content="Blog do Guilherme: um lugar de informação e conhecimento."
          />
          <meta
            property="og:image"
            itemProp="image"
            content={props.post.image}
          />
          <meta property="og:type" content="website" />
        </Head>
        <Header />
        <WelcomeModal />
        <Container>
          <img src={props.post.image} />
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
