import { backendUrl, url } from '../utils';

describe('Get all generated hands', () => {
	it('Get all generated hands', () => {
		cy.visit(`${url}/hands`);
		cy.url().should('contain', `${url}/hands`);
		cy.request(`${backendUrl}/hands`).should((response) => {
			expect(response.status).to.eq(200);
		});
		cy.get('#hands-stats');
		cy.get('#hands-table');
	});
});
