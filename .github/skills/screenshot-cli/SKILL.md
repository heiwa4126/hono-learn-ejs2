---
name: screenshot-cli
description: 'Take a screenshot of localhost:3000 using playwright-cli (local node_modules terminal commands). Use when: capturing screenshots with Playwright CLI, clicking buttons before screenshot, browser automation without MCP. Starts pnpm dev if server is not running.'
argument-hint: 'Actions to perform before screenshot, e.g. "Increment" ボタンを3回押して'
---

# Screenshot with Playwright CLI

## When to Use
- Take a screenshot of http://localhost:3000 after clicking a button
- Browser automation using playwright-cli terminal commands (no MCP required)

## Procedure

### 1. Check Server

```bash
pnpm run check:server
```

If not running, start it:

```bash
pnpm run dev
```

### 2. Open Browser

```bash
pnpm exec playwright-cli -s=main open --browser=chromium http://localhost:3000
```

### 3. Get Snapshot & Find Button Ref

```bash
pnpm exec playwright-cli -s=main snapshot
```

Read the snapshot YAML output and find the `ref` for the button matching the argument (default: `"Increment"`).

Example snapshot output:
```yaml
- generic [active] [ref=e1]:
  - heading "Counter" [level=1] [ref=e2]
  - generic [ref=e3]:
    - text: "0"
    - button "Increment" [ref=e4]
    - button "Reset" [ref=e5]
```

### 4. Perform Button Actions

Repeat the following for each click action specified in the argument (default: click `"Increment"` once).

```bash
pnpm exec playwright-cli -s=main click <ref>
```

Replace `<ref>` with the button's element reference from the snapshot (e.g. `e4`).

If the argument says "N回押して" (press N times), repeat `click <ref>` N times in sequence.
If different buttons are specified (e.g. `"Increment"` then `"Reset"`), find each button's ref in the snapshot and click them in order.

Example — `"Increment" ボタンを3回押して`:
```bash
pnpm exec playwright-cli -s=main click e4
pnpm exec playwright-cli -s=main click e4
pnpm exec playwright-cli -s=main click e4
```

### 5. Get Updated Snapshot & Find Body Ref

```bash
pnpm exec playwright-cli -s=main snapshot
```

Find the root `generic [active]` element ref — this corresponds to `<body>` (e.g. `e1`).

### 6. Take Screenshot

```bash
pnpm exec playwright-cli -s=main screenshot <body-ref> --filename=tmp/<timestamp>.png
```

Replace `<body-ref>` with the root `[active]` element ref (e.g. `e1`) and `<timestamp>` with the generated timestamp.

The timestamp should be in the format `tmp/YYYYMMdd_HHmmss.png` (e.g., `tmp/20260310_170230.png` for March 10, 2026 at 17:02:30).

## Reference

- [Playwright CLI Help](./references/playwright-cli-help.md)
