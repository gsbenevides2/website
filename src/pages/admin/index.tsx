import styles from "./styles.module.css";
import { Button } from "@/components/Button";
import { RefObject, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import {
  logIn,
  useAdminAuthentication,
  logOut,
} from "@/services/firebase/client/auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const useRedirect = (
  containerRef: RefObject<HTMLDivElement>,
  router: AppRouterInstance,
  destination: string
) => {
  return useCallback(async () => {
    containerRef.current?.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push(destination);
  }, [router, containerRef, destination]);
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const authenticatedRef = useRef<HTMLDivElement>(null);
  const unauthenticatedRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useAdminAuthentication((user) => {
    if (user) {
      authenticatedRef.current?.classList.add(styles.unHide);
      unauthenticatedRef.current?.classList.remove(styles.unHide);
    } else {
      authenticatedRef.current?.classList.remove(styles.unHide);
      unauthenticatedRef.current?.classList.add(styles.unHide);
    }
  });

  const loginButtonClick = useCallback(async () => {
    try {
      await logIn();
    } catch (e: any) {
      if (e?.message === "Usuário não autorizado") {
        alert("Você não tem permissão para acessar o painel de administração!")
      } else {
        console.log(e);
      }
    }
  }, []);

  const logOutButtonClick = useCallback(() => {
    logOut();
  }, []);

  const projectsButtonClick = useRedirect(
    containerRef,
    router,
    "/admin/projects"
  );
  const certificationsButtonClick = useRedirect(
    containerRef,
    router,
    "/admin/certifications"
  );
  const linksButtonClick = useRedirect(containerRef, router, "/admin/links");
  const blogButtonClick = useRedirect(containerRef, router, "/admin/blog");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      <Head>
        <title>Guilherme Benevides</title>
      </Head>
      <div className={styles.firstArea}>
        <h1 className={styles.title}>Olá Guilherme 👋</h1>
        <h2 className={styles.subtitle}>
          Seja bem vindo ao painel de adminstrador
        </h2>
        <p className={styles.description}>
          Aqui você pode adicionar, editar e remover os projetos do seu
          portfólio, e alterar suas certificações.
        </p>
        <div className={styles.authArea}>
          <div className={styles.buttonsArea} ref={unauthenticatedRef}>
            <p className={styles.description}>
              Para continuar, faça login com sua conta do
              Google(gsbenevides2@gmail.com).
            </p>
            <Button className={styles.button} onClick={loginButtonClick}>
              Fazer login com o Google
            </Button>
          </div>
          <div className={styles.buttonsArea} ref={authenticatedRef}>
            <Button className={styles.button} onClick={projectsButtonClick}>
              Projetos
            </Button>
            <Button
              className={styles.button}
              onClick={certificationsButtonClick}
            >
              Certificações
            </Button>
            <Button className={styles.button} onClick={blogButtonClick}>
              Blog
            </Button>
            <Button className={styles.button} onClick={linksButtonClick}>
              Links
            </Button>
            <Button className={styles.button} onClick={logOutButtonClick}>
              Sair
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.secondArea}>
        <div className={styles.image} />
      </div>
    </div>
  );
}
