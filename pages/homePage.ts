import {expect, Locator, Page} from "@playwright/test";

export class Homepage {
    readonly page: Page;
    readonly contactUsLink: Locator;
    readonly eventsLink: Locator;
    readonly careersLink: Locator;
    readonly privacyPolicyLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contactUsLink = page.locator('a[href="/contact"]');
        this.eventsLink = page.locator('a[href="/events"]');
        this.careersLink = page.locator('a[href="/careers"]');
        this.privacyPolicyLink = page.locator('a[href="/privacy"]');
    }

    async clickContactUs() {
        await this.contactUsLink.first().click();
    }

    async clickEvents() {
        await this.eventsLink.first().click();
    }

    async clickCareers() {
        await this.careersLink.first().click();
    }

    async clickPrivacyPolicy() {
        await this.privacyPolicyLink.scrollIntoViewIfNeeded();
        await this.privacyPolicyLink.click();
    }
}