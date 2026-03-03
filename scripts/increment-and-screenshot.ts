/*
これは
GitHub Copilot + Playwright CLI で、
まず以下のプロンプトを与え

```
playwright-cliを使って、http://localhost:3000 を開いて "Increment" ボタンを押して、スクリーンショットをとって。
ブラウザはインストール済みの Chromiumを使って。
playwright-cliは pnpm exec playwright-cli <command> [args] [options] のように実行して。
playwright-cliの使い方はpnpm exec playwright-cli --helpで確認して。
```

動作することを確認してから

```
この手順を.ts として保存できる?
```
と聞いて、生成されたコードを保存したものです。

TODO: サーバが起動していることを確認するコードが入ってない。
*/

import { chromium } from "@playwright/test";

const URL = "http://localhost:3000";
const OUTPUT = "screenshot.png";

const browser = await chromium.launch({ headless: false });
const page = await browser.newPage();

// 1. http://localhost:3000 を開く
await page.goto(URL);

// 2. "Increment" ボタンを押す
await page.getByRole("button", { name: "Increment" }).click();

// 3. スクリーンショットを撮る
await page.screenshot({ path: OUTPUT, scale: "css", type: "png" });
console.log(`Screenshot saved to ${OUTPUT}`);

await browser.close();
