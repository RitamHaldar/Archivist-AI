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
        excerpt: article.excerpt,
        content: article.textContent,
        length: article.length
    };

    console.log(result);
    return result;
};

extractContent("https://en.wikipedia.org/wiki/Artificial_intelligence");