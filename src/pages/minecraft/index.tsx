import MinecraftButton from "./button";
import localFont from "next/font/local";
import styles from "./styles.module.css";
import React from "react";
import Window from "./window";
import { Status, getLatestStatus } from "@/services/firebase/client/mc_status";
import { getMessagingToken } from "@/services/firebase/client/cloudMessaging";
import { logIn } from "@/services/firebase/client/auth";
import { saveToken } from "@/services/firebase/client/mc_subscribers";
const minecraftFont = localFont({
  src: [
    {
      weight: "400",
      style: "normal",
      path: "./1_MinecraftRegular1.woff",
    },
    {
      weight: "400",
      style: "italic",
      path: "./2_MinecraftItalic1.woff",
    },
    {
      weight: "700",
      style: "bold",
      path: "./3_MinecraftBold1.woff",
    },
    {
      weight: "700",
      style: "italic",
      path: "./4_MinecraftBoldItalic1.woff",
    },
  ],
  display: "swap",
});
function MinecraftPage() {
  const [status, setServerStatus] = React.useState<Status | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getLatestStatus()
      .then(setServerStatus)
      .finally(() => setLoading(false));
  }, []);

  const makeStatusMessage = React.useMemo(() => {
    if (status === null) return "Status do servidor indisponível";
    if (status.type === "ok")
      return `Online <br/> Data da última atualização: ${status.date.toLocaleString()}`;
    else
      return `${status.type} - ${
        status.message
      } <br/> Data da última atualização: ${status.date.toLocaleString()}`;
  }, [status]);

  const activeNotification = React.useCallback(async () => {
    const user = await logIn();
    const fcmToken = await getMessagingToken();
    if (!fcmToken) return alert("Não foi possível ativar as notificações");
    saveToken(user.uid, fcmToken);
    alert("Notificações ativadas com sucesso");
  }, []);
  return (
    <div className={[minecraftFont.className, styles.container].join(" ")}>
      <div className={styles.modalCenter}>
        <Window transparent>
          <div className={styles.statusModal}>
            <h4>Conecte-se ao servidor:</h4>
            <div className={styles.dataContainer}>
              <p>IP: google.gui.dev.br</p>
              <p>Porta: 19232</p>
            </div>
            <br></br>
            <h4>Status do Servidor:</h4>
            <div className={styles.dataContainer}>
              {loading ? (
                <p>Carregando...</p>
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: makeStatusMessage,
                  }}
                />
              )}
            </div>
            <br />
            <MinecraftButton small onClick={activeNotification}>
              Receber Notificações de Status
            </MinecraftButton>
          </div>
        </Window>
      </div>
    </div>
  );
}

export default MinecraftPage;
