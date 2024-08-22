import Firebase from "./config";

export async function validateAdminUser(idToken: string): Promise<boolean> {
  const user = await validateUser(idToken);
  const adminEmail = "gsbenevides2@gmail.com";
  return user === adminEmail;
}

export function validateUser(idToken: string): Promise<string | false> {
  if (process.env.NODE_ENV === "development") return Promise.resolve("gsbenevides2@gmail.com");
  return new Promise(async (resolve, reject) => {
    Firebase.getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        resolve(decodedToken.email || false);
      })
      .catch((error: any) => {
        console.error(error);
        if (error.code === "auth/id-token-expired") resolve(false);
        else if (error.code === "auth/id-token-revoked") resolve(false);
        else reject(error);
      });
  });
}
