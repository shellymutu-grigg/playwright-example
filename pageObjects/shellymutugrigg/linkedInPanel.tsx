import type { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';

export class linkedInPanel{
    page: Page;
    linkedInHeader: Locator;
    linkedInLink: Locator;
    linkedInCarouselButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.linkedInHeader = this.page.locator('#linkedIn_header').first();
        this.linkedInLink = this.page.locator('#linkedin_link').first();
        this.linkedInCarouselButton = this.page.getByText('Go to panel 3');
    }

    async navigateToLinkedInPanel(): Promise<void>{
        await this.linkedInCarouselButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.linkedInHeader).toBeVisible();
    }

    async checkLinkedInPanelHeader(text: string): Promise<void>{
        await expect(this.linkedInHeader).toHaveText(text);
        await expect(this.linkedInHeader).toHaveClass('divider linkedin-divider');
    }

    async checkLinkedInLink(text: string): Promise<void>{
        await expect(this.linkedInLink).toHaveText(text);
        await expect(this.linkedInLink).toHaveAttribute('href', 'https://linkedin.com/in/shellymutu-grigg');
    }

    async checkNavigationDot(): Promise<void>{
        await expect(this.linkedInCarouselButton).toBeVisible();
    }
}