import type { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';

export class contactPanel{
    page: Page;
    contactHeader: Locator;
    emailLink: Locator;
    phone: Locator;
    contactCarouselButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.contactHeader = this.page.locator('#contact_header').first();
        this.emailLink = this.page.getByRole('link', { name: 'shellymutugrigg@gmail.com' }).first();
        this.phone = this.page.locator('#phone').first();
        this.contactCarouselButton = this.page.getByText('Go to panel 5');
    }

    async navigateToContactPanel(): Promise<void>{
        await this.contactCarouselButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.contactHeader).toBeVisible();
    }

    async checkContactPanelHeader(text: string): Promise<void>{
        await expect(this.contactHeader).toHaveText(text);
        await expect(this.contactHeader).toHaveClass('divider contact-divider');
    }

    async checkEmailLink(text: string): Promise<void>{
        await expect(this.emailLink).toHaveText(text);
        await expect(this.emailLink).toHaveAttribute('href', 'mailto:shellymutugrigg@gmail.com');
    }

    async checkPhoneNumber(text: string): Promise<void>{
        await expect(this.phone).toHaveText(text);
        await expect(this.phone).toHaveAttribute('href', 'tel:+6421655808');
    }

    async checkNavigationDot(): Promise<void>{
        await expect(this.contactCarouselButton).toBeVisible();
    }
}