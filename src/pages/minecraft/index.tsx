import * as Papa from "papaparse";
import MinecraftButton from "./button";
import localFont from "next/font/local";
import styles from "./styles.module.css";
import React, { use, useEffect } from "react";
import Window from "./window";
import {
  Status,
  getLastStatusList,
  getLatestStatus,
} from "@/services/firebase/client/mc_status";
import {
  getFcmTokenWithoutPerms,
  getMessagingToken,
} from "@/services/firebase/client/cloudMessaging";
import {
  getLoggedUser,
  logIn,
  useAuthentication,
} from "@/services/firebase/client/auth";
import {
  removeToken,
  saveToken,
  vertifySavedToken,
} from "@/services/firebase/client/mc_subscribers";
import { downloadCSV } from "./utils";
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

interface ServerData {
  playersOnline: number;
  playersMax: number;
  version: string;
}

function MinecraftPage() {
  const [status, setServerStatus] = React.useState<Status | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [notification, setNotification] = React.useState(false);
  const [serverData, setServerData] = React.useState<ServerData>();

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
    const fcmToken = await getMessagingToken();
    let user;
    try {
      user = await logIn();
    } catch (e: any) {
      if (e.code === "auth/popup-blocked")
        return alert(
          "Verifique sua configuração de PopUps e clique novamente no botão"
        );
    }
    if (!fcmToken) return alert("Não foi possível ativar as notificações");
    if (!user) return alert("Não foi possível ativar as notificações");
    saveToken(user.uid, fcmToken);
    setNotification(true);
  }, []);

  const loadData = React.useCallback(async () => {
    const user = await getLoggedUser();
    const fcmToken = await getFcmTokenWithoutPerms();
    if (user && fcmToken) {
      vertifySavedToken(user.uid, fcmToken).then(setNotification);
    }
  }, []);

  const disableNotification = React.useCallback(async () => {
    const user = await getLoggedUser();
    const fcmToken = await getFcmTokenWithoutPerms();
    if (user && fcmToken) {
      removeToken(user.uid, fcmToken).then(() => setNotification(false));
    }
  }, []);

  const downloadLogs = React.useCallback(async () => {
    const logs = await getLastStatusList();
    const csv = Papa.unparse(logs);
    downloadCSV(csv, "logs.csv");
  }, []);
  useAuthentication(loadData);

  const retriveServerData = React.useCallback(async () => {
    const data = await fetch("/api/minecraft");
    const json = await data.json();
    setServerData(json);
  }, []);

  useEffect(() => {
    if (status?.type.toLowerCase() === "ok") retriveServerData();
  }, [retriveServerData, status?.type]);

  return (
    <div className={[minecraftFont.className, styles.container].join(" ")}>
      <div className={styles.modalCenter}>
        <Window transparent>
          <div className={styles.statusModal}>
            <h4>Conecte-se ao servidor:</h4>
            <div className={styles.dataContainer}>
              <p>Tipo de Minecraft: Bedrock</p>
              <p>IP: google.gui.dev.br</p>
              <p>Porta: 19232</p>
              {serverData && (
                <>
                  <p>
                    Jogadores online: {serverData.playersOnline}/
                    {serverData.playersMax}
                  </p>
                  <p>Versão: {serverData.version}</p>
                </>
              )}
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
            {notification ? (
              <MinecraftButton small onClick={disableNotification}>
                Desativar notificações de status
              </MinecraftButton>
            ) : (
              <MinecraftButton small onClick={activeNotification}>
                Receber notificações de status
              </MinecraftButton>
            )}
            <br />
            <br />
            <MinecraftButton small onClick={downloadLogs}>
              Baixar logs
            </MinecraftButton>
            <br />
            <br />
            <p align="center">
              Peça permissão para o Guilherme para jogar no servidor!
            </p>
          </div>
        </Window>
      </div>
    </div>
  );
}

export default MinecraftPage;
