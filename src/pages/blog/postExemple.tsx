import { GetServerSideProps } from 'next'

import PostPage, { ServerSideProps } from './post/[id]'

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async () => {
  const propsResponse = await fetch('http://localhost:8787/props')
  return {
    props: await propsResponse.json()
  }
}
export default PostPage
