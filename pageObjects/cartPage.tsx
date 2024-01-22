import type { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';

export class cartPage{
    page: Page;
    checkout: Locator;
    deleteLink: Locator;
    dropdownOptions: Locator;
    ordersList: Locator;
    selectCountry: Locator;
    usernameMessage: Locator;
    message: Locator;
    submit: Locator;

    constructor(page: Page){
        this.page = page;
        this.checkout = this.page.locator('text=Checkout');
        this.deleteLink = this.page.locator("[value='Delete']");
        this.dropdownOptions = this.page.locator('.ta-results');
        this.message = this.page.locator('.hero-primary');
        this.ordersList = this.page.locator('div li');
        this.selectCountry = this.page.locator("[placeholder='Select Country']");
        this.submit = this.page.locator('.action__submit');
        this.usernameMessage = this.page.locator(".user__name [type='text']");
    }

    async deleteProductFromCart(): Promise<void>{
        await this.deleteLink.first().click();
    }

    async placeOrder(productName: string): Promise<void>{
        await this.ordersList.first().waitFor();

        // isVisible() does not implement the auto wait
        const isPresent: boolean = await this.page.locator("h3:has-text('" + productName + "')").isVisible();
        expect(isPresent).toBeTruthy();
        await this.checkout.click();
        await this.selectCountry.pressSequentially('new z');
        await this.dropdownOptions.waitFor();
        const optionsCount: number = await this.dropdownOptions.locator('button').count();
        for(let i = 0; i < optionsCount; i++){
            const text: string | null = await this.dropdownOptions.locator('button').nth(i).textContent();
            if(text != null){
                if(text.trim() === 'New Zealand'){
                    await this.dropdownOptions.locator('button').nth(i).click();
                    break;
                }
            }
        }
    }

    async validateOrderSuccessMessage(username: string): Promise<void>{
        await expect(this.usernameMessage.first()).toHaveText(username);
        await this.submit.click();
        await expect(this.message).toHaveText(' Thankyou for the order. ');
    }
}
module.exports = { cartPage }