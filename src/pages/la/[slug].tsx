import Loader from "@/components/Loader";
import Firebase from "@/services/firebase/client/config";
import { logEvent } from "firebase/analytics";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./styles.module.scss";

export default function LinkRedirect() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const analytics = Firebase.getAnalytics();
    logEvent(analytics, "link_redirect", {
      short_link_id: slug,
    });
    setTimeout(() => {
      window.location.href = `/l/${slug}`;
    }, 1000);
  }, [slug]);

  return (
    <div className={styles.container}>
      <Loader />
      <h1>Voce irá para seu destino em breve...</h1>
    </div>
  );
}
