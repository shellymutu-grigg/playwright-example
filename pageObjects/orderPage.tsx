import type { Page, Locator } from 'playwright-core';
export class orderPage{
    page: Page;
    orderId: Locator;
    ordersLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.orderId = this.page.locator('.em-spacer-1 .ng-star-inserted');
        this.ordersLink = this.page.locator("button[routerlink='/dashboard/myorders']")
    }

    async confirmOrderDetails(): Promise<string | undefined>{
        const orderText: string | null = await this.orderId.textContent();
        const orderNumber: string | undefined = orderText?.split(' ')[2];
        console.log('Order number:', orderNumber);
        return orderNumber;
    }

    async navigateToOrdersPage(): Promise<void>{
        await this.ordersLink.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('tbody').waitFor();
    }
}
module.exports = { orderPage }