// https://docs.cypress.io/api/introduction/api.html

describe("Menu", () => {
  it("Menu title is present", () => {
    cy.visit("/");
    cy.contains("h1", "Calendar");
  });
});
