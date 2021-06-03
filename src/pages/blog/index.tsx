import React from 'react'

import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import emptyImage from '../../assets/empty.png'
import Header from '../../components/blog/Header'
import { WelcomeModal } from '../../components/WelcomeModal'
import { Empty, PageContainer } from '../../styles/pages/BlogHome'
import { getInitialPosts, getNextPosts } from '../../utils/firebase/post'

interface Post {
  name: string
  id: string
  thumbnail: string
  thumbnailAlt: string
}
interface Props {
  posts: Post[]
}
export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getInitialPosts()
  return {
    props: { posts },
    revalidate: 10
  }
}

const BlogIndexPage: React.FC<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  const [posts, setPosts] = React.useState(props.posts)
  const [loadingMore, setLoadingMore] = React.useState(false)
  const [end, setEnd] = React.useState(props.posts.length < 10)
  const firstPost = posts[0]
  const postA = posts.slice(1, 4)
  const morePosts = posts.slice(5)

  const scrollCallback = React.useCallback(() => {
    const endOfPage =
      window.innerHeight + window.scrollY >= document.body.offsetHeight
    async function loadMorePosts() {
      const morePosts = await getNextPosts(posts[posts.length - 1].id)
      if (morePosts.length < 10) {
        setEnd(true)
      }
      setPosts([...posts, ...morePosts])
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
      <NextSeo
        title="Blog do Guilherme"
        description="Blog do Guilherme: um lugar de informação e conhecimento."
        openGraph={{
          title: 'Blog do Guilherme',
          description:
            'Blog do Guilherme: um lugar de informação e conhecimento.',
          site_name: 'Blog do Guilherme',
          locale: 'pt_BR',
          images: [
            {
              url: '/blog.png',
              alt:
                'A minha foto de perfil no fundo preto ao lado escrito em branco: Blog do Guilherme.',
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
      {firstPost ? (
        <PageContainer>
          <Link href="/blog/post/[id]" as={`/blog/post/${firstPost.id}`}>
            <li className="firstPost">
              <img src={firstPost.thumbnail} alt={firstPost.thumbnailAlt} />
              <h2>{firstPost.name}</h2>
            </li>
          </Link>
          {postA.map(post => (
            <Link
              key={post.id}
              href="/blog/post/[id]"
              as={`/blog/post/${post.id}`}
            >
              <li className="post postA">
                <img src={post.thumbnail} alt={post.thumbnailAlt} />
                <h2>{post.name}</h2>
              </li>
            </Link>
          ))}
          {morePosts.map(post => (
            <Link
              key={post.id}
              href="/blog/post/[id]"
              as={`/blog/post/${post.id}`}
            >
              <li className="post postMore">
                <img src={post.thumbnail} alt={post.thumbnailAlt} />
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
