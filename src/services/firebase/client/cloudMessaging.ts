import { getToken, deleteToken } from "firebase/messaging";
import { toast } from "@/utils/toast";
import Firebase from "./config";

export async function getMessagingToken() {
  const messaging = Firebase.getMessaging();
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    toast.warning("Permissão de notificação negada ou bloqueada");
    return;
  }
  const token = await getToken(messaging, {
    vapidKey:
      "BNwDR60SBO6CFINW021yQomCNby71sz649v4jriQ9G7cSAiaWp6oAN1z7VpPIjPxrOPrC1t-5tICYB26UzuoCgQ",
  });
  return token;
}

export async function revokeMessagingToken() {
  const messaging = Firebase.getMessaging();
  await deleteToken(messaging);
}
