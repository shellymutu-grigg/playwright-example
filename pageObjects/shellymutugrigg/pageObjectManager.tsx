import type { Page } from 'playwright-core'
import { githubPanel } from './githubPanel';
import { landingPanel} from './landingPanel';
import { linkedInPanel } from './linkedInPanel';

export class pageObjectManager{
    page: Page;
    githubPanel: githubPanel;
    landingPanel: landingPanel;
    linkedInPanel: linkedInPanel;   

    constructor(page: Page){
        this.page = page;
        this.githubPanel = new githubPanel(this.page);
        this.landingPanel = new landingPanel(this.page);
        this.linkedInPanel = new linkedInPanel(this.page); 
    }

    getGithubPanel(){
        return this.githubPanel;
    }

    getLandingPanel(){
        return this.landingPanel;
    }

    getLinkedInPanel(){
        return this.linkedInPanel;
    }
}
module.exports = { pageObjectManager }