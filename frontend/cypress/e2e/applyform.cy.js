describe("Application Form Submission", () => {
  it("fills out and submits the application form", () => {
    // Visit the page
    console.log("Base URL:", Cypress.env("baseUrl")); // Check what this outputs
    cy.visit("/courses/casa");

    // Fill parent's information
    cy.get("[data-cy=parentFirstName]").type("John");
    cy.get("[data-cy=parentMiddleName]").type("Quincy");
    cy.get("[data-cy=parentLastName]").type("Public");
    cy.get("[data-cy=parentEmail]").type("parent@example.com");
    cy.get("[data-cy=parentHouseNumber]").type("123");
    cy.get("[data-cy=parentBarangay]").type("Barangay 123");
    cy.get("[data-cy=parentCity]").type("City");
    cy.get("[data-cy=parentState]").type("State");
    cy.get("[data-cy=parentPostalCode]").type("12345");
    cy.get("[data-cy=parentRelationship]").type("Father");
    cy.get("[data-cy=parentPrimaryContact]").type("1");
    cy.get("[data-cy=parentSecondaryContact]").type("9876543210");

    // Fill applicant's information
    cy.get("[data-cy=applicantFirstName]").type("Jane");
    cy.get("[data-cy=applicantMiddleName]").type("Doe");
    cy.get("[data-cy=applicantLastName]").type("Public");
    cy.get("[data-cy=applicantGender]").select("Female");
    cy.get("[data-cy=applicantAge]").type("5");
    cy.get("[data-cy=applicantBirthday]").type("2018-05-16");
    cy.get("[data-cy=programOption]").then(($field) => {
      if ($field.is("select")) {
        cy.wrap($field).select("CASA");
      } else {
        cy.wrap($field).should("have.value", "CASA");
      }
    });

    // Checkboxes for phone and address
    cy.get("[data-cy=sameAsParentsPhone]").check();
    cy.get("[data-cy=sameAsParentsAddress]").check();

    // Submit the initial form
    cy.get("[data-cy=submitFormButton]").click();
    cy.wait(2000);

    // Assert the modal content

    // Assume redirection to the confirmation page
    cy.url().should("eq", "http://localhost:3001/confirm");

    cy.get('[data-cy="finalSubmitButton"]').click();
    // Check details on the confirmation page
    cy.contains("Parent's Name: John").should("be.visible");
    cy.contains("Applicant Full Name: Jane Public").should("be.visible");

    // Assuming reCAPTCHA is bypassed or mocked in test environment
    // Here you would trigger any necessary mocks or directly simulate captcha solving

    // Final submission on the confirmation form
    cy.get("button").contains("Submit").click();

    // Check for the success modal and verify its contents
    cy.contains("Application Submitted").should("be.visible");
    cy.contains("Thank you for submitting your application!").should(
      "be.visible"
    );
    cy.get("button").contains("Close").click();

    // Optionally check that the modal has closed
    cy.get("[data-cy=successModal]").should("not.exist");
    cy.get(".success-modal").should("be.visible");
  });
});
