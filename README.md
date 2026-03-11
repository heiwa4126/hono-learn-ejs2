# hono-learn-ejs2

Hono で [EJS](https://www.npmjs.com/package/ejs) を使う例 #2

ボタンを押すと 1 増えるカウンターを、サーバサイドで実装したもの。
Playwright/MCP/CLI がメインテーマ。

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

# サーバ起動
pnpm run dev
```

で <http://localhost:3000> をブラウザで開く

## Playwright によるE2Eテスト

準備:

```sh
pnpm run playwright:install:browser
# 動作確認
pnpm dev
pnpm run playwright:install:test
```

(run-scripts の `playwright:install:browser` は
「@playwright/test と
@playwright/mcp と
@playwright/cli で依存する playwright-core のバージョンが違う」
問題に対処するもの)

E2E(end-to-end)テスト実行:

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
playwright mcpを使って、http://localhost:3000 を開いて "Increment" ボタンを押して、スクリーンショットをとって
```

ができるはずなんだけど。一応動くが、スナップショットの保存でエラーになる。
推測では「Vision リクエストが生じるから」だと思われる。プロンプトレベルではどうもならない感じ。

MCP のオプションでなんとか回避できた。[.vscode/mcp.json](.vscode/mcp.json) 参照

オプションは
[Configuration - microsoft/playwright-mcp: Playwright MCP server](https://github.com/microsoft/playwright-mcp?tab=readme-ov-file#configuration)
参照

カスタムプロンプト作った。なんでプロンプトか、というと CLI 版側で SKILL の自動発火したかったから

```text
/screenshot-mcp "Increment" ボタンを2回押してスクリーンショットをとって
```

で運が良ければ tmp/ 以下にスクリーンショットが生成される。

## Playwright CLI

(いったん Playwright MCP を「ツールの構成」から停止して実行しました。あまり意味はないかも)

まず `pnpm dev` でサーバを起動しておいてから

プロンプト:

1. playwright-cli を使って、http://localhost:3000 を開いて "Increment" ボタンを押して、スクリーンショットをとって。
   ブラウザはインストール済みの Chromium を使って。
   playwright-cli は `pnpm exec playwright-cli <command> [args] [options]` のように実行して。
   playwright-cli の使い方は `pnpm exec playwright-cli --help` で確認して。
2. (実行されたのを確認後) この手順を.ts として保存できる?

これで
[scripts/increment-and-screenshot.ts](scripts/increment-and-screenshot.ts)
が自動生成されました。

実行は
`pnpm dev` でサーバを起動しておいてから
`pnpm exec tsx scripts/increment-and-screenshot.ts`

TODO: run-scripts に入れる。

### Playwright CLI の感想

MCP 版よりよっぽど使いやすいし、ちゃんと動く

### SKILL.md

「毎回指示しているもの」を SKILL にした。意外と面倒

とりあえず

```text
/screenshot-cli  "Increment" ボタンを2回押して
```

で tmp/ 以下にスクリーンショットが生成される。
さらに

```text
いまの手順をscripts/increment2-and-screenshot.ts として保存して
```

と指示すればコードを生成してくれる

**メモ**

- サーバの起動チェックに curl や node xxx を使うと途中で停止してめんどう。run-scripts にすると止まらない
- `pnpm dev` も止まる。 `pnpm run dev` なら動く。
- [settings.json](.vscode/settings.json)参照

### SKILL.md 別プロンプト

```text
"Increment" ボタンを3回押したあと、"Reset"ボタンをクリック。さらに"Increment" ボタンを2回押して、スクリーンショットとって。
```

Agent skills なので、これで発火する。
もし `いまの手順をscripts/increment2-and-screenshot.ts として保存して` を以前にやっていたら、scripts/ 以下に TypeScript を書くかもしれない。
