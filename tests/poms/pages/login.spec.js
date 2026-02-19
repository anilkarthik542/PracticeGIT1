exports.LoginPage =
    class LoginPage {


        constructor(page) {
            this.page = page,
                this.loginLink = '#login2',
                this.userName = '#loginusername',
                this.password = '#loginpassword',
                this.loginbutton = '//*[@onclick="logIn()"]'
        }

        async launchUrl(url) {
            await this.page.goto(url)
        }

        async EnterUserAndPassword(user, pass) {
            await this.page.locator(this.loginLink).click()
            await this.page.locator(this.userName).fill(user)
            await this.page.locator(this.password).fill(pass)
            await this.page.locator(this.loginbutton).click()

        }

    }