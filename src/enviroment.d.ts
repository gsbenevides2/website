declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_FIREBASE_CREDENTIALS: string;
    readonly FIREBASE_ADMIN_CREDENTIALS: string;
  }
}
