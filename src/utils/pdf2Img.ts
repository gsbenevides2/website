import { pdfjs } from "react-pdf";

export async function pdf2Img(pdf: File):Promise<string> {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";
    const pdfUrl = URL.createObjectURL(pdf);
    const pdfDoc = await pdfjs.getDocument(pdfUrl).promise;
    const page = await pdfDoc.getPage(1);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");
    if(!canvasContext) throw new Error("Canvas context not found");
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    await page.render({ canvasContext, viewport }).promise;
    const img = canvas.toDataURL("image/png");
    return img;
}