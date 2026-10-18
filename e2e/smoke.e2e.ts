import { expect, test } from "@playwright/test";

test("tagger viewer loads the model and renders", async ({ page }) => {
  const model = page.waitForResponse((response) =>
    response.url().endsWith("/taggerv1.wrl"),
  );

  await page.goto("/");
  expect((await model).status()).toBe(200);
  await expect(page.locator("canvas")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Repositorio en GitHub" }),
  ).not.toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(
    page.getByRole("link", { name: "Repositorio en GitHub" }),
  ).toHaveAttribute("href", "https://github.com/raulmoracode/tagger");
  await expect(
    page.getByRole("link", { name: "Sitio raulmoracode.com" }),
  ).toHaveAttribute("href", "https://raulmoracode.com");
});
