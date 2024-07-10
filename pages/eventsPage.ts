import {Locator, Page} from "@playwright/test";

export class EventsPage {
    readonly page: Page;
    readonly pastEventsButton: Locator;
    readonly nextPageButton: Locator;
    readonly nextPageButtonDisabled: Locator;
    readonly eventContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pastEventsButton = page.locator('.events-tab-link-text');
        this.nextPageButton = page.getByLabel('Next Page');
        this.nextPageButtonDisabled = page.locator('#next-page-btn-disabled-past');
        this.eventContainer = page.locator('.events-card-right-panel');
    }

    async clickPastEvents() {
        await this.pastEventsButton.nth(1).click();
    }

    async getEventsFromPage() {
        const numEvents = await this.eventContainer.count();
        for(let i=2; i<numEvents; i++) {
            const event = this.eventContainer.nth(i);
            const dateLocator = event.locator('.events-card-date-container');
            const date = await dateLocator.innerText();
            const locationLocator = event.locator('.events-card-location');
            const location = await locationLocator.innerText();
            const nameLocator = event.locator('.events-card-title');
            const name = await nameLocator.innerText();
            const descriptionLocator = event.locator('.events-card-description');
            const description = await descriptionLocator.innerText();

            console.log('Date: ' + date.trim().replace(/(\r\n|\n|\r)/gm, ""));
            console.log('Location: ' + location.trim());
            console.log('Name: ' + name.trim());
            console.log('Description: ' + description.trim());
        }
    }

    async getAllEvents() {
        while(true) {
            await this.getEventsFromPage();
            if(await this.nextPageButton.isVisible({timeout: 30000}) && !await this.nextPageButtonDisabled.isVisible({timeout: 30000})) {
                await this.nextPageButton.click();
            } else break;
        }
    }
}