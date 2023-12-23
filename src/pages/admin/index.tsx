import styles from "./styles.module.css";
import { Button } from "@/components/Button";
import { MouseEventHandler, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import {
  adminLogIn,
  useAdminAuthentication,
  logOut,
  AuthState,
} from "@/services/firebase/client/auth";
import React from "react";
import { wait } from "@/utils/wait";

const loggedButtonOptions = {
  Projetos: "/admin/projects",
  Certificações: "/admin/certifications",
  Blog: "/admin/blog",
  Links: "/admin/links",
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const authenticatedRef = useRef<HTMLDivElement>(null);
  const unauthenticatedRef = useRef<HTMLDivElement>(null);
  const { state } = useAdminAuthentication();

  const router = useRouter();
  const showAuthenticatedRef = useCallback(async () => {
    unauthenticatedRef.current?.classList.remove(styles.unHide);
    await wait(500);
    authenticatedRef.current?.classList.add(styles.unHide);
  }, [authenticatedRef, unauthenticatedRef]);
  const showUnauthenticatedRef = useCallback(async () => {
    authenticatedRef.current?.classList.remove(styles.unHide);
    await wait(500);
    unauthenticatedRef.current?.classList.add(styles.unHide);
  }, [authenticatedRef, unauthenticatedRef]);

  React.useEffect(() => {
    if (state === AuthState.Authenticated) {
      showAuthenticatedRef();
    } else if (state === AuthState.Unauthenticated) {
      showUnauthenticatedRef();
    }
  }, [state, showAuthenticatedRef, showUnauthenticatedRef]);

  const loginButtonClick = useCallback(async () => {
    try {
      await adminLogIn();
    } catch (e: any) {
      if (e?.message === "Usuário não autorizado") {
        alert("Você não tem permissão para acessar o painel de administração!");
      } else {
        alert("Ocorreu um erro ao tentar fazer login! Veja o console.")
        console.error(e);
      }
    }
  }, []);

  const logOutButtonClick = useCallback(() => {
    logOut();
  }, []);

  const handleLoggedButtonClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      async (clickEvent) => {
        if (!containerRef.current) return;
        const textContent = clickEvent.currentTarget
          .innerText as keyof typeof loggedButtonOptions;
        const destination = loggedButtonOptions[textContent];
        if (destination) {
          containerRef.current.classList.add(styles.hide);
          await wait(500);
          router.push(destination);
        }
      },
      [router]
    );

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
            <Button
              key="LogIn"
              className={styles.button}
              onClick={loginButtonClick}
            >
              Fazer login com o Google
            </Button>
          </div>
          <div className={styles.buttonsArea} ref={authenticatedRef}>
            {Object.entries(loggedButtonOptions).map(([key]) => (
              <Button
                key={key}
                className={styles.button}
                onClick={handleLoggedButtonClick}
              >
                {key}
              </Button>
            ))}
            <Button
              key="LogOut"
              className={styles.button}
              onClick={logOutButtonClick}
            >
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
