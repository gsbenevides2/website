export function isNotificationActive() {
  const notificationToken = localStorage.getItem("notification");
  return notificationToken && notificationToken.length > 0;
}
export function saveNotificationTokenInLocal(token: string) {
  localStorage.setItem("notification", token);
}
export function getNotificationToken() {
  return localStorage.getItem("notification");
}
export function deleteNotificationToken() {
  localStorage.removeItem("notification");
}
