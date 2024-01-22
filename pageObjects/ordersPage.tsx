import type { Page, Locator } from 'playwright-core';
const { expect } = require('@playwright/test');

export class ordersPage{
    page: Page;
    ordersTable: Locator;

    constructor(page: Page){
        this.page = page;
        this.ordersTable = this.page.locator("tbody tr");
    }

    async validateOrder(orderId: string): Promise<void>{
        const rows: Locator = await this.ordersTable;
        const rowCount: number = await rows.count();
        for(let i = 0; i < rowCount; i++){
            const rowOrderId: string | null = await rows.nth(i).locator('th').textContent();
            if(rowOrderId !=null){
                if(orderId.includes(rowOrderId)){
                    await rows.nth(i).locator('button').first().click();
                    const orderIdDetails: string | null = await this.page.locator('.col-text').textContent();
                    if(orderIdDetails != null){
                        await expect(orderId.includes(orderIdDetails)).toBeTruthy();
                        break;
                    }
                }
            }
        }
    }
}
module.exports = { ordersPage }