import { Button } from "@/components/Button";
import { Form, Input, useFormContext } from "@/components/Form";
import InputCustom from "@/components/Input";
import Toogle from "@/components/Toogle";
import * as FirebaseSelfStorage from "@/services/firebase/client/selfstorage";
import { SelfStorageFileDocument } from "@/services/firebase/client/selfstorage";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";
import { useCallback, useMemo } from "react";
import { MdClose } from "react-icons/md";
import { TbTrash } from "react-icons/tb";
import styles from "./styles.module.scss";

interface Props {
  close: () => void;
  data: (SelfStorageFileDocument & { id: string }) | null;
}

interface AddUserForm {
  email: string;
}

export default function ChangeVisibility(props: Props) {
  const visible = useMemo(() => props.data !== null, [props.data]);
  const addUserForm = useFormContext();
  const changeVisibility = useCallback(() => {
    if (props.data === null) return;
    FirebaseSelfStorage.changeVisibility(props.data.id, !props.data.visible);
  }, [props.data]);
  const addEmailFormSubmit = useCallback(
    (data: AddUserForm) => {
      if (props.data === null) return;
      FirebaseSelfStorage.addEmailToAllowedUsers(props.data.id, data.email);
    },
    [props.data]
  );

  const directLink = useMemo(() => {
    const host = window.location.origin;
    return `${host}/sd/${props.data?.id}`;
  }, [props.data]);
  const shareLink = useMemo(() => {
    const host = window.location.origin;
    return `${host}/s/${props.data?.id}`;
  }, [props.data]);
  const directLinkClick = useCallback(() => {
    copyTextToClipboard(directLink)
      .then(() => {
        alert("Link copiado com sucesso");
      })
      .catch(() => {
        alert("Erro ao copiar link");
      });
  }, [directLink]);
  const shareLinkClick = useCallback(() => {
    copyTextToClipboard(shareLink)
      .then(() => {
        alert("Link copiado com sucesso");
      })
      .catch(() => {
        alert("Erro ao copiar link");
      });
  }, [shareLink]);

  const removeEmailTrashClick = useCallback(
    (email: string) => {
      if (props.data === null) return;
      FirebaseSelfStorage.removeEmailFromAllowedUsers(props.data.id, email);
    },
    [props.data]
  );
  return (
    <div className={[styles.backdrop, visible ? "" : styles.hidden].join(" ")}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={props.close}>
          {" "}
          <MdClose />{" "}
        </button>

        <h2>Alterar Visibilidade</h2>
        <div className={styles.content}>
          <div className={styles.toogleArea}>
            <Toogle onChange={changeVisibility} checked={props.data?.visible ?? false} />
            <span>Vísivel para todos</span>
          </div>
          <div className={styles.content}>
            <Form className={styles.userAddForm} contextLoader={addUserForm.contextLoader} submit={addEmailFormSubmit}>
              <Input name="email" required placeholder="Digitar E-mail" customComponent={({ ref, ...props }) => <InputCustom {...props} label="Adicionar E-mail:" />} />
              <Button type="submit">Adicionar E-mail</Button>
            </Form>
            <h3 className={styles.userList}>Lista de Usuários</h3>
            {props.data?.allowedUsers.length === 0 && <span>Nenhum usuário autorizado</span>}
            <ul className={styles.list}>
              {props.data?.allowedUsers.map((user) => (
                <li key={user}>
                  <span>{user}</span>
                  <button onClick={() => removeEmailTrashClick(user)}>
                    <TbTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.links}>
            <span>Link de Direto: </span>
            <br />
            <a onClick={directLinkClick}>{directLink}</a>
            <br />
            <br />
            <span>Link de Compartilhamento: </span>
            <br />
            <a onClick={shareLinkClick}>{shareLink}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
