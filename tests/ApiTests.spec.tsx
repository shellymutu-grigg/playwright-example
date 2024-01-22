import { test, request, APIRequestContext } from '@playwright/test';
import { apiUtils } from '../utils/apiUtils';
import { country, eComGetOrdersApiUrl, eComGetOrdersForGivenUserApiUrl, eComLoginUrl, productId, randomUserApiUrl } from '../data/data';

const loginPayLoad = {
    userEmail: process.env.username_rahulshetty,
    userPassword: process.env.password_rahulshetty,
};

const orderPayLoad = {
    orders: [
        {
            country: country,
            productOrderedId: productId
        }
    ]
}

const resetPasswordPayLoad = {
    userEmail: process.env.username_rahulshetty,
    userPassword: process.env.password_rahulshetty,
    confirmPassword:process.env.password_rahulshetty
}

const emptyOrdersPayload = {
    data: [],
    message: "No Orders"
}

let apiContext: APIRequestContext;

test.beforeAll( async () => {
    apiContext = await request.newContext();
});

test('Generate user name and address from an API call', async () =>
{
    const localApiUtils = new apiUtils(apiContext);
    let response = await localApiUtils.getResponse(randomUserApiUrl);
    await localApiUtils.displayUserDetails(await response.text());
});

test('@API Hijack and mock an API response to force UI to display no orders', async ({ page }) =>
{
    const ordersLink = page.locator("button[routerlink='/dashboard/myorders']");
    const messageElement = page.locator('.mt-4');
    const localApiUtils = new apiUtils(apiContext);
    let response = await localApiUtils.createOrder(loginPayLoad, orderPayLoad, resetPasswordPayLoad);

    // Inject token into cookies to prevent needing to login
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);
    
    await page.goto(eComLoginUrl);

    // Highjack network API call and mock response
    await page.route(
        eComGetOrdersForGivenUserApiUrl, 
        async route => {
            // Retrieve the real response from API
            const response = await page.request.fetch(route.request());

            // Overwrite response by mocking body variable
            let body = JSON.stringify(emptyOrdersPayload);
            route.fulfill(
                {
                    response, 
                    body
                }
            );
        }
    );
    await ordersLink.click();
    await page.waitForResponse(eComGetOrdersApiUrl);
    await page.waitForLoadState('networkidle');
    const message = await messageElement.textContent();
    console.log('Token:', response.token);
    console.log('OrderId:', response.orderId);
    console.log('Message displayed:', message);
});

