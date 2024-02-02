import { test } from '@playwright/test';
import { githubPanel } from '../pageObjects/shellymutugrigg/githubPanel';
import { landingPanel } from '../pageObjects/shellymutugrigg/landingPanel';
import { shellymutugriggUrl } from '../data/data'

test('Verify shellymutugrigg.com', async ({ page }) => {
    const titlePanel = new landingPanel(page);
    const gitHubPanel = new githubPanel(page);

    await titlePanel.navigateToLandingPage(shellymutugriggUrl, 'Shelly Mutu-Grigg');
    await titlePanel.pauseNavigation();
    await titlePanel.checkTitlePanelHeader('Shelly (Michelle) Mutu-Grigg');
    await titlePanel.checkTitlePanelSummary('A wāhine māori hailing from Ngāti Kahu');
    await titlePanel.checkNavigationDot();
    await titlePanel.checkNavigationArrows();

    await gitHubPanel.checkNavigationDot();
    await gitHubPanel.navigateToGithubPanel();
    await gitHubPanel.checkGithubPanelHeader('Github');
    await gitHubPanel.checkGithubLink('shellymutu-grigg');
})