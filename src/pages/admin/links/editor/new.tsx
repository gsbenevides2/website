import InputCustom from "@/components/Input";
import Head from "next/head";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { addOrUpdateLink } from "@/services/firebase/client/links";
import Loader from "@/components/Loader";
import { Form, Input } from "@/components/Form";
import { FormSubmitEvent } from "@/components/Form/types";
import {
  AuthState,
  useAdminAuthentication,
} from "@/services/firebase/client/auth";
import classNames from "classnames";

interface FormValues {
  id: string;
  url: URL;
}

export default function Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const hidder = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);
  const { state: authState } = useAdminAuthentication();

  const formSubmit: FormSubmitEvent<FormValues> = useCallback(
    async (e) => {
      setIsLoading(true);
      const values = e;

      await new Promise((resolve) => setTimeout(resolve, 500));
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 500));

      await addOrUpdateLink({
        id: values.id,
        url: values.url.toString(),
      });

      setIsLoading(false);
      router.push("/admin/links");
    },
    [router]
  );

  useEffect(() => {
    if (authState === AuthState.Unauthenticated) {
      setIsLoading(false);
      router.push("/admin");
    } else if (authState === AuthState.Authenticated) {
      setIsLoading(false);
    }
  }, [authState, router]);

  useEffect(() => {
    if (!hidder.current) return;
    if (!loader.current) return;
    if (isLoading) {
      hidder.current.classList.add(styles.hide);
      loader.current.classList.add(styles.update);
      loader.current.classList.add(styles.show);
      document.body.style.overflow = "hidden";
    } else {
      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";
    }
  }, [isLoading, hidder, loader]);

  return (
    <>
      <div className={classNames(styles.hidder, styles.hide)} ref={hidder}>
        <div className={styles.container}>
          <Head>
            <title>Adicionar Link</title>
          </Head>
          <h1>Adicionar Link</h1>
          <Form className={styles.form} submit={formSubmit}>
            <Input
              id="id"
              name="id"
              type="text"
              placeholder="Digite o id/encurtamento do link"
              required
              customComponent={({ ref, ...props }) => (
                <InputCustom
                  {...props}
                  label="Digite o id/encurtamento do link"
                />
              )}
            />
            <Input
              id="url"
              name="url"
              type="url"
              placeholder="Digite a url do link"
              required
              customComponent={({ ref, ...props }) => (
                <InputCustom {...props} label="Digite a url do link" />
              )}
            />
            <Button type="submit">Salvar Link</Button>
          </Form>
        </div>
      </div>
      <div
        className={classNames(styles.loader, styles.show, styles.update)}
        ref={loader}
      >
        <Loader />
        <span>Estamos fazendo algumas operações aguarde</span>
      </div>
    </>
  );
}
