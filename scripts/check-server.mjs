#!/usr/bin/env node
// Equivalent to: curl -s http://localhost:3000 > /dev/null && echo "Server is running" || echo "Server is not running"

const url = process.argv[2] ?? "http://localhost:3000";

try {
	const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
	if (res.ok || res.status < 500) {
		console.log("Server is running");
		process.exit(0);
	} else {
		console.log("Server is not running");
		process.exit(1);
	}
} catch {
	console.log("Server is not running");
	process.exit(1);
}
