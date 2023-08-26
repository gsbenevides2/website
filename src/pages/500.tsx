import SVG500 from "@/components/500SVG";
import SVG404 from "@/components/404SVG";
import styles from "./404And500styles.module.css";
import { Button } from "@/components/Button";
import { DefaultSeo } from "@/components/DefaultSeo";
import getOpenMediaImageForNextSeo from "@/utils/getOpenMediaImageForNextSeo";
import Link from "next/link";
import { useCallback, useRef } from "react";
import { useRouter } from "next/router";

export default function Page404() {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const goToHome = useCallback(async () => {
    if (!divRef.current) return;
    divRef.current.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/");
  }, [divRef, router]);

  return (
    <div ref={divRef} className={styles.hideContainer}>
      <div className={styles.container}>
        <DefaultSeo
          description="Algo de errado não está certo 🤔"
          title="500 - Erro interno do servidor"
          image={getOpenMediaImageForNextSeo("Erro interno do servidor")}
          site_name="Site do Guilherme"
          type="website"
        />
        <div className={styles.textArea}>
          <h1>Algo de errado não está certo 🤔</h1>
          <p>
            Ops! O servidor está um pouco confuso, mas nossa página inicial está
            ansiosa para te receber de braços abertos. Vamos pegar o trem da
            alegria e voltar para casa?
          </p>
          <Button onClick={goToHome}>Pegar 🚈 e voltar para 🏠</Button>
        </div>
        <div className={styles.svgArea}>
          <SVG500 />
        </div>
      </div>
    </div>
  );
}
