const { beforeEach, test, describe, expect } = require('@playwright/test')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http:localhost:3003/api/testing/reset')
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
          }
        })
    
        await page.goto('http://localhost:5173')
      })

    test('Login form is shown', async ({ page }) => {
        await page.goto('http://localhost:5173')

        const locator = await page.getByText('Blogs')
        await expect(locator).toBeVisible()
    })
})