import * as jose from "jose";

export async function getToken() {
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);
  const privateKey = await jose.importPKCS8(serviceAccount.private_key, "RS256");
  const jwTToken = await new jose.SignJWT({
    iss: serviceAccount.client_email,
    aud: "https://oauth2.googleapis.com/token",
    scope: ["https://www.googleapis.com/auth/datastore", "https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/firebase.database"].join(" "),
  })
    .setProtectedHeader({ alg: "RS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .setIssuer(serviceAccount.client_email)
    .setSubject(serviceAccount.client_email)
    .sign(privateKey);

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwTToken}`,
  });
  const data = await response.json();

  return data;
}

export async function getFirestore() {
  const token = await getToken();
  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);
  const projectId = serviceAccount.project_id;
  const isEmulator = process.env.FIRESTORE_EMULATOR_HOST !== undefined;
  const host = isEmulator ? `http://${process.env.FIRESTORE_EMULATOR_HOST}/` : "https://firestore.googleapis.com/";
  const url = `${host}v1/projects/${projectId}/databases/(default)/documents/`;

  return {
    accessToken: token.access_token,
    url,
  };
}
