import type { Page } from 'playwright-core'
import { cartPage } from './cartPage';
import { loginPage } from './loginPage';
import { landingPage } from './landingPage';
import { productsPage } from './productsPage';


export class pageObjectManager{
    page: Page;
    cartPage: cartPage;
    landingPage: landingPage;
    loginPage: loginPage;
    productsPage: productsPage;
    

    constructor(page: Page){
        this.page = page;
        this.cartPage = new cartPage(this.page);
        this.landingPage = new landingPage(this.page);
        this.loginPage = new loginPage(this.page);
        this.productsPage = new productsPage(this.page);  
    }

    getCartPage(){
        return this.cartPage;
    }

    getLandingPage(){
        return this.landingPage;
    }

    getLoginPage(){
        return this.loginPage;
    }

    getProductsPage(){
        return this.productsPage;
    }
}
module.exports = { pageObjectManager }