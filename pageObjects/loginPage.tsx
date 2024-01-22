import type { Page, Locator } from 'playwright-core';
import { eComLoginUrl, loginUrl } from '../data/data';
import { expect } from '@playwright/test';

export class loginPage{
    page: Page;
    continueBtn: Locator;
    loginBtn: Locator;
    loginGreeting: Locator;
    passwordFieldAmazon: Locator;
    passwordFieldECom: Locator;
    signInBtn: Locator;
    usernameFieldAmazon: Locator;
    usernameFieldECom: Locator;
    username_amazon = process.env.username_amazon!;
    password_amazon = process.env.password_amazon!;
    username_ecom = process.env.username_rahulshetty!;
    password_ecom = process.env.password_rahulshetty!;

    constructor(page: Page){
        this.page = page;
        this.loginBtn = this.page.locator('#login')
        this.continueBtn = this.page.locator('#continue');
        this.loginGreeting = this.page.locator('#nav-link-accountList-nav-line-1');
        this.passwordFieldAmazon = this.page.locator('#ap_password');
        this.passwordFieldECom = this.page.locator('#userPassword');
        this.signInBtn = this.page.locator('#signInSubmit');
        this.usernameFieldAmazon = this.page.locator('#ap_email');
        this.usernameFieldECom = this.page.locator('#userEmail');
    }

    async navigateToSignInPage(title: string){
        await this.page.goto(loginUrl);
        console.log('Page title: ', await this.page.title());
        await expect(this.page).toHaveTitle(title);
    }

    async goTo(){
        await this.page.goto(eComLoginUrl);
    }

    async loginToAmazon(): Promise<void> {
        await this.usernameFieldAmazon.fill(this.username_amazon);
        await this.continueBtn.first().click();
        await this.passwordFieldAmazon.fill(this.password_amazon);
        await this.signInBtn.click();
    }

    async loginToECom(): Promise<void> {
        console.log('Page title:', await this.page.title());
        await expect(this.page).toHaveTitle("Let's Shop");
        await this.usernameFieldECom.fill(this.username_ecom);
        await this.passwordFieldECom.fill(this.password_ecom);
        await this.loginBtn.click();
    }

    async validateLogin(authenticationRequiredMessage: string, loggedInMessage: string): Promise<void>{
        await this.page.waitForLoadState('networkidle');
        const title: string = await this.page.title();
        if(title === authenticationRequiredMessage){
          await this.page.pause();
        }
        await expect(this.loginGreeting).toContainText(loggedInMessage);
    }
}
module.exports = { loginPage }