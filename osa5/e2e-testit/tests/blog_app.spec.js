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
        const locator = await page.getByText('Blogs')
        await expect(locator).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('salainen')
          
            await page.getByRole('button', { name: 'login' }).click() 
          
            await expect(page.getByText('mluukkai logged in')).toBeVisible()
        })
    
        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('virheTulloo')
          
            await page.getByRole('button', { name: 'login' }).click() 
          
            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('wrong credentials')
        })
    })
})