import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import React from 'react'
import Header from '../../../components/blog/Header'
import LoadingPage from '../../../components/LoadingPage'
import MarkdownView from '../../../components/MarkdownView'
import { Container } from '../../../styles/pages/BlogPost'
import firebase from '../../../utils/firebase'

interface FirebaseDocumentData {
  name: string
  date: string
  image: string
  content: string
}
export const getStaticPaths: GetStaticPaths = async () => {
  const documentsSnapshot = await firebase
    .firestore()
    .collection('postsOfBlog')
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
export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params

  const documentSnapshot = await firebase
    .firestore()
    .doc(`postsOfBlog/${id}`)
    .get()
  if (!documentSnapshot.exists) {
    return {
      props: {},
      revalidate: 300,
      notFound: true
    }
  }
  return {
    props: { post: documentSnapshot.data() as FirebaseDocumentData },
    revalidate: 60
  }
}
const PostPage: React.FC<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  if (props.post) {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <img src={props.post.image} />
          <h1>{props.post.name}</h1>
          <span>Por Guilherme da Silva Benevides</span>
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
