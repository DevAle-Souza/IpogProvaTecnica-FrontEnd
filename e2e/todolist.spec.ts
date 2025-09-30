import { expect, test } from '@playwright/test';

test.describe('TodoList Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page initially', async ({ page }) => {
    await expect(page).toHaveTitle(/TodoList/);
    await expect(page.locator('h1')).toContainText('Login');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=TodoList')).toBeVisible();
    await expect(page.locator('text=Dashboard')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.fill('input[type="text"]', 'invalid');
    await page.fill('input[type="password"]', 'invalid');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Credenciais inválidas')).toBeVisible();
  });

  test('should navigate to dashboard after login', async ({ page }) => {
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Total de Tarefas')).toBeVisible();
    await expect(page.locator('text=Nova Tarefa')).toBeVisible();
  });

  test('should open task form modal', async ({ page }) => {
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await page.click('text=Nova Tarefa');
    await expect(page.locator('text=Nova Tarefa')).toBeVisible();
    await expect(page.locator('input[formControlName="name"]')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await page.click('text=Sair');
    await expect(page.locator('h1')).toContainText('Login');
  });
});
