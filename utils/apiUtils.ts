import type { APIRequestContext, APIResponse } from "playwright-core";
import { eComCreateOrderPostApiUrl, eComLoginPostApiUrl, eComNewPasswordPostApiUrl } from "../data/data";

export class apiUtils{
    apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext){
        this.apiContext = apiContext;
    }

    async getResponse(url: string): Promise<APIResponse> {
        let response: APIResponse = await this.apiContext.get(url);
        return response;
    }

    async displayUserDetails(response: string){
        let json = JSON.parse(response);
        let jsonResult = json.results[0]; 
        console.log(`User name: ${jsonResult.name.title} ${jsonResult.name.first} ${jsonResult.name.last}`);
        console.log(`Address:   ${jsonResult.location.street.number} ${jsonResult.location.street.name}, ${jsonResult.location.city}, ${jsonResult.location.country}, ${jsonResult.location.postcode}`);
    }

    async createOrder(loginPayload: object, orderPayLoad: object, resetPasswordPayLoad: object){

        let response = {
            token: "",
            orderId: "",
        };

        response.token = await this.getToken(resetPasswordPayLoad, loginPayload);
        const orderResponse = await this.apiContext.post(eComCreateOrderPostApiUrl, 
            {
                data: orderPayLoad,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            });
        const orderResponseJson = await orderResponse.json();
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;
    }

    async getToken(resetPasswordPayLoad: object, loginPayLoad: object) {
        let loginResponse = await this.apiContext.post(eComLoginPostApiUrl, 
        {
            data: loginPayLoad,
        });

        if(!(await loginResponse).ok() === true){
            const resetPasswordResponse = await this.apiContext.post(eComNewPasswordPostApiUrl, 
            {
                data: resetPasswordPayLoad,
            });
        }
    
        loginResponse = await this.apiContext.post(eComLoginPostApiUrl, 
        {
            data: loginPayLoad,
        });
    
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        return token;
    }
}
module.exports = { apiUtils }