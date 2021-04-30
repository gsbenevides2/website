import { GetServerSideProps } from 'next'

import PostPage, { ServerSideProps } from './post/[id]'

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async context => {
  const { postId, ngrokId } = context.query
  const postResponse = await fetch(
    `https://${ngrokId}.ngotk.io/props?postId=${postId}`
  )
  const post = await postResponse.json()
  return { props: { post } }
}
export default PostPage
