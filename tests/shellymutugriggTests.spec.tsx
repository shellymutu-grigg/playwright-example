import { test } from '@playwright/test';
import { landingPanel } from '../pageObjects/shellymutugrigg/landingPanel';

test('Verify shellymutugrigg.com', async ({ page }) => {
    const titlePanel = new landingPanel(page);
    await titlePanel.navigateToLandingPage('Shelly Mutu-Grigg');
    await titlePanel.pauseNavigation();
    await titlePanel.checkTitlePanelHeader('Shelly (Michelle) Mutu-Grigg');
    await titlePanel.checkTitlePanelSummary('A wāhine māori hailing from Ngāti Kahu');
})