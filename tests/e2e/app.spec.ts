import { test, expect } from '@playwright/test'

test('app boots and renders the shell', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Avanti/)
  await expect(page.locator('#app')).toBeVisible()
})

test('dashboard renders data loaded from the store', async ({ page }) => {
  await page.goto('/')

  // Balance card + composed caption from the mock API payload (both breakpoints).
  await expect(page.locator('.balance__amount')).toHaveText(/€\s*12\s*000/)
  await expect(page.locator('.balance')).toContainText(/TAN\s*3,8%/)
  await expect(page.getByRole('button', { name: /Preleva i fondi/ })).toBeVisible()

  // Assistant popup pulls its data from the store on every breakpoint.
  await expect(page.locator('.chat')).toContainText('Schierano Deborah')
})

test('desktop shows the global profile and Assistenza counter', async ({
  page
}, testInfo) => {
  test.skip(testInfo.project.name !== 'chromium', 'desktop-only layout')
  await page.goto('/')

  await expect(page.locator('.page-bar')).toContainText('Marco Rossi')
  await expect(page.locator('.assistenza__badge')).toHaveText('4')
})
