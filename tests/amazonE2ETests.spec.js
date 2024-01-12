const { test, expect } = require('@playwright/test');

// Run in non headless mode: npx playwright test --headed 
// Run playwright UI: npx playwright test --ui 
// Run playwright UI: npx playwright test
// Run specific playwright file: npx playwright test tests/amazonTests.spec.js 
// test.only to run a single test

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

  const ADDED_TO_CART = 'Added to Cart';
  const AUTHENTICATION_REQUIRED = 'Authentication required';
  const GREETING = 'Hello, M';
  const PRODUCT_NAME = 'ISTQB® Certified Tester Foundation Level: A Self-Study Guide Syllabus v4.0';
  const SEARCH_TEXT = 'ISTQB';
  const TITLE = 'Amazon Sign-In';

  await navigateToSignInPage(page, url, TITLE);

  await login(username, password, continueBtn, signInBtn, loginGreeting);

  await validateLogin(page, loginGreeting, AUTHENTICATION_REQUIRED, GREETING);
  
  await searchForProduct(page, searchField, SEARCH_TEXT, searchButton);

  await addToCart(products, PRODUCT_NAME, addToCartButton, message, ADDED_TO_CART);

  await deleteFromCart(goToCartButton, deleteLink);

  await signOut(page, accountLink, signOutLink, TITLE);
});

async function navigateToSignInPage(page, url, title){
  await page.goto(url);
  console.log('Page title: ', await page.title());
  await expect(page).toHaveTitle(title);
}

async function login(username, password, continueBtn, signInBtn){
  await username.fill(process.env.username_amazon);
  await continueBtn.first().click();
  await password.fill(process.env.password_amazon);
  await signInBtn.click();
}

async function validateLogin(page, loginGreeting, authenticationRequired, greeting){
  await page.waitForLoadState('networkidle');
  const title = await page.title();
  if(title === authenticationRequired){
    await page.pause();
  }
  await expect(loginGreeting).toContainText(greeting);
}

async function searchForProduct(page, searchField, searchText, searchButton){
  await page.waitForLoadState('domcontentloaded');
  await searchField.fill(searchText);
  await searchButton.click();
  await page.waitForLoadState('domcontentloaded');
}

async function addToCart(products, productName, addToCartButton, message, addedToCart){
  const count = await products.count();
    for(let i = 0; i < count; i++){
      const product = await products.nth(i).locator('h2').textContent();
      if(product.trim() === productName){
        // Add the product to cart
        await products.nth(i).locator('h2').locator('span').click();
        console.log('Selected product name: ',"'", product.trim(), "'");
        await addToCartButton.first().click();
        await message
          .filter({ hasText: addedToCart })
          .isVisible();
          break;
      }
    }
}

async function deleteFromCart(goToCartButton, deleteLink){
  await goToCartButton.first().click();
  await deleteLink.first().click();
}

async function signOut(page, accountLink, signOutLink, title){
  await accountLink.hover();
  await signOutLink.first().click();
  await expect(page).toHaveTitle(title);
}