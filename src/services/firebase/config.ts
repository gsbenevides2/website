type Services = "auth" | "firestore" | "storage" | "functions";

interface EnvData {
  admin: string | undefined;
  client: string | undefined;
}

const enviromentData: Record<Services, EnvData> = {
  auth: {
    admin: process.env.FIREBASE_AUTH_EMULATOR_HOST,
    client: process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST,
  },
  firestore: {
    admin: process.env.FIREBASE_FIRESTORE_EMULATOR_HOST,
    client: process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST,
  },
  storage: {
    admin: process.env.FIREBASE_STORAGE_EMULATOR_HOST,
    client: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_EMULATOR_HOST,
  },
  functions: {
    admin: process.env.FIREBASE_FUNCTIONS_EMULATOR_HOST,
    client: process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_EMULATOR_HOST,
  },
};

type EnviromentConfig =
  | {
      isEmulator: true;
      host: string;
      port: number;
    }
  | {
      isEmulator: false;
    };

export default function getEnviromentConfig(service: Services, isAdmin: boolean | "merged"): EnviromentConfig {
  if (process.env.NODE_ENV !== "development") return { isEmulator: false };
  if (isAdmin === true) {
    const enviromentVariableValue = enviromentData[service].admin;
    if (!enviromentVariableValue) return { isEmulator: false };
    const [host, port] = enviromentVariableValue.split(":");
    return { isEmulator: true, host, port: Number(port) };
  }
  if (isAdmin === "merged") {
    const enviromentVariableAdminValue = enviromentData[service].admin;
    const enviromentVariableClientValue = enviromentData[service].client;
    if (enviromentVariableAdminValue) {
      const [host, port] = enviromentVariableAdminValue.split(":");
      return { isEmulator: true, host, port: Number(port) };
    }
    if (enviromentVariableClientValue) {
      const [host, port] = enviromentVariableClientValue.split(":");
      return { isEmulator: true, host, port: Number(port) };
    }
    return { isEmulator: false };
  }
  const enviromentVariableValue = enviromentData[service].client;
  if (!enviromentVariableValue) return { isEmulator: false };
  const [host, port] = enviromentVariableValue.split(":");
  return { isEmulator: true, host, port: Number(port) };
}
