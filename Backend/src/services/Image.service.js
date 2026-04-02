import Tesseract from "tesseract.js";

export const imagetextExtractor = async (buffer) => {
    const { data: { text } } = await Tesseract.recognize(
        buffer,
        "eng",
    );

    return text;
};
