import type { Page, Locator } from 'playwright-core';

export class cartPage{
    page: Page;
    deleteLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.deleteLink = this.page.locator("[value='Delete']");
    }

    async deleteProductFromCart(): Promise<void>{
        await this.deleteLink.first().click();
    }
}
module.exports = { cartPage }