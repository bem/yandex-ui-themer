/* globals cy */
import { TOKENS, CSS_TOKENS } from '../constants'

describe('Sandbox', () => {
  beforeEach(() => cy.visit('/'))

  it('should show valid yaml and css when upload theme', () => {
		// Upload the theme 
    cy.findByText('Загрузить тему').click()
    cy.findByTestId('tokens-textarea').clear().type(TOKENS)
    cy.findByTestId('tokens-upload-button').click({ force: true })

		// Validate generated yaml and css
    cy.findByText('YAML').click()
    cy.get('code').should('have.text', TOKENS)

    cy.findByText('CSS').click()
    cy.get('code').should('have.text', CSS_TOKENS)
  })

	it('should correctly generate yaml and css using textinput', () => {
		// `targetYaml` and `targetCss` are taken from test execution
		const targetYaml = `button:\n  border:\n    radius:\n      value: 10px\n  viewAction:\n    fillColor:\n      base:\n        value: "#ff0"\n      disabled:\n        value: color({button.viewAction.borderColor.focused.value} a(10%))\n    borderColor:\n      focused:\n        value: "#fc0"\n`
		const targetCss = `:root {\n  --button-borderRadius: 10px;\n  --button-view-action-fill-color-base: #ff0;\n  --button-view-action-fill-color-disabled: rgba(255, 204, 0, 0.1);\n  --button-view-action-border-color-focused: #fc0;\n}`

		// Go to tab with button tokens
		cy.findByTestId('tokens-select').click()
		cy.findByText('button').click()

		// Set new values in token textinputs
		cy.findByTestId('button-borderRadius').clear().type('10px')
		cy.findByTestId('button-view-action-fill-color-base').clear().type('#ff0')
		cy.findByTestId('button-view-action-fill-color-disabled').clear().type('color({button-view-action-border-color-focused} a(10%))', { parseSpecialCharSequences: false })

		// Validate generated yaml and css
    cy.findByText('YAML').click()
    cy.get('code').should('have.text', targetYaml)

    cy.findByText('CSS').click()
    cy.get('code').should('have.text', targetCss)
	})
})
