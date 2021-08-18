import { useList } from 'effector-react'
import React, { FC } from 'react'

import { TextinputField } from './TextinputField'
import { $tokens } from '../../model'

import { mockTokens } from './mockTokens'

export type TokensProps = {}

export const Tokens: FC<TokensProps> = () => {
  const {
    tokens: { globals, components },
  } = useStore($theme)
  const component = useStore($component)
  const designTokens = useStore($designTokens)
  const invertedTokenMappings = useStore($invertedTokenMappings)

  const values = component === 'overview' ? globals : (components[component.toLocaleLowerCase()] || {})
  // const values = mockTokens

  return (
    <>
      {Object.entries(values).map(([groupName, groupTokens]: any, index) => (
        <TextinputField
          key={groupName}
          label={groupName}
          defaultValue={groupTokens.value}
          customTokens={designTokens[groupName]?.value || ''}
          rawValue={transformMappings(
            (designTokens[groupName] || {}).rawValue || '',
            invertedTokenMappings,
            true,
          )}
          path={groupTokens.path}
          description={groupTokens.description}
        />
      ))}
    </>
  )
}
