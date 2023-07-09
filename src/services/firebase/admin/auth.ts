import Firebase from "./config";

export function validateAdminUser(idToken: string): Promise<boolean> {
  if(process.env.NODE_ENV === 'development') return Promise.resolve(true)
  return new Promise(async (resolve, reject) => {
    const adminEmail = "gsbenevides2@gmail.com";
    Firebase.getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        resolve(decodedToken.email === adminEmail);
      })
      .catch((error: any) => {
        console.error(error)
        if (error.code === "auth/id-token-expired") resolve(false);
        else if (error.code === "auth/id-token-revoked") resolve(false);
        else reject(error);
      });
  });
}
