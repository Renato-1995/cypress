import assert from "assert"; //usar o node para validação

class RegisterForm { // Criar a classe para interagir com todos os elementos do navegador (baseado nos seus id's)
  elements = {
    titleInput: () => cy.get("#title"),
    titleFeedback: () => cy.get("#titleFeedback"),
    urlInput: () => cy.get("#url"),
    urlFeedback: () => cy.get("#urlFeedback"),
    submitBtn: () => cy.get("#btnSubmit"),
  };

  typeTitle(text) {
    if (!text) return;
    this.elements.titleInput().type(text);
  }
  typeUrl(text) {
    if (!text) return;
    this.elements.urlInput().type(text);
  }
  clickSubmit() {
    this.elements.submitBtn().click();
  }
}

const registerForm = new RegisterForm();
const colors={
  errors:'rgb(220, 53, 69)'
  //sucess:'' ==> completar com a cor do verde
}

describe("Image Registration", () => {
  describe("Submitting an image with invalid inputs", () => {
    after(() => {
      cy.clearLocalStorage(); //limpar o localStorage dos testes anteriores
    })
    const input = {
      title: "",
      url: "",
    };

    it("Given I am on the image registration page", () => {
      cy.visit("/"); // Navega até a página definida em baseURL
    });

    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.typeTitle(input.title);
    });

    it(`And I enter "${input.url}" in the URL field`, () => {
      registerForm.typeUrl(input.url);
    });

    it("Then I click the submit button", () => {
      registerForm.clickSubmit();
    });

    it('Then I should see "Please type a title for the image" message above the title field', () => {
      registerForm.elements.titleFeedback().should('contains.text', 'Please type a title for the image');
    });

    it('And I should see "Please type a valid URL" message above the imageUrl field', () => {
      registerForm.elements.urlFeedback().should('contains.text', 'Please type a valid URL');
    });

    it('And I should see an exclamation icon in the title and URL fields', () => {
      registerForm.elements.titleInput().should(([element]) => {
        const styles=window.getComputedStyle(element)
        const border=styles.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.errors)
      })
    });
  });
});
