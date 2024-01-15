class productsPage{

    constructor(page){
        this.page = page;
        this.addToCartButton = this.page.locator('#add-to-cart-button');
        this.goToCartButton = this.page.locator('text=Go to Cart');
        this.message = this.page.locator('.a-section a-padding-medium sw-atc-message-section');
        this.products = this.page.locator('.puis-card-container');
    }

    async findProductAndAddToCart(productName, addedToCart){
        const count = await this.products.count();
            for(let i = 0; i < count; i++){
            const product = await this.products.nth(i).locator('h2').textContent();
            if(product.trim() === productName){
                this.addProductToCart(i, product);
                this.validateProductSuccessfullyAddedToCart(addedToCart);
                break;
            }
        }
    }

    async addProductToCart(i, product){
        await this.products.nth(i).locator('h2').locator('span').click();
        console.log('Selected product name: ',"'", product.trim(), "'");
        await this.addToCartButton.first().click();
    }

    async validateProductSuccessfullyAddedToCart(addedToCart){
        await this.message
                .filter({ hasText: addedToCart })
                .isVisible();
    }

    async navigateToCart(){
        await this.goToCartButton.first().click();
    }
}
module.exports = { productsPage }