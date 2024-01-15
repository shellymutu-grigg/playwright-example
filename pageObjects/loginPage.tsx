import type { Page, Locator } from 'playwright-core';
import { loginUrl } from '../data/data';
import { expect } from '@playwright/test';

export class loginPage{
    page: Page;
    continueBtn: Locator;
    loginGreeting: Locator;
    passwordField: Locator;
    signInBtn: Locator;
    usernameField: Locator;
    username = process.env.username_amazon!;
    password = process.env.password_amazon!;

    constructor(page: Page){
        this.page = page;
        this.continueBtn = this.page.locator('#continue');
        this.loginGreeting = this.page.locator('#nav-link-accountList-nav-line-1');
        this.passwordField = this.page.locator('#ap_password');
        this.signInBtn = this.page.locator('#signInSubmit');
        this.usernameField = this.page.locator('#ap_email');
    }

    async navigateToSignInPage(title: string){
        await this.page.goto(loginUrl);
        console.log('Page title: ', await this.page.title());
        await expect(this.page).toHaveTitle(title);
    }

    async login(){
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