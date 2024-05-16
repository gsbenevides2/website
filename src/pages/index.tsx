import styles from "./index.module.scss";
import { ButtonSSRLink } from "@/components/Button";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { DefaultSeo } from "@/components/DefaultSeo";
import { EntrySkeletonType } from "contentful";
import { GetStaticProps } from "next";
import { getContentfulClient } from "@/services/contentful";

interface HomePageSkeletonType extends EntrySkeletonType {
  contentType: "homePage";
  fields: CMS;
}

interface CMS {
  buttonText: string;
  title: string;
}
interface Props {
  cms: CMS;
}

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const client = getContentfulClient(context.draftMode || false);

  const entries = await client.getEntries<HomePageSkeletonType>({
    content_type: "homePage",
  });

  const cms = entries.items[0].fields;

  return {
    props: {
      cms,
    },
  };
};

export default function Home(props: Props) {
  console.log(props);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const goToNext: MouseEventHandler<HTMLAnchorElement> = useCallback(
    async (event) => {
      event.preventDefault();
      const { currentTarget } = event;
      if (!containerRef.current) return;
      containerRef.current.classList.add(styles.hide);
      await new Promise((resolve) => setTimeout(resolve, 400));
      router.push(currentTarget.href);
    },
    [containerRef, router]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <DefaultSeo
        title="Site do Guilherme"
        description="Seja bem vindo ao meu site pessoal!"
        image={getOpenMediaImageForNextSeo("Site do Guilherme")}
        site_name="Site do Guilherme"
        type="website"
      />
      <div className={styles.firstArea}>
        <h1 className={styles.title}>{props.cms.title}</h1>
        <ButtonSSRLink
          href="/about"
          className={styles.button}
          onClick={goToNext}
        >
          {props.cms.buttonText}
        </ButtonSSRLink>
      </div>
      <div className={styles.secondArea}>
        <div className={styles.image} />
      </div>
    </div>
  );
}
