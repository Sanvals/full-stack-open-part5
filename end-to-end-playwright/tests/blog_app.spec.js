const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blogs app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'Josefa',
        password: 'alcachofa'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')
    
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Blogs')).toBeVisible()
  })

  test('login is visible', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page, request }) => {
      await page.goto('http://localhost:5173')
      await request.post('http:localhost:3003/api/testing/reset')
      await page.getByRole('textbox').first().fill('Josefa')
      await page.getByRole('textbox').last().fill('alcachofa')
      await page.getByRole('button', { name: 'login' }).click()   
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new' }).click()
      await page.getByRole('textbox').first().fill('test blog')
      await page.getByRole('textbox').last().fill('test url')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText(/Created new blog/)).toBeVisible()
    })

    test('an user can delete the created blog', async ({ page }) => {
      await page.getByRole('button', { name: 'create new' }).click()
      await page.getByRole('textbox').first().fill('test blog')
      await page.getByRole('textbox').last().fill('test url')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText(/Created new blog/)).toBeVisible()

      await page.getByRole('button', { name: 'view' }).last().click()
      
      page.on('dialog', async (d) => {
        console.log('Playwright dialog:', d.message())
        await d.accept();
      })
      
      await page.getByRole('button ', { name: '🗑️' }).last().click()
      await expect(page.getByText(/Blog deleted/)).toBeVisible()
    })

    test('a user can like a blog', async ({ page }) => {
      await page.getByRole('button', { name: 'create new' }).click()
      await page.getByRole('textbox').first().fill('test blog')
      await page.getByRole('textbox').last().fill('test url')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText(/Created new blog/)).toBeVisible()
      
      await page.getByRole('button', { name: 'view' }).last().click()
      
      await expect(page.getByText(/0 likes/).last()).toBeVisible()

      await page.getByRole('button', { name: '❤️' }).last().click()

      await expect(page.getByText(/1 likes/).last()).toBeVisible()
    })

    test.only('only the owner can see the delete button', async ({ page }) => {
      await page.getByRole('button', { name: 'create new' }).click()
      await page.getByRole('textbox').first().fill('test blog')
      await page.getByRole('textbox').last().fill('test url')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText(/Created new blog/)).toBeVisible()
      
      await page.getByRole('button', { name: 'view' }).last().click()
      
      await expect(page.getByRole('button', { name: '🗑️' }).last()).toBeVisible()
    })

    
    test.only('check that the blogs are arranged in order of likes', async ({ page }) => {
      await page.getByRole('button', { name: 'create new' }).click()
      await page.getByRole('textbox').first().fill('test blog')
      await page.getByRole('textbox').last().fill('test url')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText(/Created new blog/)).toBeVisible()
      
      await page.getByRole('button', { name: 'view' }).last().click()
      
      await expect(page.getByText(/0 likes/).last()).toBeVisible()
      await page.getByRole('button', { name: '❤️' }).last().click()
      await expect(page.getByText(/1 likes/).last()).toBeVisible()
      await page.getByRole('button', { name: '❤️' }).last().click()
      await expect(page.getByText(/2 likes/).last()).toBeVisible()
      await page.getByRole('button', { name: '❤️' }).last().click()
      await expect(page.getByText(/3 likes/).last()).toBeVisible()
    })
  })
})