import type { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';

export class landingPage{
    page: Page;
    titleHeader: Locator;
    summary: Locator;
    pauseButton: Locator;
    resumeButton: Locator;
    titleCarouselButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.titleHeader = this.page.locator('#title_header').first();
        this.summary = this.page.locator('#summary');
        this.pauseButton = this.page.locator('#pause_button');
        this.resumeButton = this.page.locator('#resume_button');
        this. titleCarouselButton = this.page.getByRole('button').locator(':scope.slide-dot-test-id-1');
    }
}