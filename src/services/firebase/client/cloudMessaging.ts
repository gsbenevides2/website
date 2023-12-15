import { getToken } from "firebase/messaging";
import Firebase from "./config";

export async function getMessagingToken() {
  const messaging = Firebase.getMessaging();
  const permission = await Notification.requestPermission();
  console.log(permission)
  if (permission !== "granted")
    return alert("Permissão de notificação negada ou bloqueada");
  const token = await getToken(messaging, {
    vapidKey:
      "BNwDR60SBO6CFINW021yQomCNby71sz649v4jriQ9G7cSAiaWp6oAN1z7VpPIjPxrOPrC1t-5tICYB26UzuoCgQ",
  });
  return token;
}

export async function getFcmTokenWithoutPerms() {
  const messaging = Firebase.getMessaging();
  const token = await getToken(messaging, {
    vapidKey:
      "BNwDR60SBO6CFINW021yQomCNby71sz649v4jriQ9G7cSAiaWp6oAN1z7VpPIjPxrOPrC1t-5tICYB26UzuoCgQ",
  });
  return token;
}