const { loginPage } = require('../pageObjects/loginPage');
const { landingPage } = require('../pageObjects/landingPage');
const { productsPage } = require('../pageObjects/productsPage');
const { cartPage } = require('../pageObjects/cartPage');

class pageObjectManager{
    constructor(page){
        this.page = page;
        this.loginPage = new loginPage(this.page);
        this.landingPage = new landingPage(this.page);
        this.productsPage = new productsPage(this.page);
        this.cartPage = new cartPage(this.page);
    }

    getLoginPage(){
        return this.loginPage;
    }

    getLandingPage(){
        return this.landingPage;
    }

    getProductsPage(){
        return this.productsPage;
    }

    getCartPage(){
        return this.cartPage;
    }
}
module.exports = { pageObjectManager }