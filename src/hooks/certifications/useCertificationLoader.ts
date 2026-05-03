import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import MyError from "@/utils/MyError";
import { getCertification } from "@/services/firebase/client/certificates";
import { downloadCertificateFile } from "@/services/certifications/file.service";
import { useFormContext } from "@/components/Form";

type UseFormContextReturn = ReturnType<typeof useFormContext>;

export function useCertificationLoader(
  certId: string | undefined,
  formContext: UseFormContextReturn,
) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadCertificationData = useCallback(async () => {
    if (!certId) {
      setIsLoading(false);
      setHasLoaded(true);
      return;
    }

    if (hasLoaded) {
      return;
    }

    try {
      const cert = await getCertification(certId);
      const certFile = await downloadCertificateFile(certId);

      formContext.changeMultipleInputValues({
        name: cert.name,
        institution: cert.institution,
        date: cert.date.toISOString().split("T")[0],
        externalReference: cert.externalReference,
        descriptionDesktop: cert.description.desktop,
        descriptionMobile: cert.description.mobile,
        pdf: [certFile],
        keywords: cert.keywords.join(","),
      });
    } catch (e) {
      if (e instanceof MyError) {
        alert(e.message);
      } else {
        alert(
          "Erro ao carregar dados do certificado. Veja o console para detalhes!",
        );
        console.error(e);
      }
      router.push("/admin/certifications");
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certId, router, hasLoaded]);

  return { isLoading, setIsLoading, loadCertificationData };
}
