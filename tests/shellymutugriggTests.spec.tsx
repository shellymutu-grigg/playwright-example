import { test } from '@playwright/test';
import { pageObjectManager } from '../pageObjects/shellymutugrigg/pageObjectManager';;
import { shellymutugriggUrl } from '../data/data'

test('Verify shellymutugrigg.com', async ({ page }) => {
    const pageObjects = new pageObjectManager(page);
    const landingPanel = pageObjects.getLandingPanel();
    const githubPanel = pageObjects.getGithubPanel();
    const linkedInPanel = pageObjects.getLinkedInPanel();
    const clientPanel = pageObjects.getClientPanel();
    const contactPanel = pageObjects.getContactPanel();

    await landingPanel.navigateToLandingPanel(shellymutugriggUrl, 'Shelly Mutu-Grigg');
    await landingPanel.pauseNavigation();
    await landingPanel.checkNavigationDot();
    await landingPanel.checkLandingPanelHeader('Shelly (Michelle) Mutu-Grigg');
    await landingPanel.checkLandingPanelSummary('A wāhine māori hailing from Ngāti Kahu');
    await landingPanel.checkNavigationArrows();

    await githubPanel.checkNavigationDot();
    await githubPanel.navigateToGithubPanel();
    await githubPanel.checkGithubPanelHeader('Github');
    await githubPanel.checkGithubLink('shellymutu-grigg');

    await linkedInPanel.checkNavigationDot();
    await linkedInPanel.navigateToLinkedInPanel();
    await linkedInPanel.checkLinkedInPanelHeader('LinkedIn');
    await linkedInPanel.checkLinkedInLink('shellymutu-grigg');

    await clientPanel.checkNavigationDot();
    await clientPanel.navigateToClientsPanel();
    await clientPanel.checkClientsPanelHeader('Previous Clients');
    await clientPanel.checkClientImage('./src/img/serko-logo.png');

    await contactPanel.checkNavigationDot();
    await contactPanel.navigateToContactPanel();
    await contactPanel.checkContactPanelHeader('shellymutugrigg@gmail.com');
    await contactPanel.checkEmailLink('shellymutugrigg@gmail.com');
    await contactPanel.checkPhoneNumber(' Call +64 (21) 655 808');
})