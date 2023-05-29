import { describe } from "mocha";
import { TestData } from "../fixtures/components/testData";
import { userlaneUrl } from "../fixtures/components/testData";

const testData = new TestData

describe('Apply for a job as Automation Test Engineer', { includeShadowDom: true }, () => {
  it('should navigate to application form', () => {
    cy.visit(userlaneUrl);
    // yes, I realize,that hardcoded "wait" is not the best solution. It is temporary, just to avoid failing test
    cy.wait(1000);
    testData.elements.acceptAllButton().click({ force: true });
    testData.elements.closePopup().click({ force: true });

    testData.elements.jobOffer().parent().next().contains("View job").click({force: true});

    cy.origin('https://jobs.lever.co', () => { cy.get('[data-qa=show-page-apply]').click(); })

    // At the begining I have used this hardcoded cy.origin() construction but I decided to use another it() 

    // cy.origin(jobsLeverUrl, () => {
    //   cy.get("div.self-end > button.cc-dismiss").click();
    //   cy.get('[data-qa=show-page-apply]').click();

    //   // I added here a fictional person with his data

    //   // cy.get('[data-qa=input-resume]').selectFile("Robert Cooper CV.pdf", {
    //   //   action: 'drag-drop'
    //   // })

    //   // cy.fixture('Robert Cooper CV.pdf').then(fileContent => { cy.get('[data-qa=input-resume]').attachFile({ fileContent, fileName: 'Robert Cooper CV.pdf' }) })

    //   cy.get('input[name=name]').type("Robert Cooper");
    //   cy.get('input[name=email]').type("robertcooper@yahoo.com");
    //   cy.get('input[name=phone]').type("533654652");
    //   cy.get('input[name=org]').type("E-bay");

    //   cy.get('div.application-label').contains("LinkedIn").type("https://www.linkedin.com");
    //   cy.get('div.application-label').contains("Twitter").type("https://www.twitter.com");
    //   cy.get('div.application-label').contains("GitHub").type("https://github.com");
    //   cy.get('div.application-label').contains("Portfolio").type("https://www.mypage.com");
    //   cy.get('div.application-label').contains("Other").type("https://www.howtotest.com");

    //   cy.get('input[placeholder="Type your response"]').type("20400");

    //   cy.get('div.application-additional>textarea[name=comments]').type("I cannot wait to join you!");

    //   cy.get('input[type=checkbox]').click();

    //   cy.get('[data-qa=btn-submit]').click();
    // })
  });

  // I added here a fictional person with his data
  it('should fill the form', () => {
    cy.visit("https://jobs.lever.co/userlane/9ff78ee1-9eb2-4cad-b7da-76757cd3c122/apply");
    cy.intercept("https://hcaptcha.com/getcaptcha/e33f87f8-88ec-4e1a-9a13-df9bbb1d8120").as('dataSentConfirmation')
    cy.get("div.content").should("contain", "Automation Test Engineer")
    testData.elements.dismissButton().click();
    testData.fillForm()

    testData.elements.salaryInput().type(testData.personalData.salary);
    testData.elements.commentsTextarea().type(testData.personalData.comment);

    testData.elements.checkboxInput().click();
    testData.elements.submitButton().click();
    cy.wait('@dataSentConfirmation').its('response.statusCode').should('eq', 200)
  })
});