import { useStore } from 'effector-react'
import React, { FC, useState } from 'react'
import { TextinputField } from '../../../../components/TextinputField'
import { $designTokens } from '../../../../model/designTokens'
import { $invertedTokenMappings } from '../../../../model/mappings'
import { $theme } from '../../../../model/themes'
import { transformMappings } from '../../../../utils/transformers'
import { $component } from '../../model'

export type TokensProps = {}

export const Tokens: FC<TokensProps> = () => {
  const {
    tokens: { globals, components },
  } = useStore($theme)
  const component = useStore($component)
  const designTokens = useStore($designTokens)
  const invertedTokenMappings = useStore($invertedTokenMappings)

  const values = component === 'overview' ? globals : components[component]

  console.log(values)

  return (
    <>
      {Object.entries(values).map(([groupName, groupTokens]: any, index) => (
        <TextinputField
          key={index}
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
