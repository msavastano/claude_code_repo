import { test, expect } from '@playwright/test'

test.describe('Counter on the landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('displays the initial count of 0', async ({ page }) => {
    await expect(page.getByText('Count: 0')).toBeVisible()
  })

  test('increments the count when the + button is clicked', async ({ page }) => {
    const incrementButton = page.getByRole('button', { name: '+' })

    await incrementButton.click()
    await expect(page.getByText('Count: 1')).toBeVisible()

    await incrementButton.click()
    await expect(page.getByText('Count: 2')).toBeVisible()

    await incrementButton.click()
    await expect(page.getByText('Count: 3')).toBeVisible()
  })

  test('decrements the count when the Decrement button is clicked', async ({ page }) => {
    const incrementButton = page.getByRole('button', { name: '+' })
    const decrementButton = page.getByRole('button', { name: 'Decrement' })

    // Bring count up to 3 first
    await incrementButton.click()
    await incrementButton.click()
    await incrementButton.click()
    await expect(page.getByText('Count: 3')).toBeVisible()

    // Now decrement
    await decrementButton.click()
    await expect(page.getByText('Count: 2')).toBeVisible()

    await decrementButton.click()
    await expect(page.getByText('Count: 1')).toBeVisible()
  })

  test('does not decrement below the minimum value of 0', async ({ page }) => {
    const decrementButton = page.getByRole('button', { name: 'Decrement' })

    // Count is already 0 — clicking decrement should have no effect
    await decrementButton.click()
    await expect(page.getByText('Count: 0')).toBeVisible()
  })

  test('does not increment above the maximum value of 100', async ({ page }) => {
    const incrementButton = page.getByRole('button', { name: '+' })
    const resetButton = page.getByRole('button', { name: 'Reset' })

    // Click increment 100 times to reach the max
    for (let i = 0; i < 100; i++) {
      await incrementButton.click()
    }
    await expect(page.getByText('Count: 100')).toBeVisible()

    // One more click should not go beyond 100
    await incrementButton.click()
    await expect(page.getByText('Count: 100')).toBeVisible()

    // Cleanup: reset for other tests (though beforeEach navigates fresh anyway)
    await resetButton.click()
    await expect(page.getByText('Count: 0')).toBeVisible()
  })

  test('resets the count to 0 when the Reset button is clicked', async ({ page }) => {
    const incrementButton = page.getByRole('button', { name: '+' })
    const resetButton = page.getByRole('button', { name: 'Reset' })

    await incrementButton.click()
    await incrementButton.click()
    await incrementButton.click()
    await expect(page.getByText('Count: 3')).toBeVisible()

    await resetButton.click()
    await expect(page.getByText('Count: 0')).toBeVisible()
  })
})
