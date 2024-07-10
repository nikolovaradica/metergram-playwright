import {Locator, Page} from "@playwright/test";

export class LinkedInPage {
    readonly page: Page;
    readonly title: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.main-title');
    }

    getTitle() {
        return this.title;
    }
}