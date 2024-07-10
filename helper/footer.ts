import {Locator, Page} from "@playwright/test";

export class Footer {
    readonly page: Page;
    readonly countryText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countryText = page.locator('.footer-info-country');
    }

    async checkCountry() {
        return await this.countryText.first().innerText();
    }
}