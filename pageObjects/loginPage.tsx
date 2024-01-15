import { Page, Locator } from 'playwright';
const { url } = require('../data/data');
const { expect } = require('@playwright/test');

class loginPage{
    page: Page;
    continueBtn: Locator;
    loginGreeting: Locator;
    passwordField: Locator;
    signInBtn: Locator;
    usernameField: Locator;
    username: string;
    password: string;

    constructor(page: Page){
        this.page = page;
        this.continueBtn = this.page.locator('#continue');
        this.loginGreeting = this.page.locator('#nav-link-accountList-nav-line-1');
        this.passwordField = this.page.locator('#ap_password');
        this.signInBtn = this.page.locator('#signInSubmit');
        this.usernameField = this.page.locator('#ap_email');
    }

    async navigateToSignInPage(title: string){
        await this.page.goto(url);
        console.log('Page title: ', await this.page.title());
        await expect(this.page).toHaveTitle(title);
    }

    async login(){
        this.username = process.env.username_amazon!;
        this.password = process.env.password_amazon!;
        await this.usernameField.fill(this.username);
        await this.continueBtn.first().click();
        await this.passwordField.fill(this.password);
        await this.signInBtn.click();
    }

    async validateLogin(authenticationRequiredMessage: string, loggedInMessage: string){
        await this.page.waitForLoadState('networkidle');
        const title = await this.page.title();
        if(title === authenticationRequiredMessage){
          await this.page.pause();
        }
        await expect(this.loginGreeting).toContainText(loggedInMessage);
    }
}
module.exports = { loginPage }