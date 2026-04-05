import axios from "axios";
import { PDFParse } from "pdf-parse";

export const imagetextExtractorandUpload = async (buffer, mimetype = "image/jpeg", originalname) => {
    try {
        if (!process.env.OCR_SPACE_API_KEY) {
            console.error("OCR_SPACE_API_KEY is not defined in environment variables.");
            return "OCR configuration error: Missing API Key";
        }

        const base64Image = `data:${mimetype};base64,${buffer.toString("base64")}`;
        const formData = new URLSearchParams();
        formData.append("apikey", process.env.OCR_SPACE_API_KEY);
        formData.append("base64Image", base64Image);
        formData.append("language", "eng");
        formData.append("isOverlayRequired", "false");
        const response = await axios.post("https://api.ocr.space/parse/image", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (response.data.IsErroredOnProcessing) {
            const errorMsg = response.data.ErrorMessage?.[0] || "Unknown processing error";
            console.error("OCR.space Processing Error:", errorMsg);
            return `OCR Error: ${errorMsg}`;
        }

        if (response.data && response.data.ParsedResults && response.data.ParsedResults.length > 0) {
            const text = response.data.ParsedResults[0].ParsedText;
            if (!text || text.trim() === "") {
                return "The file name is generate some description about it" + originalname;
            }
            return text;
        }

        return "No text detected in the image or OCR API processing error";
    } catch (error) {
        console.error("OCR.space request failed:", error.response?.data || error.message);
        throw new Error("Failed to extract text from image using OCR.space");
    }
};

export const pdftextExtractor = async (buffer) => {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    let text = result.text || "";
    if (text.length > 15000) {
        text = text.substring(0, 15000);
    }
    return text;
};