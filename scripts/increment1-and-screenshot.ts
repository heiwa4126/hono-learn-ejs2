/*
"Increment" ボタンを1回押してスクリーンショットを撮るスクリプト。

手順:
1. Chromiumで http://localhost:3000 を開く
2. "Increment" ボタンを1回クリック
3. スクリーンショットを tmp/YYYYMMdd_HHmmss.png に保存
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

await page.getByRole("button", { name: "Increment" }).click();

await page.screenshot({ path: OUTPUT, scale: "css", type: "png" });
console.log(`Screenshot saved to ${OUTPUT}`);

await browser.close();
