import { Page, Locator } from 'playwright';

class cartPage{
    page: Page;
    deleteLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.deleteLink = this.page.locator("[value='Delete']");
    }

    async deleteProductFromCart(){
        await this.deleteLink.first().click();
    }
}
module.exports = { cartPage }