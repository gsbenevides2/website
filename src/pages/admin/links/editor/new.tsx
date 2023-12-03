import Input from "@/components/Input";
import Head from "next/head";
import {
  FormEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import {
  addOrUpdateLink,
} from "@/services/firebase/client/links";
import { useAdminAuthentication } from "@/services/firebase/client/auth";
import Loader from "@/components/Loader";

export default function Page() {
  const router = useRouter();
  const hidder = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);

  const [id, setId] = useState("");
  const [url, setUrl] = useState("");

  useAdminAuthentication(() => { });

  const formSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();
      if (!hidder.current) return;
      if (!loader.current) return;

      hidder.current.classList.add(styles.hide);
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
      loader.current.classList.add(styles.update);
      loader.current.classList.add(styles.show);
      await new Promise((resolve) => setTimeout(resolve, 500));

      await addOrUpdateLink({
        id,
        url,
      });

      hidder.current.classList.remove(styles.hide);
      loader.current.classList.remove(styles.update);
      loader.current.classList.remove(styles.show);
      document.body.style.overflow = "auto";

      router.push("/admin/links");
    },
    [id, url, router]
  );;

  return (
    <>
      <div className={styles.hidder} ref={hidder}>
        <div className={styles.container}>
          <Head>
            <title>Adicionar Link</title>
          </Head>
          <h1>Adicionar Link</h1>
          <form className={styles.form} onSubmit={formSubmit}>
            <Input
              label="Id do link:"
              placeholder="Digite o id/encurtamento do link"
              required
              state={id}
              setState={setId}
              id="id"
            />
            <Input
              label="Url:"
              placeholder="Digite a URL do Link de destino:"
              required
              state={url}
              setState={setUrl}
              id="institution"
            />
            <Button type="submit">Salvar Link</Button>
          </form>
        </div>
      </div>
      <div className={styles.loader} ref={loader}>
        <Loader />
        <span>Estamos fazendo algumas operações aguarde</span>
      </div>
    </>
  );
}
