# hono-learn-ejs2

Hono で [EJS](https://www.npmjs.com/package/ejs) を使う例 #2

ボタンを押すと 1 増えるカウンターを、サーバサイドで実装してみた。

## 実行

```sh
pnpm install

pnpm run dev
# または
pnpm run build & pnpm start
```

ブラウザで
<http://localhost:3000>
を開く。

## 準備と確認

```sh
# 準備
pnpm i
```

## Playwright によるE2Eテスト

準備

```sh
pnpm run playwright:install:browser
# 動作確認
pnpm dev
pnpm run playwright:install:test
```

run-scripts の `playwright:install:browser` は
「@playwright/test と
@playwright/mcp と
@playwright/cli で 依存する playwright-core のバージョンが違う」
問題に対処するもの。

E2E(end-to-end)テスト実行

```sh
pnpm run test:e2e
```

## Playwright MCP

### 準備

- このワークスペースだけで使いたい
- ワークスペースの node_modules にある playwright-mcp を使いたい
- あと pnpm

ということで

```sh
pnpm add -D @playwright/mcp@latest
```

[.vscode/mcp.json](.vscode/mcp.json)

```json
{
  "servers": {
		# VSCodeで開くと、ここに "起動|22個のツール..." などと表示される
    "playwright": {
      "command": "pnpm",
      "args": [
        "exec",
        "playwright-mcp",
				"--browser=chromium"  # これ書かないとchromeを使おうとする
      ]
    }
  },
  "inputs": []
}
```

"playwright" の上の"▷起動" を押す。または VSCode を再起動

### MCP動作確認

- Copilot の chat 窓の下にある工具のアイコンを押して「ツールの構成」の中に "Playwright" があるか確認
- または Copilot の chat 窓で `#playwright`
- chat 窓で "#playwright で https://example.com を開いてください"

### ここまで出来たら

```
`pnpm dev` でサーバを起動し、#playwright で 127.0.0.1:3000 を開いて、スクリーンショットをとって
```

ができるはずなんだけど。一応動くがどうも微妙
