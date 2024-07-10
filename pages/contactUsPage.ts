import {Locator, Page} from "@playwright/test";

export class ContactUsPage {
    readonly page: Page;
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly companyNameField: Locator;
    readonly messageField: Locator;
    readonly getInTouchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nameField = page.locator('#Your-name');
        this.emailField = page.locator('#Email');
        this.companyNameField = page.locator('#Company-Name');
        this.messageField = page.locator('#message');
        this.getInTouchButton = page.locator('#get-in-touch-contact');
    }

    async fillNameField(name: string) {
        await this.nameField.fill(name);
    }

    async fillEmailField(email: string) {
        await this.emailField.fill(email);
    }

    async fillCompanyNameField(companyName: string) {
        await this.companyNameField.fill(companyName);
    }

    async fillMessageField(message: string) {
        await this.messageField.fill(message);
    }

    async fillForm(name: string, email: string, companyName: string, message: string) {
        await this.fillNameField(name);
        await this.fillEmailField(email);
        await this.fillCompanyNameField(companyName);
        await this.fillMessageField(message);
        await this.submitForm();
    }

    async submitForm() {
        await this.getInTouchButton.click();
    }
}