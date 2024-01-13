const { expect } = require('@playwright/test');

export async function validateLogin(page, loginGreeting, authenticationRequired, greeting){
    await page.waitForLoadState('networkidle');
    const title = await page.title();
    if(title === authenticationRequired){
      await page.pause();
    }
    await expect(loginGreeting).toContainText(greeting);
}