---
name: screenshot-mcp
description: "Take a screenshot of a page after performing specified user actions. Use with Playwright browser interactions."
argument-hint: "User actions to perform before taking screenshot"
agent: agent
tools: ['playwright/*']
---

# Playwright Screenshot Task

## Goal
Take a screenshot of the page after performing specified user actions.

## Procedure

1. **Server Check**: Verify that the server is running on localhost:3000.

   - Run the following command to check:

     ```bash
     pnpm run check:server
     ```

   - If the server is not running, start it with:

     ```bash
     pnpm run dev
     ```

2. **Open Browser**: Navigate to http://localhost:3000 using #playwright (Playwright MCP).

3. **User Actions**: Perform the following user-specified actions:
   {{USER_ACTIONS}}

4. **Capture Screenshot**: Take a screenshot of the <body> element and save it as `tmp/<timestamp>.png`
    - The timestamp should be in the format `tmp/YYYYMMdd_HHmmss.png` (e.g., `tmp/20260310_170230.png` for March 10, 2026 at 17:02:30).
