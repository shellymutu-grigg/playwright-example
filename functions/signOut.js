const { expect } = require('@playwright/test');

export async function signOut(page, accountLink, signOutLink, title){
    await accountLink.hover();
    await signOutLink.first().click();
    await expect(page).toHaveTitle(title);
}