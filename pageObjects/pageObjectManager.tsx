import type { Page } from 'playwright-core'
import { loginPage } from './loginPage';
import { landingPage } from './landingPage';
import { productsPage } from './productsPage';
import { cartPage } from './cartPage';

export class pageObjectManager{
    page: Page;
    loginPage: loginPage;
    landingPage: landingPage;
    productsPage: productsPage;
    cartPage: cartPage;

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