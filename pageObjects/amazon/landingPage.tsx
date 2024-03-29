import type { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';

export class landingPage{
    page: Page;
    accountLink: Locator;
    searchField: Locator;
    searchButton: Locator;
    signOutLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.accountLink = this.page.locator("[data-nav-ref='nav_youraccount_btn']");
        this.searchField = this.page.locator('#twotabsearchtextbox');
        this.searchButton = this.page.locator('#nav-search-submit-button');
        this.signOutLink = this.page.locator('#nav-item-signout');
    }

    async searchForProduct(searchText: string): Promise<void>{
        await this.page.waitForLoadState('domcontentloaded');
        await this.searchField.fill(searchText);
        await this.searchButton.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async logout(title: string): Promise<void>{
        await this.accountLink.hover();
        await this.signOutLink.first().click();
        await expect(this.page).toHaveTitle(title);
    }
}
module.exports = { landingPage }