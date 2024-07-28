/// <reference types='cypress' />

describe('Bank app', () => {
  const user = 'Hermoine Granger';
  const accountNumber = '1001';
  const accountNumber2 = '1002';
  before(() => {
    cy.visit('/');
  });

  it('should provide the ability to work with Hermione\'s bank account', () => {
    cy.get('.borderM > :nth-child(1) > .btn').click();
    cy.get('#userSelect').select(user);
    cy.get('form.ng-valid > .btn').click();

    cy.contains('[ng-hide="noAccount"]', 'Account Number')
      .contains('strong', accountNumber)
      .should('be.visible');
    cy.contains('[ng-hide="noAccount"]', 'Balance')
      .contains('strong', '5096')
      .should('be.visible');
    cy.contains('.ng-binding', 'Dollar')
      .should('be.visible');

    cy.get('[ng-class="btnClass2"]').click();
    cy.get('.form-control').type('1000');
    cy.get('form.ng-dirty > .btn').click();
    cy.get('.error').should('contain', 'Deposit Successful');
    cy.contains('[ng-hide="noAccount"]', 'Balance')
      .contains('strong', '6096');
    cy.get('[ng-class="btnClass3"]').click();
    cy.contains('[type="submit"]', 'Withdraw')
      .should('be.visible');
    cy.get('[placeholder="amount"]').type('5096');
    cy.get('form.ng-dirty > .btn').click();

    cy.get('.error').should('contain', 'Transaction successful');
    cy.contains('[ng-hide="noAccount"]', 'Balance')
      .contains('strong', '1000')
      .should('be.visible');

    cy.get('[ng-click="transactions()"]').click();
    // cy.get('#anchor0 > :nth-child(1)').should('be.visible');
    cy.get('#start').type('2024-07-28T00:00');
    cy.get('#anchor0 > :nth-child(2)').should('contain', '1000');
    cy.get('#anchor0 > :nth-child(3)').should('contain', 'Credit');
    cy.get('#anchor1 > :nth-child(2)').should('contain', '5096');
    cy.get('#anchor1 > :nth-child(3)').should('contain', 'Debit');
    cy.get('.fixedTopBox > [style="float:left"]').click();
    cy.get('#accountSelect').select(accountNumber2);
    cy.get('[ng-click="transactions()"]').click();
    cy.get('[ng-click="reset()"]').should('not.be.visible');
    cy.get('.logout').click();
    cy.get('#userSelect').should('be.visible');
  });
});