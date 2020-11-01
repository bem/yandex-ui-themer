import React from 'react'
import { Text } from '@yandex/ui/Text/bundle'

export const Headline: React.FC = ({ children }) => (
  <Text typography="display-s" color="primary">
    {children}
  </Text>
)
