import { backendUrl, url } from '../utils';

describe('Generate poker hand', () => {
	it('Generate new poker hand and navigate to compare page', () => {
		cy.visit(`${url}/generate`);
		cy.wait(1000);
		cy.url().should('contain', `${url}/generate`);
		cy.get('#generate-btn').click();
		cy.request('POST', `${backendUrl}/generate-hand`).should((response) => {
			expect(response.status).to.eq(201);
		});
		cy.get('#generated-hand');
		cy.wait(500);
		cy.get('#generate-btn').click();
		cy.get('#generated-hand');
		cy.wait(500);
	});
});
