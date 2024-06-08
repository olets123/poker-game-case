import { url } from '../utils';

describe('Test navigation menu', () => {
	it('Navigate through app', () => {
		cy.visit(url);
		cy.url().should('contain', url);
		cy.wait(1000);
		cy.get('.btn').contains('Click to Play').click();
		cy.url().should('contain', url + '/generate');
		cy.get('#navbar').click();
		cy.wait(500);
		if (cy.viewport(1000, 660) || cy.viewport('iphone-x')) {
			cy.get('#nav-dropdown').click();
			cy.wait(500);
			cy.get('#dropdown-list');
			cy.get('#compare-nav').click();
		} else if (cy.viewport('macbook-13') || cy.viewport('macbook-16')) {
			cy.get('#navbar-desktop').click();
			cy.wait(500);
			cy.get('#compare-nav').click();
		}
		cy.wait(500);
		cy.url().should('contain', url + '/compare');
		if (cy.viewport(1000, 660) || cy.viewport('iphone-x')) {
			cy.get('#nav-dropdown').click();
			cy.wait(500);
			cy.get('#dropdown-list');
			cy.get('#hands-nav').click();
		} else if (cy.viewport('macbook-13') || cy.viewport('macbook-16')) {
			cy.get('#navbar-desktop').click();
			cy.wait(500);
			cy.get('#hands-nav').click();
		}
		cy.wait(500);
		cy.url().should('contain', url + '/hands');
		cy.wait(500);
		cy.get('#title-nav').click();
		cy.url().should('contain', url);
	});
});
