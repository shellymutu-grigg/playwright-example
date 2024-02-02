import type { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';

export class landingPanel{
    page: Page;
    titleHeader: Locator;
    summary: Locator;
    nextButton: Locator;
    previousButton: Locator;
    pauseButton: Locator;
    resumeButton: Locator;
    titleCarouselButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.titleHeader = this.page.locator('#title_header').first();
        this.summary = this.page.locator('#summary').first();
        this.nextButton = this.page.locator('#next_button');
        this.previousButton = this.page.locator('#previous_button');
        this.pauseButton = this.page.locator('#pause_button');
        this.resumeButton = this.page.locator('#resume_button');
        this.titleCarouselButton = this.page.getByText('Go to panel 1');
    }

    async navigateToLandingPanel(url: string, title: string): Promise<void>{
        await this.page.goto(url);
        console.log('Page title: ', await this.page.title());
        await expect(this.page).toHaveTitle(title);
    }

    async pauseNavigation(): Promise<void>{
        await expect(this.pauseButton).toBeVisible();
        await this.pauseButton.click();
        await expect(this.resumeButton).toBeVisible();
    }

    async checkLandingPanelHeader(text: string): Promise<void>{
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.titleHeader).toHaveText(text);
        await expect(this.titleHeader).toHaveClass('divider name-divider');
    }

    async checkLandingPanelSummary(text: string): Promise<void>{
        await expect(this.summary).toContainText(text);
        await expect(this.summary).toHaveClass('description');
    }

    async checkNavigationDot(): Promise<void>{
        await expect(this.titleCarouselButton).toBeVisible();
    }

    async checkNavigationArrows(): Promise<void>{
        await expect(this.nextButton).toBeVisible();
        await expect(this.nextButton).toHaveClass('next-button is-control');
        await expect(this.previousButton).toBeVisible();
        await expect(this.previousButton).toHaveClass('previous-button is-control');
    }
}