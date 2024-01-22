import type { Page, Locator } from 'playwright-core';

export class productsPage {
    page: Page;
    addToCartButton: Locator;
    goToCartButton: Locator;
    message: Locator;
    products: Locator;
    productName: string | null;

    constructor(page: Page){
        this.page = page;
        this.addToCartButton = this.page.locator('#add-to-cart-button');
        this.goToCartButton = this.page.locator('text=Go to Cart');
        this.message = this.page.locator('.a-section a-padding-medium sw-atc-message-section');
        this.products = this.page.locator('.puis-card-container').locator('h2').locator('span');
    }

    async findProductAndAddToCart(requestedProductName: string, addedToCart: string): Promise<void>{
        const count: number = await this.products.count();
        console.log('  Number of products: ',"'", count, "'");
        console.log('requestedProductName: ',"'", requestedProductName, "'");
        console.log('    this.productName: ',"'", this.productName, "'");
        for(let i: number = 0; i < count; i++){
            await this.page.pause();
            console.log('matching products: ',"'", await this.products.nth(i).count(), "'");
            if (await this.products.nth(i).count() > 1){
                this.productName = await this.products.nth(i)[1].textContent();
            } else {
                this.productName = await this.products.nth(i).textContent();
            }
            if(this.productName != null && this.productName.trim() === requestedProductName){
                this.addProductToCart(i, this.productName);
                this.validateProductSuccessfullyAddedToCart(addedToCart);
                break;
            }
        }
    }

    async addProductToCart(i: number, product: string): Promise<void>{
        await this.products.nth(i).click();
        console.log('Selected product name: ',"'", product.trim(), "'");
        await this.addToCartButton.first().click();
    }

    async validateProductSuccessfullyAddedToCart(addedToCart: string): Promise<void>{
        await this.message
                .filter({ hasText: addedToCart })
                .isVisible();
    }

    async navigateToCart(): Promise<void>{
        await this.goToCartButton.first().click();
    }
}
module.exports = { productsPage }