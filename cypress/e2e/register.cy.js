describe('', () => {

    beforeEach('test', () => {
        cy.visit('http://localhost:8080/');
    })

    it('Register new user', () => {
        cy.get('#uname').type('User1');
        cy.get('#pass').type('Pass1');
        cy.get('#subBtn').click();

        cy.get('h1').should('be.visible');
        
    })

    it('', () => {
        cy.get('#uname').type('User1');
        cy.get('#pass').type('Pass1');
        cy.get('#subBtn').click();

        cy.get('h1').should('be.visible');
        
    })
})