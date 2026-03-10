---
name: screenshot-with-playwright-mcp
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
     curl -s http://localhost:3000 > /dev/null && echo "Server is running" || echo "Server is not running"
     ```
   - If the server is not running, start it with:
     ```bash
     pnpm dev
     ```

2. **Open Browser**: Navigate to http://localhost:3000 using #playwright (Playwright MCP).

3. **User Actions**: Perform the following user-specified actions:
   {{USER_ACTIONS}}

4. **Capture Screenshot**: Take a screenshot of the <body> element and save it with the timestamp filename format specified below.

## Timestamp Format

Use the format: `YYYYMMdd_HHmmss.png`

Example: `20260310_170230.png` (March 10, 2026 at 17:02:30)

Where:
- YYYY = Year (4 digits)
- MM = Month (2 digits, 01-12)
- dd = Day (2 digits, 01-31)
- HH = Hour (2 digits, 00-23)
- mm = Minutes (2 digits, 00-59)
- ss = Seconds (2 digits, 00-59)
