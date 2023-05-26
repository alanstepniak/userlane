export const userlaneUrl = "https://www.userlane.com/about/careers/";
export const jobsLeverUrl = "https://jobs.lever.co";
export const linkedInUrl = "https://www.linkedin.com";
export const twitterUrl = "https://www.twitter.com";
export const gitHubUrl = "https://github.com";
export const portfolioUrl = "https://www.mypage.com";
export const otherUrl = "https://www.howtotest.com";

export class TestData {
    elements = {
        // I have tried to use best selectors I could to provide possibly most reliable tests. I usually use data-testid attribute to accomplish that.  
        acceptAllButton: () => cy.get('[data-testid=uc-accept-all-button]'),
        closePopup: () => cy.get('[aria-label=Close]').contains("X"),
        jobOffer: () => cy.get('div.row.gutters-12 .item-info').contains("Automation Test Engineer"),
        dismissButton: () => cy.get("div.self-end > button.cc-dismiss"),
        applyButton: () => cy.get('[data-qa=show-page-apply]'),

        nameInput: () => cy.get('input[name=name]'),
        emailInput: () => cy.get('input[name=email]'),
        phoneInput: () => cy.get('input[name=phone]'),
        orgInput: () => cy.get('input[name=org]'),

        linkedInInput: () => cy.get('div.application-label').contains("LinkedIn"),
        twitterInput: () => cy.get('div.application-label').contains("Twitter"),
        gitHubInput: () => cy.get('div.application-label').contains("GitHub"),
        portfolioInput: () => cy.get('div.application-label').contains("Portfolio"),
        otherInput: () => cy.get('div.application-label').contains("Other"),

        salaryInput: () => cy.get('input[placeholder="Type your response"]'),
        commentsTextarea: () => cy.get('div.application-additional>textarea[name=comments]'),
        checkboxInput: () => cy.get('input[type=checkbox]'),
        submitButton: () => cy.get('[data-qa=btn-submit]'),
    }

    personalData = {
        name: "Robert Cooper",
        email: "robertcooper@yahoo.com",
        phone: "533654652",
        org: "E-bay",
        salary: "20400",
        comment: "I cannot wait to join you!"
    }

    fillForm() {
        this.fillBasicInformation();
        this.fillLinksUrls();
    }

    fillBasicInformation() {
        // I have some difficulties to make this work, cypress do not accept none of the paths to file I was checking. It requires more work with custom plugin

        // cy.get('[data-qa=input-resume]').selectFile("Robert Cooper CV.pdf", {
        //   action: 'drag-drop'
        // })

        // cy.fixture('Robert Cooper CV.pdf').then(fileContent => { cy.get('[data-qa=input-resume]').attachFile({ fileContent, fileName: 'Robert Cooper CV.pdf' }) })

        this.elements.nameInput().type(this.personalData.name);
        this.elements.emailInput().type(this.personalData.email);
        this.elements.phoneInput().type(this.personalData.phone);
        this.elements.orgInput().type(this.personalData.org);
    }

    fillLinksUrls() {
        this.elements.linkedInInput().type(linkedInUrl);
        this.elements.twitterInput().type(twitterUrl);
        this.elements.gitHubInput().type(gitHubUrl);
        this.elements.portfolioInput().type(portfolioUrl);
        this.elements.otherInput().type(otherUrl);
    }
}