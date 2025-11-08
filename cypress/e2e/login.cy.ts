describe('Login Form', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should successfully log in', () => {
    cy.get('[data-testid="username-input"]').type('TestingStuff');
    cy.get('[data-testid="password-input"]').type('TestingStuff');
    cy.get('[data-testid="auth-submit-button"]').click();
    cy.url().should('include', '/');
  });

  it('should show error toast for invalid credentials', () => {
    cy.get('[data-testid="username-input"]').type('WrongUser');
    cy.get('[data-testid="password-input"]').type('WrongPassword');
    cy.get('[data-testid="auth-submit-button"]').click();

    cy.get('[data-status="error"]').should(
      'contain.text',
      'Uživatel nebyl nalezen. Zkontrolujte prosím své přihlašovací údaje.'
    );
  });

  it('should toggle password visibility', () => {
    cy.get('[data-testid="password-input"]').type('randomPassword');
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'password');
    cy.get('[data-testid="input-icon-button"]').click();
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'text');
    cy.get('[data-testid="input-icon-button"]').click();
    cy.get('[data-testid="password-input"]').should('have.attr', 'type', 'password');
  });
});
