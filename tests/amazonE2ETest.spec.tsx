/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright: npx playwright test
 * Run specific playwright file: npx playwright test tests/section14CWebTagTest.spec.js 
 * test.only to run a single test
 * Run specific playwright file in debug mode: npx playwright test tests/section14WebTagTest.spec.js --debug
 * Generate code: npx playwright codegen htps://www.google.com
 * Set workers: npx playwright test tests/section14WebTagTest.spec.js --config playwright.config-other.js --project=chrome
 * Run tests using tags: npx playwright test --grep @API
 * Generate allure report:
 *  - npm i -D @playwright/test allure-playwright 
 *  - brew install allure
 *  - npx playwright test --grep @API --reporter=line,allure-playwright
 *  - allure generate 
 *  - allure open
 * 
 * Run script: npm run test
*/

import { test } from '@playwright/test';
import { pageObjectManager } from '../pageObjects/pageObjectManager';
import { 
  PRODUCT_ADDED_TO_CART_MESSAGE, 
  AUTHENTICATION_REQUIRED_MESSAGE, 
  LOGGED_IN_MESSAGE, 
  PRODUCT_NAME, 
  SEARCH_TEXT, 
  SIGN_IN_PAGE_TITLE }  from '../constants/constants';

test('@E2E: Login to Amazon.com, add product to cart, remove, then logout', async ({ page }) =>
{
  const pageObjects = new pageObjectManager(page);
  const cartPage = pageObjects.getCartPage();
  const loginPage = pageObjects.getLoginPage();
  const landingPage = pageObjects.getLandingPage();
  const productsPage = pageObjects.getProductsPage();
  
  await loginPage.navigateToSignInPage(SIGN_IN_PAGE_TITLE);
  await loginPage.login();
  await loginPage.validateLogin(AUTHENTICATION_REQUIRED_MESSAGE, LOGGED_IN_MESSAGE);

  await landingPage.searchForProduct(SEARCH_TEXT);

  await productsPage.findProductAndAddToCart(PRODUCT_NAME, PRODUCT_ADDED_TO_CART_MESSAGE);
  await productsPage.navigateToCart();

  await cartPage.deleteProductFromCart();  

  await landingPage.logout(SIGN_IN_PAGE_TITLE);
});