describe('', () => {

    beforeEach('test', () => {
        cy.visit('http://localhost:8080/');
    })

    it('Succesful log in', () => {
        cy.get('#uname').type('User1');
        cy.get('#pass').type('Pass1');
        cy.get('#subBtn').click();

        cy.get('h1').should('be.visible');
        cy.get('h1').should('contain.text', 'profile')
    })

    it('Failed log in', () => {
        cy.get('#uname').type('wronguser');
        cy.get('#pass').type('wrongpass');
        cy.get('#subBtn').click();

        cy.get('h1').should('be.visible');
        cy.get('h1').should('contain.text', 'Failed')
    })
  

    it('Empty input fields', () => {
        cy.get('#uname').type(' ');
        cy.get('#pass').type(' ');
        cy.get('#subBtn').click();   

        cy.get('h1').should('be.visible');
        cy.get('h1').should('contain.text', 'Failed')
    })

    it('Correct username, incorrect password', () => {
        cy.get('#uname').type('User1');
        cy.get('#pass').type('wrongpass');
        cy.get('#subBtn').click();

        cy.get('h1').should('be.visible');
        cy.get('h1').should('contain.text', 'Failed')
    })

    // it('Register new user', () => {
        
    // })
})