import { test, expect } from '@playwright/test'

test('app boots and renders the shell', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Avanti/)
  await expect(page.locator('#app')).toBeVisible()
})
