import { CollectionReference, Timestamp, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore";
import { getBlob, getDownloadURL, ref, uploadBytes, uploadString } from "firebase/storage";

import MyError from "@/utils/MyError";
import Firebase from "./config";

export interface Certification {
  id: string;
  name: string;
  institution: string;
  date: Date;
  externalReference?: string;
  description: {
    desktop: string;
    mobile: string;
  };
  certificate: {
    pdf: {
      file: string;
      width?: number;
      height?: number;
    };
    colors?: {
      gradient: [string, string];
      text: "white" | "black";
    };
    thumbnail: {
      png: string;
      blur: string;
    };
  };
  keywords: string[];
}

interface CertificationInFirestore extends Omit<Certification, "id" | "date"> {
  date: Timestamp;
}

interface CertificationToAddOrUpdate extends Omit<Certification, "id" | "certificate"> {
  id?: string;
  certificate: {
    pdf: {
      file: File;
      width?: number;
      height?: number;
    };
    colors?: {
      gradient: [string, string];
      text: "white" | "black";
    };
    thumbnail: {
      png: string;
      blur: string;
    };
  };
}

interface CertificationSet {
  id: string;
  name: string;
  institution: string;
  keywords: string[];
  certificate: {
    thumbnail: {
      png: string;
      blur: string;
    };
    pdf: {
      width: number | null;
      height: number | null;
    };
  };
}

function getCertificationCollection() {
  const firestore = Firebase.getFirestore();
  return collection(firestore, "certifications") as CollectionReference<Omit<CertificationInFirestore, "id">>;
}

async function uploadCertificationFile(certificationId: string, file: File) {
  const storage = Firebase.getStorage();
  const certificationsRef = ref(storage, `certifications`);
  const certificationRef = ref(certificationsRef, `${certificationId}.pdf`);
  await uploadBytes(certificationRef, file);
  return await getDownloadURL(certificationRef);
}

async function uploadCertificationThumbImg(certificationId: string, thumbImg: string) {
  const storage = Firebase.getStorage();
  const certificationsRef = ref(storage, `certifications`);
  const certificationRef = ref(certificationsRef, `${certificationId}.png`);
  await uploadString(certificationRef, thumbImg, "data_url");
  return await getDownloadURL(certificationRef);
}

export async function addOrUpdateCertification(certification: CertificationToAddOrUpdate) {
  const certificationsRef = getCertificationCollection();
  const certificationDoc = certification.id ? doc(certificationsRef, certification.id) : doc(certificationsRef);
  const certificationId = certificationDoc.id;
  const pdfDownloadUrl = await uploadCertificationFile(certificationId, certification.certificate.pdf.file);
  const thumbImgDownloadUrl = await uploadCertificationThumbImg(certificationId, certification.certificate.thumbnail.png);
  await setDoc(certificationDoc, {
    name: certification.name,
    institution: certification.institution,
    date: Timestamp.fromDate(certification.date),
    externalReference: certification.externalReference,
    description: {
      desktop: certification.description.desktop,
      mobile: certification.description.mobile,
    },
    certificate: {
      pdf: {
        width: certification.certificate.pdf.width,
        height: certification.certificate.pdf.height,
        file: pdfDownloadUrl,
      },
      thumbnail: {
        png: thumbImgDownloadUrl,
        blur: certification.certificate.thumbnail.blur,
      },
    },
    keywords: certification.keywords,
  });
  return certificationId;
}

export async function listCertifications(): Promise<CertificationSet[]> {
  const qy = query(getCertificationCollection(), orderBy("date", "desc"));
  const certifications = await getDocs(qy);
  const certificationsList: CertificationSet[] = certifications.docs.map((certification) => {
    const data = certification.data();
    return {
      id: certification.id,
      name: data.name,
      institution: data.institution,
      keywords: data.keywords,
      certificate: {
        thumbnail: {
          png: data.certificate.thumbnail.png,
          blur: data.certificate.thumbnail.blur,
        },
        pdf: {
          width: data.certificate.pdf.width ?? null,
          height: data.certificate.pdf.height ?? null,
        },
      },
    };
  });
  return certificationsList;
}

export async function deleteCertification(certificationId: string) {
  const certificationRef = doc(getCertificationCollection(), certificationId);
  deleteDoc(certificationRef);
}

export async function getCertification(certificationId: string): Promise<Certification> {
  const certificationRef = doc(getCertificationCollection(), certificationId);
  const certification = await getDoc(certificationRef);
  const certificationData = certification.data();
  if (!certificationData) throw new MyError("certificate-not-found", `Certificado não encontrado. O certificado com id: ${certificationId} não foi encontrado no Firebase Firestore!`);
  return {
    id: certification.id,
    ...certificationData,
    date: certificationData.date.toDate(),
  };
}

export async function getCertificateFile(certificationId: string): Promise<File> {
  const fileName = `${certificationId}.pdf`;
  const storage = Firebase.getStorage();
  const certificationsRef = ref(storage, `certifications`);
  const certificationRef = ref(certificationsRef, fileName);
  const blob = await getBlob(certificationRef);
  return new File([blob], fileName, { type: blob.type });
}
