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
        this.products = this.page.locator('.puis-card-container');
    }

    async findProductAndAddToCart(requestedProductName: string, addedToCart: string){
        const count: number = await this.products.count();
            for(let i: number = 0; i < count; i++){
            this.productName = await this.products.nth(i).locator('h2').textContent();
            if(this.productName != null && this.productName.trim() === requestedProductName){
                this.addProductToCart(i, this.productName);
                this.validateProductSuccessfullyAddedToCart(addedToCart);
                break;
            }
        }
    }

    async addProductToCart(i: number, product: string){
        await this.products.nth(i).locator('h2').locator('span').click();
        console.log('Selected product name: ',"'", product.trim(), "'");
        await this.addToCartButton.first().click();
    }

    async validateProductSuccessfullyAddedToCart(addedToCart: string){
        await this.message
                .filter({ hasText: addedToCart })
                .isVisible();
    }

    async navigateToCart(){
        await this.goToCartButton.first().click();
    }
}
module.exports = { productsPage }