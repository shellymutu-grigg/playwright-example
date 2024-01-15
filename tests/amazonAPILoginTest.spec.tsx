const { test } = require('@playwright/test');

const { pageObjectManager } = require('../pageObjects/pageObjectManager.js');

test('Complete login to Amazon.com using API calls', async ({ page }) =>
{
    const pageObjects = new pageObjectManager(page);
});