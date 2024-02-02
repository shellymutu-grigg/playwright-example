import type { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';

export class clientsPanel{
    page: Page;
    clientsHeader: Locator;
    clientImg: Locator;
    clientsCarouselButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.clientsHeader = this.page.locator('#clients_header').first();
        this.clientImg = this.page.getByAltText('Serko NZ').first();
        this.clientsCarouselButton = this.page.getByText('Go to panel 4');
    }

    async navigateToClientsPanel(): Promise<void>{
        await this.clientsCarouselButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.clientsHeader).toBeVisible();
    }

    async checkClientsPanelHeader(text: string): Promise<void>{
        await expect(this.clientsHeader).toHaveText(text);
        await expect(this.clientsHeader).toHaveClass('divider clients-divider');
    }

    async checkClientImage(text: string): Promise<void>{
        await expect(this.clientImg).toHaveAttribute('src', text);
    }

    async checkNavigationDot(): Promise<void>{
        await expect(this.clientsCarouselButton).toBeVisible();
    }
}