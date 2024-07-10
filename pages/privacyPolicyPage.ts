import {Locator, Page} from "@playwright/test";

export class PrivacyPolicyPage {
    readonly page: Page;
    readonly paragraph: Locator;
    readonly list: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paragraph = page.locator('.privacy-paragraph');
        this.list = page.locator('.privacy-list');
    }

    async getDetails() {
        console.log(await this.paragraph.nth(7).innerText());
        const items = this.list.nth(3).locator('.privacy-list-item');
        for(let i=0; i<await items.count(); i++) {
            console.log('- ' + await items.nth(i).innerText());
        }
    }
}