import { backendUrl, url } from '../utils';

describe('Compare hands', () => {
	it('Select hands to compare', () => {
		cy.visit(`${url}/compare`);
		cy.url().should('contain', `${url}/compare`);
		cy.request(`${backendUrl}/hands`).should((response) => {
			expect(response.status).to.eq(200);
		});
		cy.wait(500);
		cy.get('#hand-row').click();
		cy.wait(500);
		cy.get('.flex-row > :nth-child(2)').click();
		cy.wait(1000);
		cy.get('#compare-hands-battle');
		cy.get('#compare-btn').click();
		cy.wait(500);
		cy.get('#winning-hand');
		cy.wait(500);
		cy.get('#reset-compare-btn').contains('Reset').click();
		cy.wait(500);
		cy.get('#load-btn').click();
		cy.wait(200);
		cy.get('#hand-row').click();
		cy.wait(500);
		cy.get('.flex-row > :nth-child(2)').click();
		cy.wait(1000);
		cy.get('#compare-hands-battle');
		cy.get('#compare-btn').click();
		cy.wait(500);
		cy.get('#winning-hand');
		cy.get('#reset-compare-btn').contains('Reset').click();
	});
});
