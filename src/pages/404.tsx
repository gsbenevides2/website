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
          description="Parece que você está perdido, mas não se preocupe, pegue esse mapa e vamos voltar para casa."
          title="404 - Página não encontrada"
          image={getOpenMediaImageForNextSeo("Página não encontrada")}
          site_name="Site do Guilherme"
          type="website"
        />
        <div className={styles.textArea}>
          <h1>Mas como você veio parar aqui?</h1>
          <p>
            Parece que você está perdido, mas não se preocupe, pegue esse mapa e
            vamos voltar para casa.
          </p>
          <Button onClick={goToHome}>Pegar 🗺️ e voltar para 🏠</Button>
        </div>
        <div className={styles.svgArea}>
          <SVG404 />
        </div>
      </div>
    </div>
  );
}
