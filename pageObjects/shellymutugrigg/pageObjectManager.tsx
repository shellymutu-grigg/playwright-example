import type { Page } from 'playwright-core'
import { githubPanel } from './githubPanel';
import { landingPanel} from './landingPanel';
import { linkedInPanel } from './linkedInPanel';
import { clientsPanel } from './clientsPanel'

export class pageObjectManager{
    page: Page;
    githubPanel: githubPanel;
    landingPanel: landingPanel;
    linkedInPanel: linkedInPanel;
    clientPanel: clientsPanel;   

    constructor(page: Page){
        this.page = page;
        this.githubPanel = new githubPanel(this.page);
        this.landingPanel = new landingPanel(this.page);
        this.linkedInPanel = new linkedInPanel(this.page); 
        this.clientPanel = new clientsPanel(this.page)
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

    getClientPanel(){
        return this.clientPanel;
    }
}
module.exports = { pageObjectManager }