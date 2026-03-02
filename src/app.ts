import ejs from "ejs";
import { Hono } from "hono";

export const app = new Hono();

const template1 = "views/index.ejs";
app
	.get("/", async (c) => {
		const html = await ejs.renderFile(template1, { count: 0 });
		return c.html(html);
	})
	.post("/", async (c) => {
		const form = await c.req.formData();
		const action = form.get("action");
		let count = Number(form.get("count")) || 0;

		if (action === "increment") {
			count++;
		} else if (action === "reset") {
			count = 0;
		}
		const html = await ejs.renderFile(template1, { count });
		return c.html(html);
	});
