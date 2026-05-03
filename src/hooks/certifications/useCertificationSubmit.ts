import { useCallback } from "react";
import { useRouter } from "next/router";
import { toast } from "@/utils/toast";
import { addOrUpdateCertification } from "@/services/firebase/client/certificates";
import { revalidateNextPages } from "@/services/api/revalidateNextPages";
import {
  processCertificatePdf,
  validatePdf,
} from "@/services/certifications/certificate.service";

export interface FormValues {
  name: string;
  institution: string;
  date: Date;
  externalReference: URL;
  descriptionDesktop: string;
  descriptionMobile: string;
  pdf: [File];
  keywords: string;
}

export function useCertificationSubmit(
  certId: string | undefined,
  setIsLoading: (loading: boolean) => void,
) {
  const router = useRouter();

  const handleSubmit = useCallback(
    async (formData: FormValues) => {
      const {
        name,
        institution,
        date,
        externalReference,
        descriptionDesktop,
        descriptionMobile,
        pdf,
        keywords,
      } = formData;

      try {
        validatePdf(pdf[0]);
        setIsLoading(true);

        const processedCertificate = await processCertificatePdf(pdf[0]!);

        const responseCertId = await addOrUpdateCertification({
          id: certId,
          name: name,
          institution: institution,
          date: date,
          externalReference: externalReference?.toString() ?? "",
          description: {
            desktop: descriptionDesktop,
            mobile: descriptionMobile,
          },
          certificate: processedCertificate,
          keywords: keywords.split(",").map((e) => e.trim()),
        });

        await revalidateNextPages("certificates", responseCertId);

        router.push("/admin/certifications");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Erro desconhecido";
        toast.error(message);
        setIsLoading(false);
      }
    },
    [certId, router, setIsLoading],
  );

  return { handleSubmit };
}
