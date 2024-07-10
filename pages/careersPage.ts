import {Locator, Page} from "@playwright/test";
import {LinkedInPage} from "./linkedinPage";

export class CareersPage {
    readonly page: Page;
    readonly viewOpenPositionsButton: Locator;
    readonly applyNowButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.viewOpenPositionsButton = page.locator('a[href="#jobs"]');
        this.applyNowButton = page.locator('.ops-apply-now-text');
    }

    async clickViewOpenPositions() {
        await this.viewOpenPositionsButton.click();
    }

    async clickApplyNow() {
        const pagePromise = this.page.context().waitForEvent('page');
        await this.applyNowButton.first().click();
        const newPage = await pagePromise;
        // return new LinkedInPage(newPage);
        return newPage;
    }
}