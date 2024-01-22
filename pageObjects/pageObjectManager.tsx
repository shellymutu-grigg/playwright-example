import type { Page } from 'playwright-core'
import { cartPage } from './cartPage';
import { dashboardPage } from './dashboardPage';
import { loginPage } from './loginPage';
import { landingPage } from './landingPage';
import { orderPage } from './orderPage';
import { ordersPage } from './ordersPage';
import { productsPage } from './productsPage';


export class pageObjectManager{
    page: Page;
    cartPage: cartPage;
    dashboardPage: dashboardPage;
    landingPage: landingPage;
    loginPage: loginPage;
    orderPage: orderPage;
    ordersPage: ordersPage;
    productsPage: productsPage;
    

    constructor(page: Page){
        this.page = page;
        this.cartPage = new cartPage(this.page);
        this.dashboardPage = new dashboardPage(this.page);
        this.landingPage = new landingPage(this.page);
        this.loginPage = new loginPage(this.page);
        this.orderPage = new orderPage(this.page);
        this.ordersPage = new ordersPage(this.page);
        this.productsPage = new productsPage(this.page);  
    }

    getCartPage(){
        return this.cartPage;
    }

    getDashboardPage(){
        return this.dashboardPage;
    }

    getLandingPage(){
        return this.landingPage;
    }

    getLoginPage(){
        return this.loginPage;
    }

    getOrderPage(){
        return this.orderPage;
    }

    getOrdersPage(){
        return this.ordersPage;
    }

    getProductsPage(){
        return this.productsPage;
    }
}
module.exports = { pageObjectManager }