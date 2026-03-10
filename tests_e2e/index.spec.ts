import { expect, test } from "@playwright/test";

test("Counter test", async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle("Counter");
	await expect(page.locator("h1")).toHaveText("Counter");

	// Playwrightのロケーターは遅延評価される。変数に入れても動作する
	const count = page.locator("#count");
	const incrementButton = page.getByRole("button", { name: "Increment" });
	const resetButton = page.getByRole("button", { name: "Reset" });

	await expect(count).toHaveText("0");

	await incrementButton.click();
	await expect(count).toHaveText("1");

	await incrementButton.click();
	await expect(count).toHaveText("2");

	await resetButton.click();
	await expect(count).toHaveText("0");
});
