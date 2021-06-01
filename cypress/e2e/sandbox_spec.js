/* globals cy */
import { TOKENS, CSS_TOKENS } from '../constants'

describe('Sandbox', () => {
  beforeEach(() => cy.visit('/'))

  it('should show valid yaml and css', () => {

    cy.findByText('Загрузить тему').click()

    cy.findByTestId('tokens-textarea').clear().type(TOKENS)

    cy.findByTestId('tokens-upload-button').click({ force: true })

    cy.findByText('YAML').click()
    cy.get('code').should('have.text', TOKENS)

    cy.findByText('CSS').click()
    cy.get('code').should('have.text', CSS_TOKENS)
  })
})
