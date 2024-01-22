/** 
 * Generate allure report:
 *  - npm i -D @playwright/test allure-playwright 
 *  - brew install allure // If allure not already installed globally
 *  - npx playwright test --grep @Regression --reporter=line,allure-playwright
 *  - allure generate --clean
 *  - allure open
*/

const { test } = require('@playwright/test');
const { pageObjectManager } = require('../pageObjects/pageObjectManager');
const testData = require('../data/testData');

for(const data of testData) {
    test(`@Regression Test executed with data: ${data.productName}`, async ({ page }) =>
    {
        const username = data.username;
        const password = data.password;
        const productName = data.productName;

        const pageObjects = new pageObjectManager(page);
        const login = pageObjects.getLoginPage(page);
        const dashboard = pageObjects.getDashboardPage(page);
        const cart = pageObjects.getCartPage(page);
        const order = pageObjects.getOrderPage(page);
        const orders = pageObjects.getOrdersPage(page);

        await login.goTo();
        await login.loginToECom(username, password);

        await dashboard.addProductToCart(productName);
        await dashboard.navigateToCart();

        await cart.placeOrder(productName);
        await cart.validateOrderSuccessMessage(username);

        const orderId = await order.confirmOrderDetails();
        await order.navigateToOrdersPage();

        await orders.validateOrder(orderId);
    });
}