import { expect, test } from "@playwright/test";
import path from "path";
const UI_URL = "http://localhost:5173";

test("Should login user", async ({ page }) => {
  await page.goto(`${UI_URL}/login`);

  await expect(
    page.getByRole("heading", { name: "Please Login!" })
  ).toBeVisible();

  await page.getByPlaceholder("Email").fill("1@1.com");
  await page.getByPlaceholder("Password").fill("User100%");

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Login successful")).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page.getByText("Logout successful")).toBeVisible();
});

test("Should register user", async ({ page }) => {
  await page.goto(`${UI_URL}/register`);
  await expect(
    page.getByRole("heading", { name: "Please Register!" })
  ).toBeVisible();

  const email = `${Math.abs(Math.ceil(Math.random() * 1000) + 100)}@1.com`;

  await page.getByPlaceholder("Full Name").fill("Test user");
  await page.getByPlaceholder("Email").fill(email);
  await page.locator('[name="password"]').fill("password");
  await page.getByPlaceholder("Confirm Password").fill("password");
  await page
    .locator('[name="profile"]')
    .setInputFiles(path.join(__dirname as string, "files/sajjad1.png"));
  await page.getByRole("button", { name: "Register" }).click();

  await expect(page.getByText("Registration successful")).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Logout" }).click();
  await expect(page.getByText("Logout successful")).toBeVisible();
});
