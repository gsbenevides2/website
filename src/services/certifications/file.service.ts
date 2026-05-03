import { getCertificateFile } from "@/services/firebase/client/certificates";

export async function downloadCertificateFile(certId: string): Promise<File> {
  return await getCertificateFile(certId);
}
