export async function deleteFromCart(goToCartButton, deleteLink){
    await goToCartButton.first().click();
    await deleteLink.first().click();
}