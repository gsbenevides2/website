import { AuthState, logIn, logOut, useAuthentication } from "@/services/firebase/client/auth";

import { Button, ButtonAnchor } from "@/components/Button";
import { SelfStorageFileDocument, getFile, getFileUrl, getServerUrl } from "@/services/firebase/client/selfstorage";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";

type States = "loading" | "loaded" | "not-found" | "firestore-error";

export default function Page() {
  const router = useRouter();
  const [state, setState] = useState<States>("loading");
  const [file, setFile] = useState<SelfStorageFileDocument | null>(null);
  const serverUrl = getServerUrl();

  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const authState = useAuthentication();
  const id = useMemo(() => router.query.id, [router.query.id]);

  const loadData = useCallback(async () => {
    if (id === undefined) return;
    if (typeof id !== "string") return setState("not-found");
    if (authState.state === AuthState.Loading) return;
    getFile(id)
      .then(async (link) => {
        if (link === null) return setState("not-found");
        const fileUlr = await getFileUrl(id, link.filename);
        setDownloadUrl(fileUlr);
        setFile(link);
        setState("loaded");
      })
      .catch((error) => {
        console.error(error);
        setState("firestore-error");
      });
  }, [id, authState.state]);

  const authenticate = useCallback(() => {
    logIn().then(() => loadData());
  }, [loadData]);
  const reauthenticate = useCallback(() => {
    logOut().then(() => logIn().then(() => loadData()));
  }, [loadData]);
  const logOutClick = useCallback(() => {
    logOut().then(() => loadData());
  }, [loadData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className={styles.container}>
      <h1>Serviço de Armazenamento de Arquivos</h1>
      <p>Identificador do arquivo: {id}</p>
      {state === "loading" && <p>Aguarde estamos buscando as informações...</p>}
      {state === "not-found" && <p>Arquivo não encontrado</p>}
      {state === "loaded" && file && <p>Nome do Arquivo: {file.filename}</p>}
      {state === "loaded" && file && <p>Criado em: {file.dateOfCreation.toDate().toLocaleString()}</p>}
      {state === "loaded" && file && <p>Última Atualização: {file.dateOfLastUpdate.toDate().toLocaleString()}</p>}
      {state === "loaded" && authState.state === AuthState.Authenticated && (
        <p>
          Você está logado como: {authState.user?.email}.{" "}
          <span className={styles.logOut} onClick={logOutClick}>
            Clique aqui
          </span>{" "}
          para fazer logout.
        </p>
      )}
      {state === "loaded" && file && (
        <ButtonAnchor href={downloadUrl} download>
          Baixar
        </ButtonAnchor>
      )}

      {state === "firestore-error" && authState.state === AuthState.Unauthenticated && (
        <p className={styles.error}>
          Ocorreu um erro ao buscar as informações do arquivo.
          <br />
          Talvez você precise se autenticar para acessar este arquivo.
          <br />
          <Button onClick={authenticate}>Autenticar</Button>
        </p>
      )}

      {state === "firestore-error" && authState.state === AuthState.Authenticated && (
        <p className={styles.error}>
          Ocorreu um erro ao buscar as informações do arquivo.
          <br />
          Você está logado como: {authState.user?.email}.<br /> Talvez você não tenha permissão para acessar este arquivo. Tente se autenticar com outro usuário.
          <br />
          <Button onClick={reauthenticate}>Reautenticar</Button>
        </p>
      )}
    </div>
  );
}
