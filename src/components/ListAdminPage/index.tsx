import { Button } from "@/components/Button";
import IconButton from "@/components/IconButon";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./styles.module.css";
import {
  AuthState,
  useAdminAuthentication,
} from "@/services/firebase/client/auth";
import Loader from "@/components/Loader";
import { IconType } from "react-icons";

interface ListItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  blurImage: string;
  altImage: string;
}

interface ListButton {
  icon: (id: string) => IconType;
  onClick: (id: string) => (void | string) | Promise<void | string>;
  hideOnClicked?: boolean;
}

interface Props {
  title: string;
  addButtonText: string;
  addButtonClick: () => void | string;
  addButtonHideOnClicked?: boolean;
  emptyListText: string;
  list: ListItem[] | undefined;
  listButtons: ListButton[];
  executeBeforeAuthenticated?: () => void;
}

export default function ListAdminPage(props: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { state } = useAdminAuthentication();
  const hidePage = useCallback(async () => {
    containerRef.current?.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }, [containerRef]);

  useEffect(() => {
    if (state === AuthState.Authenticated) {
      props.executeBeforeAuthenticated?.();
    } else if (state === AuthState.Unauthenticated) {
      router.push("/admin");
    }
  }, [state, props, router]);

  const handleAddClick = useCallback(async () => {
    if (props.addButtonHideOnClicked) await hidePage();
    const redirect = props.addButtonClick();
    if (redirect) router.push(redirect);
  }, [hidePage, props, router]);

  const handleButtonClick = useCallback(
    async (id: string, button: ListButton) => {
      if (button.hideOnClicked) await hidePage();
      const redirect = await button.onClick(id);
      if (redirect) router.push(redirect);
    },
    [hidePage, router]
  );

  const memorizedCompoment = useMemo(() => {
    if (!props.list) return <Loader />;

    if (props.list.length === 0) return <h2>{props.emptyListText}</h2>;

    return props.list.map((item) => (
      <li key={item.id}>
        <Image
          src={item.image}
          width={150}
          height={100}
          alt={item.altImage}
          placeholder="blur"
          blurDataURL={item.blurImage}
        />
        <div className={styles.textArea}>
          <h2>{item.title}</h2>
          {item.description && <p>{item.description}</p>}
        </div>
        <div className={styles.iconButtonsArea}>
          {props.listButtons.map((button, index) => (
            <IconButton
              key={index.toString()}
              icon={button.icon(item.id)}
              size={32}
              onClick={() => handleButtonClick(item.id, button)}
            />
          ))}
        </div>
      </li>
    ));
  }, [props.list, props.emptyListText, props.listButtons, handleButtonClick]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.containerInside}>
        <Head>
          <title>{props.title}</title>
        </Head>
        <h1>{props.title}</h1>
        <Button onClick={handleAddClick}>{props.addButtonText}</Button>
        <ul className={styles.list}>{memorizedCompoment}</ul>
      </div>
    </div>
  );
}
