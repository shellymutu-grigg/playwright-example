import type { Page, Locator } from 'playwright-core';
import { expect } from '@playwright/test';

export class githubPanel{
    page: Page;
    githubHeader: Locator;
    githubLink: Locator;
    githubCarouselButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.githubHeader = this.page.locator('#github_header').first();
        this.githubLink = this.page.getByRole('link', { name: 'shellymutu-grigg' }).first();
        this.githubCarouselButton = this.page.getByText('Go to panel 2');
    }

    async navigateToGithubPanel(): Promise<void>{
        await this.githubCarouselButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.githubHeader).toBeVisible();
    }

    async checkGithubPanelHeader(text: string): Promise<void>{
        await expect(this.githubHeader).toHaveText(text);
        await expect(this.githubHeader).toHaveClass('divider github-divider');
    }

    async checkGithubLink(text: string): Promise<void>{
        await expect(this.githubLink).toHaveText(text);
        await expect(this.githubLink).toHaveAttribute('href', 'https://github.com/shellymutu-grigg');
    }

    async checkNavigationDot(): Promise<void>{
        await expect(this.githubCarouselButton).toBeVisible();
    }
}