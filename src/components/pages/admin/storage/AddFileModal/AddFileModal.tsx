import { Button } from "@/components/Button";
import FileInput from "@/components/FileInput";
import { Form, Input, StatelessInput, useFormContext } from "@/components/Form";
import InputCustom from "@/components/Input";
import * as FirestoreSelfStorage from "@/services/firebase/client/selfstorage";
import { nanoid } from "nanoid";
import { useCallback } from "react";
import { MdClose } from "react-icons/md";
import styles from "./styles.module.scss";

interface FormData {
  id: string;
  file?: File[];
}

interface Props {
  close: () => void;
  visible: boolean;
}

export function AddFileModal(props: Props) {
  const formContext = useFormContext();

  const generateId = useCallback(() => {
    formContext.changeInputValue("id", nanoid(10));
  }, [formContext]);

  const submit = useCallback(
    (data: FormData) => {
      async function process() {
        if (data.file === undefined || data.file.length === 0) return alert("Selecione um arquivo");

        await FirestoreSelfStorage.createNewFile(data.id, data.file[0]);
        alert("Arquivo enviado com sucesso");
        formContext.changeMultipleInputValues({ id: "", file: undefined });
        props.close();
      }
      process().catch((error) => {
        console.error(error);
        alert("Erro ao enviar arquivo");
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props]
  );
  return (
    <div className={[styles.backdrop, props.visible ? "" : styles.hidden].join(" ")}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={props.close}>
          {" "}
          <MdClose />{" "}
        </button>

        <h2>Subir Arquivo</h2>
        <Form contextLoader={formContext.contextLoader} submit={submit}>
          <div className={styles.input}>
            <Input type="text" id="id" name="id" placeholder="Identificação do arquivo" required customComponent={({ ref, ...props }) => <InputCustom {...props} label="Identificação do Arquivo" />} />
          </div>
          <Button onClick={generateId}>Gerar ID</Button>
          <div className={styles.input}>
            <StatelessInput name="file" customComponent={(props) => <FileInput {...props} label="Selecione o arquivo" required />} />
          </div>
          <Button type="submit">Enviar</Button>
        </Form>
      </div>
    </div>
  );
}
