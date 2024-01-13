const { expect } = require('@playwright/test');

export async function navigateToSignInPage(page, url, title){
    await page.goto(url);
    console.log('Page title: ', await page.title());
    await expect(page).toHaveTitle(title);
}