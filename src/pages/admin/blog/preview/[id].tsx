import { GetServerSideProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { ParsedUrlQuery } from "querystring";
import { Post, getPost } from "@/services/firebase/admin/posts";
import Cookies from "cookies";
import { validateAdminUser } from "@/services/firebase/admin/auth";
import PostPage from "@/pages/blog/post/[id]";

interface Props {
  post: Post;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}
interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const cookies = new Cookies(context.req, context.res);
  const token = cookies.get("idToken");
  if (!token)
    return { redirect: { destination: "/admin", permanent: false } };
  const isValid = await validateAdminUser(token);
  if (!isValid)
    return { redirect: { destination: "/admin", permanent: false } };
  const { id } = context.params as Params;
  const post = await getPost(id);
  if (!post) return { notFound: true };
  const source = await serialize(post.content);
  cookies.set("idToken");
  return {
    props: {
      post,
      source,
    },
  };
};

export default PostPage;
