/* globals cy */
import { SHARED_THEME_PATH, TOKENS, CSS_TOKENS } from '../constants'

describe('Theme change', () => {
  beforeEach(() => cy.visit('/'))

  it('Does change theme on click', () => {
    cy.get('.Showcase').should('have.css', 'background-color', 'rgb(255, 255, 255)')

    cy.findByText('default').click({ force: true })
    cy.findByText('inverse').click()

    cy.get('.Showcase').should('have.css', 'background-color', 'rgb(33, 31, 31)')
  })
})

describe('Share', () => { 
  beforeEach(() => cy.visit('/'))

  it('Should be disabled when data is not set', () => {
    cy.findByTestId('share-button').should('be.disabled')
  })

  it('Should be enabled when data is set', () => {
    // Load theme
    cy.findByText('Загрузить тему').click()
    cy.findByTestId('tokens-upload-button').click()

    cy.findByTestId('share-button').should('be.enabled')
  })

  it('Should change query parameter when successfully shared', () => {
    // Load theme
    cy.findByText('Загрузить тему').click()
    cy.findByTestId('tokens-upload-button').click()

    // Share theme
    cy.findByTestId('share-button').click()

    // Query parameter changed
    cy.location().should((loc) => {
      expect(loc.search).to.contain('?tokens=')
    })
  })

  it('Should load theme', () => {
    cy.visit(SHARED_THEME_PATH)

    cy.findByText('YAML').click()
    cy.get('code').should('have.text', TOKENS)

    cy.findByText('CSS').click()
    cy.get('code').should('have.text', CSS_TOKENS)
  })
})
