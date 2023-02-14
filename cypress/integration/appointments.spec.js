describe("Appointment", () => {

  // This built-in function runs before each it function test below
  beforeEach(() => {
    
    // Reset the database everytime we run as this test modifies the state
    cy.request("GET", "/api/debug/reset");

    // Start by visiting the root
    cy.visit("/");

    // Ensure data has loaded
    cy.contains("Monday")
   });


  it("should book an interview", () => {

    // Find the first Add button in the DOM and click it
    cy.get("[alt=Add]")
      .first()
      .click();

    // Get the form and type in the name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    // Find the interviewer and click it
    cy.get("[alt='Sylvia Palmer']")
      .click();
    
    // Find the save button and click it
    cy.contains("Save")
      .click();

    // Ensure that the SHOW visual state contains the student and interviewer names
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {

    // Find the first Edit button in the DOM and click it. Force will ignore the hover state and click anyways.
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    // Get the form, clear it, then type a new name
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller");

    // Find the NEW interviewer and click it
    cy.get("[alt='Tori Malcolm']")
      .click();
    
    // Find the save button and click it
    cy.contains("Save")
      .click();

    // Ensure that the SHOW visual state contains the student and interviewer names
    cy.contains(".appointment__card--show", "Lydia Miller");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {

    // Force a click on the delete button (override the hover state)
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });

    // Click the button on the confirm cancel state
    cy.contains("button", "Confirm")
      .click();
    
    // Confirm that the deleting status state appears, then goes away
    cy.contains("Deleting...")
      .should("exist");
    
    cy.contains("Deleting...")
      .should("not.exist");

    // Confirm that the original student name isn't appearing anymore
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  
  });
});