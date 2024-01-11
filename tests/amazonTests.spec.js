const { test, expect } = require('@playwright/test');

// Run in non headless mode: npx playwright test --headed 
// Run playwright UI: npx playwright test --ui 
// Run playwright UI: npx playwright test
// Run specific playwright file: npx playwright test tests/amazonTests.spec.js 
// test.only to run a single test

test('Login and wait for network to be idle', async ({page}) =>
{
    let username = page.locator('#ap_email');
    let password = page.locator('#ap_password');
    let continueBtn = page.locator('#continue').first()
    let signInBtn = page.locator('#signInSubmit')

    // Remember that JS is asynchronous not sequential
    await page.goto('https://www.amazon.com/ap/signin?openid.pape.max_auth_age=900&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fyourstore%2Fhome%3Fpath%3D%252Fgp%252Fyourstore%252Fhome%26signIn%3D1%26useRedirectOnSuccess%3D1%26action%3Dsign-out%26ref_%3Dnav_AccountFlyout_signout&openid.assoc_handle=usflex&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0');

    // Print the page title
    console.log('Page title: ', await page.title());

    await expect(page).toHaveTitle("Amazon Sign-In");
    await username.fill(process.env.username_amazon);
    await continueBtn.click();

    await password.fill(process.env.password_amazon);
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#nav-link-accountList-nav-line-1')).toContainText('Hello, M');
    await page.locator('#twotabsearchtextbox').fill('ISTQB');
    await page.locator('#nav-search-submit-button').click();
    await page.locator('.rush-component').nth(1).click();
    await page.pause();
  });