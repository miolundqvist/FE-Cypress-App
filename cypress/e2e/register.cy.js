describe('Tests for user registration', () => {

    beforeEach('test', () => {
        cy.visit('http://localhost:8080/');
    })

   /* it('Log in as user that does not exist', () => {
        cy.get('#uname').type('Testuser');
        cy.get('#pass').type('Testpass');
        cy.get('#subBtn').click();

        cy.get('h1').should('be.visible');
        cy.get('h1').should('contain.text', 'Failed')
    }) */

    it('Create new account', () => {
        cy.get('#createAccBtn').click();
        cy.get('h1').should('contain.text', 'account')
        cy.get('#uname').type('Testuser');
        cy.get('#pass').type('Testpass');
        cy.get('#regBtn').click();
        
        cy.get('#uname').type('Testuser');
        cy.get('#pass').type('Testpass');
        cy.get('#subBtn').click();

        cy.get('h1').should('be.visible');
        cy.get('h1').should('contain.text', 'profile')
        
    })

    it('Change user password', () => {
        cy.get('#uname').type('Testuser');
        cy.get('#pass').type('Testpass');
        cy.get('#subBtn').click();
        cy.wait(500);
        cy.get('#changePassBtn').click();
        cy.get('#uname').type('Testuser');
        cy.get('#pass').type('Newpass');
        cy.get('#changePassBtn').click();

        // Log in with the changed password
        cy.get('#uname').type('Testuser');
        cy.get('#pass').type('Newpass');
        cy.get('#subBtn').click();

        cy.get('h1').should('be.visible');
        cy.get('h1').should('contain.text', 'profile')

    })

    it ('Remove user', () => {

        // Removes user "Testuser"
        cy.request('POST', 'http://localhost:8080/register/remove', { username: 'Testuser' });

        cy.get('#uname').type('Testuser');
        cy.get('#pass').type('Testpass');
        cy.get('#subBtn').click();

        cy.get('h1').should('be.visible');
        cy.get('h1').should('contain.text', 'Failed')
    })
})