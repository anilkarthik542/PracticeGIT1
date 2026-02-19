const { test: base, expect } = require('@playwright/test')
const { LoginPage } = require('../pages/login.spec')

const test = base.extend({
    login: async ({ page }, use) => {
        await use(new LoginPage(page))
    }
})

test('Test demo site with Tags @smoke', async ({ login }) => {

    await login.launchUrl('https://www.demoblaze.com/index.html')
    await login.EnterUserAndPassword('pavanol', 'test@123')
})