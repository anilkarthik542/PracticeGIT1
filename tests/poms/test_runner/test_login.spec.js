import { test as base, expect } from '@playwright/test'
import { LoginPage } from '../pages/login.spec'

const test = base.extend({
    login: async ({ page }, use) => {
        await use(new LoginPage(page))
    }
})

test('Test demo site with Tags @smoke', async ({ login }) => {

    await login.launchUrl('https://www.demoblaze.com/index.html')
    await login.EnterUserAndPassword('pavanol', 'test@123')
})