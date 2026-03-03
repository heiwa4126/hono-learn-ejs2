#!/usr/bin/env node
import { execSync } from "node:child_process";

// `pnpm why playwright --json` で確実にバージョンを拾う
const raw = execSync("pnpm why playwright --json", { encoding: "utf-8" });

const versions = new Set(JSON.parse(raw).map((entry) => entry.version));

console.log("Detected playwright-core versions:", [...versions]);

for (const version of versions) {
	console.log(`\nInstalling Chromium for playwright@${version}...`);
	execSync(`pnpm dlx playwright@${version} install chromium`, {
		stdio: "inherit",
	});
}
