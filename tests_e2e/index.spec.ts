import { expect, test } from "@playwright/test";

test("Counter test", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle("Counter");
	await expect(page.locator("h1")).toHaveText("Counter");
	await expect(page.locator("#count")).toHaveText("0");

	await page.getByRole("button", { name: "Increment" }).click();
	await expect(page.locator("#count")).toHaveText("1");

	await page.getByRole("button", { name: "Increment" }).click();
	await expect(page.locator("#count")).toHaveText("2");

	await page.getByRole("button", { name: "Reset" }).click();
	await expect(page.locator("#count")).toHaveText("0");
});
