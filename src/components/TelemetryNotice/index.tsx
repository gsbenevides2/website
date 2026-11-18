import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { hasTelemetry } from "@/utils/telemetry";
import { track } from "@/utils/track";
import styles from "./styles.module.scss";

// Versão do aviso: mude quando o texto mudar para reaparecer para quem já dispensou.
const VERSION = "2026-11";
const KEY = "web_telemetry_notice";

export function TelemetryNotice() {
  const { pathname } = useRouter();
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Sem nenhum destino configurado não há telemetria para avisar.
    if (!hasTelemetry()) return;
    try {
      if (localStorage.getItem(KEY) === VERSION) return;
    } catch {}
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const frame = requestAnimationFrame(() => setShown(true));
    track("telemetry_notice", { action: "view" });
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  useEffect(() => {
    if (!dismissed) return;
    const timer = setTimeout(() => setVisible(false), 250);
    return () => clearTimeout(timer);
  }, [dismissed]);

  // Na própria página de telemetria o aviso é redundante; no painel admin quem navega é o dono do site.
  if (!visible || pathname === "/telemetria" || pathname.startsWith("/admin")) {
    return null;
  }

  const close = () => {
    try {
      localStorage.setItem(KEY, VERSION);
    } catch {}
    track("telemetry_notice", { action: "dismiss" });
    setShown(false);
    setDismissed(true);
  };

  const learnMore = () => {
    track("telemetry_notice", { action: "learn_more" });
    setShown(false);
    setDismissed(true);
  };

  return (
    <aside
      aria-label="Aviso de telemetria"
      className={`${styles.notice} ${shown ? styles.shown : ""}`}
    >
      <button
        type="button"
        onClick={close}
        aria-label="Dispensar aviso de telemetria"
        className={styles.dismissIcon}
      >
        ×
      </button>
      <p className={styles.kicker}>Telemetria</p>
      <p className={styles.text}>
        Este site coleta dados de navegação, incluindo gravação de sessão,
        para entender o uso e corrigir erros.
      </p>
      <div className={styles.actions}>
        <Link href="/telemetria" onClick={learnMore} className={styles.more}>
          Saber mais
        </Link>
        <button type="button" onClick={close} className={styles.understood}>
          Entendi
        </button>
      </div>
    </aside>
  );
}

export default TelemetryNotice;
