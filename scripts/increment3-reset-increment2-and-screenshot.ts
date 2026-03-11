/*
"Increment" ボタンを3回押し、"Reset" を押し、さらに "Increment" を2回押して
スクリーンショットを tmp/YYYYMMdd_HHmmss.png に保存するスクリプト。
*/

import { chromium } from "@playwright/test";

const URL = "http://localhost:3000";

const now = new Date();
const timestamp =
	[
		now.getFullYear(),
		String(now.getMonth() + 1).padStart(2, "0"),
		String(now.getDate()).padStart(2, "0"),
	].join("") +
	"_" +
	[
		String(now.getHours()).padStart(2, "0"),
		String(now.getMinutes()).padStart(2, "0"),
		String(now.getSeconds()).padStart(2, "0"),
	].join("");
const OUTPUT = `tmp/${timestamp}.png`;

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

await page.goto(URL);

const incrementButton = page.getByRole("button", { name: "Increment" });
const resetButton = page.getByRole("button", { name: "Reset" });

await incrementButton.click();
await incrementButton.click();
await incrementButton.click();

await resetButton.click();

await incrementButton.click();
await incrementButton.click();

await page.screenshot({ path: OUTPUT, scale: "css", type: "png" });
console.log(`Screenshot saved to ${OUTPUT}`);

await browser.close();
