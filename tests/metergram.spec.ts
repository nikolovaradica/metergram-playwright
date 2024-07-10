import {expect, Page, test} from "@playwright/test";
import {Homepage} from "../pages/homePage";
import {ContactUsPage} from "../pages/contactUsPage";
import {EventsPage} from "../pages/eventsPage";
import {CareersPage} from "../pages/careersPage";
import {PrivacyPolicyPage} from "../pages/privacyPolicyPage";
import {Footer} from "../helper/footer";

const testData = [
    {
        name: 'John Doe',
        email: 'john.doe@example.com',
        companyName: 'Example Corp',
        message: 'Hello, I would like to inquire about your services.'
    },
    {
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        companyName: 'Tech Innovations',
        message: 'Could you provide more information about your product offerings?'
    },
    {
        name: 'Alex Johnson',
        email: 'alex.johnson@business.org',
        companyName: 'Business Solutions',
        message: 'I am interested in a partnership opportunity.'
    }
];

test.beforeEach(async ({page}) => {
    await page.goto(process.env.baseURL);
    await expect(page).toHaveURL(process.env.baseURL);
});

//TODO check validation again
test.afterEach(async ({page}) => {
    const footer = new Footer(page);
    expect(await footer.checkCountry()).toBe('United States');
});

testData.forEach((data, index) => {
    test(`Test Case 1.${index+1}`, async ({page}) => {
        const homePage = new Homepage(page);
        await homePage.clickContactUs();
        await expect(page).toHaveTitle('Contact us');
        const contactUsPage = new ContactUsPage(page);
        await contactUsPage.fillForm(data.name, data.email, data.companyName, data.message);
        page.once('dialog', dialog => {
            expect(dialog.message()).toBe('Please confirm you\'re not a robot.');
            dialog.dismiss();
        });
    });
});

test('Test Case 2', async({page}) => {
    const homePage = new Homepage(page);
    await homePage.clickEvents();
    await expect(page).toHaveTitle('Events');
    const eventsPage = new EventsPage(page);
    await eventsPage.clickPastEvents();
    await eventsPage.getAllEvents();
});

test('Test Case 3', async ({page}) => {
    const homePage = new Homepage(page);
    await homePage.clickCareers();
    await expect(page).toHaveTitle('Careers');
    const careersPage = new CareersPage(page);
    await careersPage.clickViewOpenPositions();
    const newPage = await careersPage.clickApplyNow();
    await expect(newPage).toHaveURL(/linkedin.com/);
    await expect(newPage.locator('.main-title')).toHaveText('We couldn’t find a match for Metergram jobs in North Macedonia');
    // const linkedInPage = await careersPage.clickApplyNow();
    // await expect(linkedInPage.page).toHaveURL(/linkedin.com/);
    // await expect(linkedInPage.getTitle()).toHaveText('We couldn’t find a match for Metergram jobs in North Macedonia');
});

test('Test Case 4', async ({page}) => {
    const homePage = new Homepage(page);
    await homePage.clickPrivacyPolicy();
    await expect(page).toHaveTitle('Privacy Policy');
    const privacyPolicyPage = new PrivacyPolicyPage(page);
    await privacyPolicyPage.getDetails();
});