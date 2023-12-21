import { Button } from "@/components/Button";
import IconButton from "@/components/IconButon";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { TbTrash } from "react-icons/tb";
import styles from "./styles.module.css";
import { useAdminAuthentication } from "@/services/firebase/client/auth";
import { deleteLink, listLinks } from "@/services/firebase/client/links";
import Loader from "@/components/Loader";

interface LinkToList {
  id: string;
  url: string;
}

export default function Page() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [links, setLinks] = useState<LinkToList[]>();

  const loadLinks = useCallback(async () => {
    setLinks(await listLinks());
  }, []);

  useAdminAuthentication(() => {});

  const handleAddLink = useCallback(async () => {
    containerRef.current?.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
    router.push("/admin/links/editor/new");
  }, [router, containerRef]);

  const handleDeleteLink = useCallback(async (id: string) => {
    const confirm = window.confirm("Deseja realmente excluir este link?");
    if (!confirm) return;
    await deleteLink(id);

    setLinks((links) => {
      return links?.filter((link) => link.id !== id);
    });
  }, []);

  const handleToOpenLink = useCallback((link: string) => {
    window.open(link, "_blank");
  }, []);

  useEffect(() => {
    loadLinks();
  }, [loadLinks]);

  const memorizedCompoment = useMemo(() => {
    if (!links) return <Loader />;

    if (links.length === 0) return <h2>Nenhum link cadastrado</h2>;

    return links.map((link) => (
      <li key={link.id}>
        <div className={styles.textArea}>
          <h2 onClick={() => handleToOpenLink(`/l/${link.id}`)}>
            /l/{link.id}
          </h2>
          <h3 onClick={() => handleToOpenLink(link.url)}>{link.url}</h3>
        </div>
        <div className={styles.iconButtonsArea}>
          <IconButton
            icon={TbTrash}
            onClick={() => handleDeleteLink(link.id)}
            size={32}
          />
        </div>
      </li>
    ));
  }, [links, handleToOpenLink, handleDeleteLink]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.containerInside}>
        <Head>
          <title>Gerenciador de Links Curtos</title>
        </Head>
        <h1>Gerenciador de Links</h1>
        <Button onClick={handleAddLink}>Adicionar Link</Button>
        <ul className={styles.linkList}>{memorizedCompoment}</ul>
      </div>
    </div>
  );
}
