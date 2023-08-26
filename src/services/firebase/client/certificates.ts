import {
  getBlob,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import {
  CollectionReference,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import Firebase from "./config";
import MyError from "@/utils/MyError";

interface Certification {
  id: string;
  name: string;
  institution: string;
  date: Date;
  externalReference?: string;
  descriptionDesktop: string;
  descriptionMobile: string;
  pdf: string;
  keywords: string[];
  pdfThumbnail: string;
  pdfThumbnailBlur:string;
}

interface CertificationInFirestore extends Omit<Certification, "id" |"date" > {
  date: Timestamp
}

interface CertificationToAddOrUpdate extends Omit<Certification, "id" | "pdf"> {
  id?: string;
  pdf: File;
}

interface CertificationSet {
  id: string;
  name: string;
  institution: string;
  pdfThumbnail: string;
  keywords: string[];
  pdfThumbnailBlur:string;
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

async function uploadCertificationThumbImg(
  certificationId: string,
  thumbImg: string
) {
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
  const pdfDownloadUrl = await uploadCertificationFile(
    certificationId,
    certification.pdf
  );
  const thumbImgDownloadUrl = await uploadCertificationThumbImg(
    certificationId,
    certification.pdfThumbnail
  );
  await setDoc(certificationDoc, {
    name: certification.name,
    institution: certification.institution,
    date: Timestamp.fromDate(certification.date),
    externalReference: certification.externalReference,
    descriptionDesktop: certification.descriptionDesktop,
    descriptionMobile: certification.descriptionMobile,
    pdf: pdfDownloadUrl,
    keywords: certification.keywords,
    pdfThumbnail: thumbImgDownloadUrl,
    pdfThumbnailBlur: certification.pdfThumbnailBlur,
  });
  return certificationId;
}

export async function listCertifications(): Promise<CertificationSet[]> {
  const qy = query(getCertificationCollection(), orderBy("date", "desc"));
  const certifications = await getDocs(qy);
  const certificationsList: CertificationSet[] = certifications.docs.map(
    (certification) => {
      const data = certification.data();
      return {
        id: certification.id,
        name: data.name,
        institution: data.institution,
        pdfThumbnail: data.pdfThumbnail,
        keywords: data.keywords,
        pdfThumbnailBlur:data.pdfThumbnailBlur,
      };
    }
  );
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
  }
}

export async function getCertificateFile(certificationId:string):Promise<File>{
  const fileName = `${certificationId}.pdf`;
  const storage = Firebase.getStorage();
  const certificationsRef = ref(storage, `certifications`);
  const certificationRef = ref(certificationsRef, fileName);
  const blob = await getBlob(certificationRef)
  return new File([blob], fileName, {type: blob.type})
}