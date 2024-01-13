export async function addToCart(products, productName, addToCartButton, message, addedToCart){
    const count = await products.count();
        for(let i = 0; i < count; i++){
        const product = await products.nth(i).locator('h2').textContent();
        if(product.trim() === productName){
            // Add the product to cart
            await products.nth(i).locator('h2').locator('span').click();
            console.log('Selected product name: ',"'", product.trim(), "'");
            await addToCartButton.first().click();
            await message
            .filter({ hasText: addedToCart })
            .isVisible();
            break;
        }
    }
}