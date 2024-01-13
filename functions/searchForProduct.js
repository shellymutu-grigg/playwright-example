export async function searchForProduct(page, searchField, searchText, searchButton){
    await page.waitForLoadState('domcontentloaded');
    await searchField.fill(searchText);
    await searchButton.click();
    await page.waitForLoadState('domcontentloaded');
}