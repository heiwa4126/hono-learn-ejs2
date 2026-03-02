import ejs from "ejs";
import { Hono } from "hono";

export const app = new Hono();

app.get("/", async (c) => {
	const html = await ejs.renderFile("views/index.ejs", { title: "Hono" });
	return c.html(html);
});
