/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright UI: npx playwright test
 * Run specific playwright file: npx playwright test tests/amazonE2ETests.spec.js 
 * test.only to run a single test
*/

const { test } = require('@playwright/test');

const { pageObjectManager } = require('../pageObjects/pageObjectManager');
import { 
  ADDED_TO_CART, 
  AUTHENTICATION_REQUIRED, 
  GREETING, PRODUCT_NAME, 
  SEARCH_TEXT, 
  TITLE }  from '../constants/constants.js';

test('E2E: Login, add a product to cart, remove, then logout', async ({page}) =>
{
  const pageObjects = new pageObjectManager(page);
  const login = pageObjects.getLoginPage(page);
  const landing = pageObjects.getLandingPage(page);
  const products = pageObjects.getProductsPage(page);
  const cart = pageObjects.getCartPage(page);
  
  await login.navigateToSignInPage(TITLE);
  await login.login();
  await login.validateLogin(AUTHENTICATION_REQUIRED, GREETING);

  await landing.searchForProduct(SEARCH_TEXT);

  await products.findProductAndAddToCart(PRODUCT_NAME, ADDED_TO_CART);
  await products.navigateToCart();

  await cart.deleteProductFromCart();  

  await landing.logout(TITLE);
});