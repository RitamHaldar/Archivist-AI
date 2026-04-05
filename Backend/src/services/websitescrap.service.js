import puppeteer from "puppeteer";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";

export const extractContent = async (url) => {
    const browser = await puppeteer.launch({
        headless: true,
    });

    const page = await browser.newPage();

    await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 0
    });

    const html = await page.content();
    await browser.close();

    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article) {
        console.log("Could not extract clean content.");
        return null;
    }
    const result = {
        title: article.title,
        content: article.textContent
    };
    return "This is the content of the website or post give reply based on this content " + JSON.stringify(result);
};