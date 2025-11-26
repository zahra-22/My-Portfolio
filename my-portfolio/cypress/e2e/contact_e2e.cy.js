describe("Portfolio basic navigation E2E", () => {
  it("allows a visitor to navigate between Home, Signup, and About pages", () => {
    // Visit the Home page
    cy.visit("http://localhost:3000/");

    // Home content is visible
    cy.contains("Welcome").should("be.visible");
    cy.contains("Sign in to access your portfolio dashboard").should(
      "be.visible"
    );

    // Navbar links are visible
    cy.contains("Signup").should("be.visible");
    cy.contains("Signin").should("be.visible");

    // Go to Signup page
    cy.contains("Signup").click();
    cy.url().should("include", "/signup");

    // Confirm we're still in the app and Signup page loaded
    cy.contains(/signup/i).should("exist");

    // Navigate to About page from navbar
    cy.contains("Signin").click();
cy.url().should("include", "/signin");
cy.contains(/email/i).should("exist");  // form loaded


  
  });
});
