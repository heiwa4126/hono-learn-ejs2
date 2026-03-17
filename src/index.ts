import { serve } from "@hono/node-server";
import { app } from "./app.js";

serve(
	{
		fetch: app.fetch,
		hostname: "127.0.0.1",
		port: 3000,
	},
	(info) => {
		console.log(`Server is running on http://127.0.0.1:${info.port}`);
	},
);
