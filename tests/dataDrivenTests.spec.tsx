/** 
 * Generate allure report:
 *  - npm i -D @playwright/test allure-playwright 
 *  - brew install allure // If allure not already installed globally
 *  - npx playwright test --grep @Regression --reporter=line,allure-playwright
 *  - allure generate --clean
 *  - allure open
*/

import { test } from '@playwright/test';
import { pageObjectManager } from '../pageObjects/pageObjectManager';
import testData from '../data/testData';
import { 
    PRODUCT_ADDED_TO_CART_MESSAGE, 
    AUTHENTICATION_REQUIRED_MESSAGE, 
    LOGGED_IN_MESSAGE,  
    SIGN_IN_PAGE_TITLE }  from '../constants/constants';

for(const data of testData) {
    test(`@Regression Data driven test for product: ${data.productName}`, async ({ page }) =>
    {
        const pageObjects = new pageObjectManager(page);
        const cartPage = pageObjects.getCartPage();
        const loginPage = pageObjects.getLoginPage();
        const landingPage = pageObjects.getLandingPage();
        const productsPage = pageObjects.getProductsPage();
        
        await loginPage.navigateToSignInPage(SIGN_IN_PAGE_TITLE);
        await loginPage.loginToAmazon(data.username, data.username);
        await loginPage.validateLogin(AUTHENTICATION_REQUIRED_MESSAGE, LOGGED_IN_MESSAGE);

        await landingPage.searchForProduct(data.productSearchText);

        await productsPage.findProductAndAddToCart(data.productName, PRODUCT_ADDED_TO_CART_MESSAGE);
        await productsPage.navigateToCart();

        await cartPage.deleteProductFromCart();  

        await landingPage.logout(SIGN_IN_PAGE_TITLE);
    });
}