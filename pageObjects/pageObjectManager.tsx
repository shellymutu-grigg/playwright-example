import type { Page } from 'playwright';
const { loginPage } = require('./loginPage');
const { landingPage } = require('./landingPage');
const { productsPage } = require('./productsPage');
const { cartPage } = require('./cartPage');

class pageObjectManager{
    page: Page;
    loginPage: Page;
    landingPage: Page;
    productsPage: Page;
    cartPage: Page;

    constructor(page: Page){
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