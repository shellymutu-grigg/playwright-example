/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright UI: npx playwright test
 * Run specific playwright file: npx playwright test tests/amazonE2ETest.spec.js 
 * test.only to run a single test
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

test('E2E: Login to Amazon.com, add product to cart, remove, then logout', async ({ page }) =>
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