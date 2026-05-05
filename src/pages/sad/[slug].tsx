import Loader from "@/components/Loader";
import Firebase from "@/services/firebase/client/config";
import { logEvent } from "firebase/analytics";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import { DefaultSeo } from "@/components/DefaultSeo";

export default function LinkRedirect() {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const analytics = Firebase.getAnalytics();
    logEvent(analytics, "storage_download_direct", {
      short_link_id: slug,
    });
    setTimeout(() => {
      window.location.href = `/sd/${slug}`;
    }, 1000);
  }, [slug]);

  return (
    <div className={styles.container}>
      <DefaultSeo
        title="Preparando download..."
        site_name="Site do Guilherme"
        noFollow
        noIndex
      />
      <Loader />
      <h1>Voce terá seu arquivo em breve...</h1>
    </div>
  );
}
