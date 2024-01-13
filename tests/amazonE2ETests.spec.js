/** 
 * Run in non headless mode: npx playwright test --headed 
 * Run playwright UI: npx playwright test --ui 
 * Run playwright UI: npx playwright test
 * Run specific playwright file: npx playwright test tests/amazonTests.spec.js 
 * test.only to run a single test
*/

const { test } = require('@playwright/test');

import { login } from '../functions/login.js';
import { navigateToSignInPage } from '../functions/navigate.js';
import { validateLogin } from '../functions/validateLogin.js';
import { searchForProduct }  from '../functions/searchForProduct.js';
import { addToCart }  from '../functions/addToCart.js';
import { deleteFromCart }  from '../functions/deletFromCart.js';
import { signOut }  from '../functions/signOut.js';
import { 
  ADDED_TO_CART, 
  AUTHENTICATION_REQUIRED, 
  GREETING, PRODUCT_NAME, 
  SEARCH_TEXT, 
  TITLE }  from '../constants/constants.js';

test('E2E: Login, add a product to cart, remove it then logout', async ({page}) =>
{
  const accountLink = page.locator("[data-nav-ref='nav_youraccount_btn']");
  const addToCartButton = page.locator('#add-to-cart-button');
  const continueBtn = page.locator('#continue');
  const deleteLink = page.locator("[value='Delete']");
  const goToCartButton = page.locator('text=Go to Cart');
  const loginGreeting = page.locator('#nav-link-accountList-nav-line-1');
  const message = page.locator('.a-section a-padding-medium sw-atc-message-section');
  const password = page.locator('#ap_password');
  const products = page.locator('.puis-card-container');
  const searchButton = page.locator('#nav-search-submit-button');
  const searchField = page.locator('#twotabsearchtextbox');
  const signInBtn = page.locator('#signInSubmit');
  const signOutLink = page.locator('#nav-item-signout');
  const url = 'https://www.amazon.com/ap/signin?openid.pape.max_auth_age=900&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fyourstore%2Fhome%3Fpath%3D%252Fgp%252Fyourstore%252Fhome%26signIn%3D1%26useRedirectOnSuccess%3D1%26action%3Dsign-out%26ref_%3Dnav_AccountFlyout_signout&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0';
  const username = page.locator('#ap_email');

  await navigateToSignInPage(page, url, TITLE);
  await login(username, password, continueBtn, signInBtn, loginGreeting);
  await validateLogin(page, loginGreeting, AUTHENTICATION_REQUIRED, GREETING);
  await searchForProduct(page, searchField, SEARCH_TEXT, searchButton);
  await addToCart(products, PRODUCT_NAME, addToCartButton, message, ADDED_TO_CART);
  await deleteFromCart(goToCartButton, deleteLink);
  await signOut(page, accountLink, signOutLink, TITLE);
});