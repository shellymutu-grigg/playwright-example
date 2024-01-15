const { url } = require('../data/data');
const { expect } = require('@playwright/test');

class loginPage{
    constructor(page){
        this.page = page;
        this.continueBtn = this.page.locator('#continue');
        this.loginGreeting = this.page.locator('#nav-link-accountList-nav-line-1');
        this.passwordField = this.page.locator('#ap_password');
        this.signInBtn = this.page.locator('#signInSubmit');
        this.usernameField = this.page.locator('#ap_email');
    }

    async navigateToSignInPage(title){
        await this.page.goto(url);
        console.log('Page title: ', await this.page.title());
        await expect(this.page).toHaveTitle(title);
    }

    async login(){
        await this.usernameField.fill(process.env.username_amazon);
        await this.continueBtn.first().click();
        await this.passwordField.fill(process.env.password_amazon);
        await this.signInBtn.click();
    }

    async validateLogin(authenticationRequired, greeting){
        await this.page.waitForLoadState('networkidle');
        const title = await this.page.title();
        if(title === authenticationRequired){
          await this.page.pause();
        }
        await expect(this.loginGreeting).toContainText(greeting);
    }
}
module.exports = { loginPage }