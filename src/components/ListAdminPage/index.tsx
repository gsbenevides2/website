import { Button } from "@/components/Button";
import IconButton from "@/components/IconButon";
import Loader from "@/components/Loader";
import {
  AuthState,
  useAdminAuthentication,
} from "@/services/firebase/client/auth";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IconType } from "react-icons";
import { Form, Input, useFormContext } from "../Form";
import CustomInput from "../Input";
import styles from "./styles.module.css";
export interface ListItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  blurImage?: string;
  altImage?: string;
}

export interface ListButton {
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
  const {
    title,
    addButtonText,
    addButtonClick,
    addButtonHideOnClicked,
    emptyListText,
    list,
    listButtons,
    executeBeforeAuthenticated,
  } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { state } = useAdminAuthentication();
  const formContext = useFormContext();
  const [search, setSearch] = useState("");

  const hidePage = useCallback(async () => {
    containerRef.current?.classList.add(styles.hide);
    await new Promise((resolve) => setTimeout(resolve, 500));
  }, [containerRef]);

  useEffect(() => {
    if (state === AuthState.Authenticated) {
      executeBeforeAuthenticated?.();
    } else if (state === AuthState.Unauthenticated) {
      router.push("/admin");
    }
  }, [state, executeBeforeAuthenticated, router]);

  const handleAddClick = useCallback(async () => {
    if (addButtonHideOnClicked) await hidePage();
    const redirect = addButtonClick();
    if (redirect) router.push(redirect);
  }, [hidePage, addButtonClick, addButtonHideOnClicked, router]);

  const handleButtonClick = useCallback(
    async (id: string, button: ListButton) => {
      if (button.hideOnClicked) await hidePage();
      const redirect = await button.onClick(id);
      if (redirect) router.push(redirect);
    },
    [hidePage, router],
  );

  const memorizedCompoment = useMemo(() => {
    if (!list) return <Loader />;

    const filteredList = search.length === 0
      ? list
      : list.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        (item.description &&
          item.description.toLowerCase().includes(search.toLowerCase()))
      );
    if (filteredList.length === 0) return <h2>{emptyListText}</h2>;

    return filteredList.map((item) => (
      <li key={item.id}>
        {item.image && (
          <Image
            src={item.image}
            width={150}
            height={100}
            alt={item.altImage ?? ""}
            placeholder="blur"
            blurDataURL={item.blurImage}
          />
        )}

        <div className={styles.textArea}>
          <h2>{item.title}</h2>
          {item.description && <p>{item.description}</p>}
        </div>
        <div className={styles.iconButtonsArea}>
          {listButtons.map((button, index) => (
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
  }, [
    list,
    emptyListText,
    listButtons,
    search,
    handleButtonClick,
  ]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.containerInside}>
        <Head>
          <title>{title}</title>
        </Head>
        <h1>{title}</h1>
        <Button onClick={handleAddClick}>{addButtonText}</Button>
        <Form
          contextLoader={formContext.contextLoader}
          submit={({ searchQuery }: { searchQuery: string }) =>
            setSearch(searchQuery)}
          className={styles.form}
        >
          <Input
            type="text"
            placeholder="Pesquisar"
            name="searchQuery"
            id="searchQuery"
            customComponent={({ ref, ...props }) => <CustomInput {...props} />}
          />
          <Button type="submit">Pesquisar</Button>
          {search.length > 0 && (
            <Button
              onClick={() => {
                setSearch("");
                formContext.changeInputValue("searchQuery", "");
              }}
            >
              Limpar Pesquisa
            </Button>
          )}
        </Form>

        <ul className={styles.list}>{memorizedCompoment}</ul>
      </div>
    </div>
  );
}
