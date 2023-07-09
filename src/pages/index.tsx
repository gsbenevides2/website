import styles from "./index.module.css";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { useCallback, useEffect, useRef } from "react";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import { DefaultSeo } from "@/components/DefaultSeo";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const goToNext = useCallback(async () => {
    if (!containerRef.current) return;
    containerRef.current.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 400));
    router.push("/about");
  }, [containerRef, router]);

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
        <h1 className={styles.title}>
          Olá 👋
          <br />
          Eu sou Guilherme.
          <br />
          Seja bem vindo!
        </h1>
        <Button className={styles.button} onClick={goToNext}>
          Venha me conhecer mais
        </Button>
      </div>
      <div className={styles.secondArea}>
        <div className={styles.image} />
      </div>
    </div>
  );
}
