describe("Application Form Submission", () => {
  const programs = [
    "CASA Program",
    "High School Program",
    "Elementary Program",
    "Playgroup Program",
    "LGMS T.E.A.C.H. Program",
  ];

  const failedPrograms = [];
  programs.forEach((program) => {
    it("fills out and submits the application form", () => {
      // Intercept the API requests and mock the responses

      // Visit the page
      cy.visit("/courses/casa");

      // Fill parent's information
      cy.get("#parent\\.first_name").type("John");
      cy.get("#parent\\.middle_name").type("Quincy");
      cy.get("#parent\\.last_name").type("Public");
      cy.get("#parent\\.email").type("parent@example.com");
      cy.get("#parent\\.phone_number").type("1234567890");
      cy.get("#parent\\.street_address").type("123 Main St");
      cy.get("#parent\\.city").type("City");
      cy.get("#parent\\.state_province").type("State");
      cy.get("#parent\\.relationship").select("Father");
      cy.get("#parent\\.primary_contact_value").type("1234567890");
      cy.get("#parent\\.primary_contact_type").select("Phone");
      cy.get("#parent\\.secondary_contact_value").type("parent@example.com");
      cy.get("#parent\\.secondary_contact_type").select("Email");
      cy.get("#parent\\.contact_priority").select("Primary");
      // Click the "Next" button to proceed to applicant's information
      cy.get("button").contains("Next").click();

      // Fill applicant's information
      cy.get("#applicant\\.first_name").type("Jane");
      cy.get("#applicant\\.middle_name").type("Doe");
      cy.get("#applicant\\.last_name").type("Public");
      cy.get("#applicant\\.gender").select("Female");
      cy.get("#applicant\\.age").type("5");
      cy.get("#birthMonth").select("5");
      cy.get("#birthDay").type("16"); // Changed from select to type

      // Verify the birthday
      cy.get("#applicant\\.birthday")
        .invoke("val")
        .then((actualBirthday) => {
          const currentYear = new Date().getFullYear();
          const expectedYear = currentYear - 5;
          const expectedBirthday = `${expectedYear}-05-16`;
          expect(actualBirthday).to.equal(expectedBirthday);
        });

      // Select program option
      // Verify that program options are loaded
      try {
        cy.get("#applicant\\.program_option")
          .should("exist")
          .then(($select) => {
            // Ensure the select has the correct options
            const options = $select
              .find("option")
              .map((i, el) => Cypress.$(el).text())
              .get();
            cy.log("Options:", options);

            // Select program option
            cy.get("#applicant\\.program_option").select(program);
          });
      } catch (error) {
        failedPrograms.push(program);
        throw error;
      }
      cy.get("#studentEmail").type("applicant@example.com");
      cy.get("#studentPhoneNumber").type("9876543210");

      // Click the "Next" button to proceed to the confirmation step
      cy.get("button").contains("Next").click();

      // Log the HTML content before asserting
      cy.get("body").then(($body) => {
        cy.log("Page HTML before assertion:", $body.html());
      });

      // Add a wait to ensure the page loads the confirmation details

      // Assert the confirmation details

      // Click the "Submit" button on the confirmation step
      //cy.get("button").contains("Submit").click();

      // Check for the success modal and verify its contents
      //cy.get(".success-modal").should("be.visible");
      cy.contains("Application Submitted").should("be.visible");
      cy.contains("Thank you for submitting your application!").should(
        "be.visible"
      );

      // Click the "Close" button on the success modal
      cy.get("button").contains("Close").click();

      // Optionally check that the modal has closed
      cy.get(".success-modal").should("not.exist");

      // Make a request to the email_test_view endpoint
      cy.request("http://localhost:8025/api/v2/messages").then((response) => {
        expect(response.status).to.equal(200);

        // Find emails
        const applicantEmail = response.body.items.find((email) =>
          email.Content.Headers.Subject.includes("Application Submitted")
        );
        const adminEmail = response.body.items.find((email) =>
          email.Content.Headers.Subject.includes("New Application Submitted")
        );

        // Assert the email details for the applicant
        expect(applicantEmail.Content.Headers.Subject[0]).to.include(
          "Application Submitted"
        );
        expect(applicantEmail.Content.Body).to.include("Dear John Public");
        expect(applicantEmail.Content.Body).to.include(
          "Thank you for submitting the application for Jane Public"
        );
        expect(applicantEmail.Content.Headers.From[0]).to.include(
          "test@example.com"
        );
        expect(applicantEmail.Content.Headers.To[0]).to.equal(
          "applicant@example.com"
        );

        // Assert the email details for the admin
        expect(adminEmail.Content.Headers.Subject[0]).to.include(
          "New Application Submitted"
        );
        expect(adminEmail.Content.Body).to.include(
          "A new application has been submitted by John Public"
        );
        expect(adminEmail.Content.Body).to.include("for Jane Public");
        expect(adminEmail.Content.Headers.From[0]).to.include(
          "test@example.com"
        );
        expect(adminEmail.Content.Headers.To[0]).to.equal(
          "lgmsmontessori@gmail.com"
        );
      });
    });
  });
});
