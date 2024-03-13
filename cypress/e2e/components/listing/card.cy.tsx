describe("Card", () => {
  it("should display confirmation modal when clicking in delete icon", () => {
    cy.visit("http://localhost:3000/");

    cy.get('button[title="Delete this Plan"]').first().click();

    cy.url().should("include", "?delete=");

    cy.get("section[role=dialog]").should("be.visible");
  });

  it("should navigate to print page when clicking in PDF icon", () => {
    cy.visit("http://localhost:3000/");
    cy.get('button[title="Print this Plan"]').first().click();

    cy.url().should("include", "/print");
  });
});
