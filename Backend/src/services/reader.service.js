import Tesseract from "tesseract.js";
import { PDFParse } from "pdf-parse";
export const imagetextExtractorandUpload = async (buffer) => {
    const { data: { text } } = await Tesseract.recognize(
        buffer,
        "eng",
    );
    if (!text) {
        return "No text found in the image";
    }
    return text;
};

export const pdftextExtractor = async (buffer) => {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    return result.text;
};