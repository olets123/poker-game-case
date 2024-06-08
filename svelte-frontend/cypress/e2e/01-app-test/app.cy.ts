import { url } from '../utils';

describe('Visit main page and find play button', () => {
	it('visit url and click to play', () => {
		cy.visit(url);
		cy.url().should('contain', url);
		cy.wait(1000);
		cy.get('.btn').contains('Click to Play').click();
	});
});
