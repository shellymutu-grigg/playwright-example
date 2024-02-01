import type { Page, Locator } from 'playwright-core';
import { loginUrl } from '../../data/data';
import { expect } from '@playwright/test';

export class loginPage{
    page: Page;
    continueBtn: Locator;
    forgotPasswordLink: Locator;
    loginBtn: Locator;
    loginGreeting: Locator;
    newPasswordConfirmField: Locator;
    newPasswordField: Locator;
    password: string;
    passwordField: Locator;
    passwordIncorrectMessage: Locator;
    signInBtn: Locator;
    usernameField: Locator;
    otpContinueButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.continueBtn = this.page.locator('#continue');
        this.otpContinueButton = this.page.locator('text=Continue');
        this.forgotPasswordLink = this.page.locator('#auth-fpp-link-bottom');
        this.loginGreeting = this.page.locator('#nav-link-accountList-nav-line-1');
        this.newPasswordField = this.page.locator('#ap_fpp_password');
        this.newPasswordConfirmField = this.page.locator('#ap_fpp_password_check');
        this.passwordField = this.page.locator('#ap_password');
        this.passwordIncorrectMessage = this.page.locator('#auth-error-message-box');
        this.signInBtn = this.page.locator('#signInSubmit');
        this.usernameField = this.page.locator('#ap_email');
    }

    async navigateToSignInPage(title: string){
        await this.page.goto(loginUrl);
        console.log('Page title: ', await this.page.title());
        await expect(this.page).toHaveTitle(title);
    }

    async loginToAmazon(username: string, password: string): Promise<void> {
        this.password = password;
        await this.usernameField.fill(username);
        await this.continueBtn.first().click();
        await this.passwordField.fill(password);
        await this.signInBtn.click();
    }

    async validateLogin(authenticationRequiredMessage: string, loggedInMessage: string): Promise<void>{
        await this.page.waitForLoadState('networkidle');
        const title: string = await this.page.title();
        if(title === authenticationRequiredMessage){
            await this.page.pause();
        }
        if(await this.passwordIncorrectMessage.isVisible()){
            await this.forgotPasswordLink.click();
            await this.continueBtn.click();
            await this.page.pause();
            await this.otpContinueButton.click();
            await this.newPasswordField.fill(this.password);
            await this.newPasswordConfirmField.fill(this.password);
            await this.continueBtn.click();
        }
        await expect(this.loginGreeting).toContainText(loggedInMessage);
    }
}
module.exports = { loginPage }