import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import BlogHeader from "@/components/BlogHeader";
import { getVisiblePosts, Post } from "@/services/firebase/client/posts";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { MouseEventHandler, useCallback, useRef } from "react";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { DefaultSeo } from "@/components/DefaultSeo";
import { parseYYYYMMDDtoDDMMYYYY } from "@/utils/parseDateStringtoDateObj";
import Link from "next/link";

interface Props {
  posts: Post[];
}
interface PostProps {
  post: Post;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getVisiblePosts();
  return {
    props: { posts },
    revalidate: 60 * 60, // 1 hour
  };
};

function Post({ post, onClick }: PostProps) {
  return (
    <Link href={`/blog/post/${post.id}`} onClick={onClick}>
      <li className={styles.post}>
        <Image
          src={post.thumbnail.list}
          width={500}
          height={334}
          placeholder="blur"
          layout="responsive"
          blurDataURL={post.thumbnail.blur}
          alt={`Capa do Post: ${post.name}. Contendo: ${post.thumbnail.alt}`}
        />

        <div className={styles.postData}>
          <span className={styles.postTitle}>{post.name}</span>
          <span className={styles.postDate}>
            {parseYYYYMMDDtoDDMMYYYY(post.date)}
          </span>
        </div>
      </li>
    </Link>
  );
}

export default function Blog(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { posts } = props;
  const containerRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  const postClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    async (event) => {
      const href = event.currentTarget.href;
      event.preventDefault();
      if (!containerRef.current) return;
      containerRef.current.classList.add(styles.hide);
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.push(href);
    },
    [containerRef, router]
  );

  return (
    <div>
      <DefaultSeo
        title="Blog do Guilherme"
        description="Blog do Guilherme: um lugar de informação e conhecimento."
        image={getOpenMediaImageForNextSeo("Blog do Guilherme")}
        type="blog"
        site_name="Blog do Guilherme"
      />

      <BlogHeader />
      <div className={styles.container}>
        <ul className={styles.postsList} ref={containerRef}>
          {posts.map((post) => (
            <Post post={post} key={post.id} onClick={postClick} />
          ))}
        </ul>
      </div>
    </div>
  );
}
