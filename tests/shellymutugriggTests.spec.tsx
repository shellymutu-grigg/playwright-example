import { test } from '@playwright/test';
import { pageObjectManager } from '../pageObjects/shellymutugrigg/pageObjectManager';;
import { shellymutugriggUrl } from '../data/data'

test('Verify shellymutugrigg.com', async ({ page }) => {
    const pageObjects = new pageObjectManager(page);
    const landingPanel = pageObjects.getLandingPanel();
    const githubPanel = pageObjects.getGithubPanel();
    const linkedInPanel = pageObjects.getLinkedInPanel();

    await landingPanel.navigateToLandingPage(shellymutugriggUrl, 'Shelly Mutu-Grigg');
    await landingPanel.pauseNavigation();
    await landingPanel.checkTitlePanelHeader('Shelly (Michelle) Mutu-Grigg');
    await landingPanel.checkTitlePanelSummary('A wāhine māori hailing from Ngāti Kahu');
    await landingPanel.checkNavigationDot();
    await landingPanel.checkNavigationArrows();

    await githubPanel.checkNavigationDot();
    await githubPanel.navigateToGithubPanel();
    await githubPanel.checkGithubPanelHeader('Github');
    await githubPanel.checkGithubLink('shellymutu-grigg');

    await linkedInPanel.checkNavigationDot();
    await linkedInPanel.navigateToGithubPanel();
    await linkedInPanel.checkLinkedInPanelHeader('LinkedIn');
    await linkedInPanel.checkLinkedInLink('shellymutu-grigg');
})