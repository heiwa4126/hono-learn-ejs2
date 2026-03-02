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
pnpm run playwright:install
# 動作確認
pnpm dev
pnpm run playwright:install:test
```

テスト実行

```sh
pnpm run test:e2e
```
