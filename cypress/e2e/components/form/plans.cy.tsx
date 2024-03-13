describe("Form", () => {
  it("should display the form to create new plan", () => {
    cy.visit("http://localhost:3000/");

    // Click the new plan button
    cy.get('button[title="Create a New Holiday Plan"]').click();

    cy.url().should("include", "/new-plan");

    cy.get('form[id="create-plan"]');
  });

  it("should display error messages when trying to submit with no data", () => {
    cy.visit("http://localhost:3000/");
    cy.get('button[title="Create a New Holiday Plan"]').click();
    cy.url().should("include", "/new-plan");
    cy.get('button[type="submit"]').click();
    cy.get('span[title="The title must be longer than 3 characters"');
  });

  it("should navigate back to Home when form submits", () => {
    cy.visit("http://localhost:3000/");
    cy.get('button[title="Create a New Holiday Plan"]').click();
    cy.url().should("include", "/new-plan");

    cy.get('input[name="title"]').type("Test title");
    cy.get('textarea[name="description"]').type("Test description");
    cy.get('input[name="location"]').type("Test location");
    cy.get('input[name="participants"]').type("Test participants");
    cy.get('input[name="startDate"]').type("2100-01-01");
    cy.get('input[name="endDate"]').type("2100-01-02");

    cy.intercept("http://localhost:3000/api/create-new-plan", {
      statusCode: 201,
    });

    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/new-plan");
  });
});
