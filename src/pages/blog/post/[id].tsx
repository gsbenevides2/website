import { MdCopyAll } from "react-icons/md";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import cb from "react-syntax-highlighter/dist/cjs/styles/prism/cb";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { ParsedUrlQuery } from "querystring";
import BlogHeader from "@/components/BlogHeader";
import {
  Post,
  getFirstTenVisblePostsIds,
  getPost,
} from "@/services/firebase/client/posts";
import styles from "./styles.module.css";
import { JetBrains_Mono } from "next/font/google";
import { useState } from "react";
import { DefaultSeo } from "@/components/DefaultSeo";
import { parseYYYYMMDDtoDDMMYYYY } from "@/utils/parseDateStringtoDateObj";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";

const jetBrainsMono = JetBrains_Mono({
  variable: "--jetBrainsMono",
  subsets: ["latin"],
});

interface Props {
  post: Post;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}
interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFirstTenVisblePostsIds();
  const paths = posts.map((id) => ({
    params: { id },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const { id } = context.params as Params;
  const post = await getPost(id);
  if (!post) return { notFound: true };
  const source = await serialize(post.content);

  return {
    props: {
      post,
      source,
    },
  };
};

export default function PostPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const ResponsiveImage = (imageProps: React.HTMLProps<HTMLImageElement>) => {
    const src = imageProps.src as string;
    let url = src;
    let blur = "";
    if (src.startsWith("firebase://assets/")) {
      const asset = props.post.assets.find((asset) => {
        return asset.name === src.replace("firebase://assets/", "");
      });
      url = asset?.url || src;
      blur = asset?.blur || "";
    }

    return (
      <span className={styles.imageResponsive}>
        <Image
          src={url}
          layout="responsive"
          width={300}
          height={200}
          className={styles.imageResponsive}
          alt={imageProps.alt || "Imagem do Post"}
          placeholder={blur ? "blur" : undefined}
          blurDataURL={blur}
        />
      </span>
    );
  };
  const Link = (linkProps: React.HTMLProps<HTMLLinkElement>) => (
    <a href={linkProps.href} rel="noopener noreferrer" target="_blank">
      {linkProps.children}
    </a>
  );

  interface CodeProps {
    className: string;
    children: string;
  }

  const Code = ({ className, children }: CodeProps) => {
    const [copyMessage, setCopyMessage] = useState(
      "Copiar para Area de Transferencia"
    );
    function copy() {
      copyTextToClipboard(children).then(() => {
        setCopyMessage("Copiado");
        setTimeout(() => {
          setCopyMessage("Copiar para Area de Transferencia");
        }, 3000);
      });
    }
    return (
      <div className={jetBrainsMono.variable}>
        <SyntaxHighlighter
          language={className.replace("language-", "")}
          style={cb}
          customStyle={{
            borderRadius: "8px 8px 0px 0px",
            margin: "1em 0em 0em 0em",
            ...jetBrainsMono.style,
          }}
        >
          {children}
        </SyntaxHighlighter>
        <div className={styles.copy} onClick={copy}>
          <MdCopyAll />
          <span>{copyMessage}</span>
        </div>
      </div>
    );
  };

  const components = {
    img: ResponsiveImage,
    a: Link,
    code: Code,
  };

  return (
    <div className={styles.external}>
      <DefaultSeo
        title={`${props.post.name} - Blog do Guilherme`}
        description={props.post.description}
        image={{
          url: props.post.thumbnail.metaTag,
          alt: props.post.thumbnail.alt,
          width: 500,
          height: 334,
        }}
        site_name="Blog do Guilherme"
        type="blog"
      />
      <BlogHeader />
      <article className={styles.container}>
        <Image
          src={props.post.thumbnail.originalWebp}
          width={300}
          height={200}
          placeholder="blur"
          blurDataURL={props.post.thumbnail.blur}
          alt={`Capa do Post: ${props.post.name}. Contendo: ${props.post.thumbnail.alt}`}
        />
        <h1>{props.post.name}</h1>
        <span>{parseYYYYMMDDtoDDMMYYYY(props.post.date)}</span>
        <div className={styles.postContent}>
          {/* @ts-ignore */}
          <MDXRemote {...props.source} components={components} />
        </div>
      </article>
    </div>
  );
}
