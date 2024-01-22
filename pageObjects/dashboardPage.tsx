import type { Page, Locator } from 'playwright-core';
const { expect } = require('@playwright/test');

export class dashboardPage{
    page: Page;
    productTitles: Locator;
    products: Locator;
    homeLink: Locator;
    cartLink: Locator;

    constructor(page: Page){
        this.page = page;
        this.productTitles = this.page.locator(".card-body b");
        this.products = this.page.locator(".card-body");
        this.homeLink = this.page.locator("button:has-text('HOME')");
        this.cartLink = this.page.locator("[routerlink='/dashboard/cart']");
    }

    async addProductToCart(productName: string): Promise<void>{
        await this.page.waitForLoadState('networkidle');
        await this.homeLink.isVisible();
        const allProductTitles: string[] = await this.productTitles.allTextContents();
        console.log('All product titles:', allProductTitles);

        const count: number = await this.products.count();
        for(let i = 0; i < count; i++){
            const currentProductName: string | null = await this.products.nth(i).locator('b').textContent();
            if(await currentProductName === productName){
                // Add the product to cart
                await this.products.nth(i).locator("button:has-text(' Add To Cart')").click();
                const message: Locator = await this.page.locator('.toast-message'); 
                console.log('message:', productName + await message.textContent());
                await expect(message).toHaveText(' Product Added To Cart ');
                break;
            }
        }
    }

    async navigateToCart(): Promise<void>{
        await this.cartLink.click();
    }
}
module.exports = { dashboardPage };