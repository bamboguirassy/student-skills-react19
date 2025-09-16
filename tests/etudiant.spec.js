import { test, expect } from "@playwright/test";

test("peut ajouter un étudiant depuis le formulaire", async ({ page }) => {
  await page.goto("http://localhost:5173/etudiants");

  await page.getByPlaceholder("Ex. Amina Diop").fill("Amina Diop");
  await page.getByPlaceholder("amina@example.com").fill("amina@example.com");
  await page.getByLabel("Date de naissance").fill("2000-01-01");

  await page.getByRole("button", { name: "Créer l’étudiant" }).click();

  await expect(page.getByText("Amina Diop")).toBeVisible();
});