class cartPage{
    constructor(page){
        this.page = page;
        this.deleteLink = this.page.locator("[value='Delete']");
    }

    async deleteProductFromCart(){
        await this.deleteLink.first().click();
    }
}
module.exports = { cartPage }