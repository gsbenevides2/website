import React from 'react'
import Header from '../../components/blog/Header'
import { Empty, PageContainer } from '../../styles/pages/BlogHome'
import Link from 'next/link'
import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import firebase from '../../utils/firebase'
import emptyImage from '../../assets/empty.png'

interface Post {
  name: string
  id: string
  image: string
}

export const getStaticProps: GetStaticProps = async () => {
  const collectionSnapshot = await firebase
    .firestore()
    .collection('postsOfBlog')
    .orderBy('date', 'desc')
    .limit(10)
    .get()
  const posts: Post[] = collectionSnapshot.docs.map(doc => {
    return {
      name: doc.data().name,
      image: doc.data().image,
      id: doc.id
    }
  })
  return {
    props: { posts },
    revalidate: 60
  }
}

const BlogIndexPage: React.FC<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  const [posts, setPosts] = React.useState(props.posts)
  const [loadingMore, setLoadingMore] = React.useState(false)
  const [end, setEnd] = React.useState(props.posts.length < 10 ? true : false)
  const firstPost = posts[0]
  const postA = posts.slice(1, 4)
  const morePosts = posts.slice(5)
  const scrollCallback = React.useCallback(() => {
    const endOfPage =
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    async function loadMorePosts() {
      const lastDocument = await firebase
        .firestore()
        .doc(`postsOfBlog/${posts[posts.length - 1].id}`)
        .get()
      const collectionSnapshot = await firebase
        .firestore()
        .collection('postsOfBlog')
        .orderBy('date', 'desc')
        .startAfter(lastDocument)
        .limit(10)
        .get()
      const newPosts: Post[] = collectionSnapshot.docs.map(doc => {
        return {
          name: doc.data().name,
          image: doc.data().image,
          id: doc.id
        }
      })
      if (newPosts.length < 10) {
        setEnd(true)
      }
      setPosts([...posts, ...newPosts])
    }
    if (endOfPage && !loadingMore && !end) {
      setLoadingMore(true)
      loadMorePosts()
        .then(() => {
          setLoadingMore(false)
        })
        .catch(() => {
          setLoadingMore(false)
        })
    }
  }, [posts, loadingMore, end])
  React.useEffect(() => {
    window.addEventListener('scroll', scrollCallback)
  }, [])
  return (
    <React.Fragment>
      <Head>
        <title>Blog do Guilherme</title>
      </Head>
      <Header />
      {firstPost ? (
        <PageContainer>
          <Link href={`/blog/post/${firstPost.id}`}>
            <li className="firstPost">
              <img src={firstPost.image} />
              <h2>{firstPost.name}</h2>
            </li>
          </Link>
          {postA.map(post => (
            <Link key={post.id} href={`/blog/post/${post.id}`}>
              <li className="post postA">
                <img src={post.image} />
                <h2>{post.name}</h2>
              </li>
            </Link>
          ))}
          {morePosts.map(post => (
            <Link key={post.id} href={`/blog/post/${post.id}`}>
              <li className="post postMore">
                <img src={post.image} />
                <h2>{post.name}</h2>
              </li>
            </Link>
          ))}
        </PageContainer>
      ) : (
        <Empty>
          <img src={emptyImage} />
          <h1>Ops não tem post nenhum aqui</h1>
          <span>Aguarde teremos novidades</span>
        </Empty>
      )}
    </React.Fragment>
  )
}

export default BlogIndexPage
