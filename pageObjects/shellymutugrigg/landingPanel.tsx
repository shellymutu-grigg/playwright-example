import type { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';

export class landingPanel{
    page: Page;
    titleHeader: Locator;
    summary: Locator;
    pauseButton: Locator;
    resumeButton: Locator;
    titleCarouselButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.titleHeader = this.page.locator('#title_header').first();
        this.summary = this.page.locator('#summary').first();
        this.pauseButton = this.page.locator('#pause_button');
        this.resumeButton = this.page.locator('#resume_button');
        this. titleCarouselButton = this.page.getByRole('button').locator(':scope.slide-dot-test-id-1');
    }

    async navigateToLandingPage(title: string): Promise<void>{
        await this.page.goto("file:///Users/shellymutu-grigg/development/websites/shellymutugrigg.com/index.html");
        console.log('Page title: ', await this.page.title());
        await expect(this.page).toHaveTitle(title);
    }

    async pauseNavigation(): Promise<void>{
        await this.pauseButton.click();
    }

    async checkTitlePanelHeader(text: string): Promise<void>{
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.titleHeader).toHaveText(text);
        await expect(this.titleHeader).toHaveClass('divider name-divider');
    }

    async checkTitlePanelSummary(text: string): Promise<void>{
        await expect(this.summary).toContainText(text);
        await expect(this.summary).toHaveClass('description');
    }
}