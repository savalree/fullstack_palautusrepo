const { beforeEach, test, describe, expect } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
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

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {    
            await loginWith(page, 'mluukkai', 'salainen')
        })
      
        test('a new blog can be created', async ({ page }) => {
            await page.getByRole('button', { name: 'create new blog' }).click() 
            await expect(page.getByText('title:')).toBeVisible()

            await page.getByTestId('title').fill('Puhas Kass')
            await page.getByTestId('author').fill('Limps Limps')
            await page.getByTestId('url').fill('www.kissa.fi')

            await page.getByRole('button', { name: 'create' }).click() 

            await expect(page.getByText('Puhas Kass by Limps Limps')).toBeVisible()
        })
      })
})