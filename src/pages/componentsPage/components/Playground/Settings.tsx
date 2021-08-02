import React, { FC } from 'react'

import { Textinput } from '../../../../components/Textinput'

export type SettingsProps = {}

export const Settings: FC<SettingsProps> = () => {
  return (
    <>
      <Textinput
        label="size"
        tip="размер кнопки"
        type="select"
        options={[
          { value: 's', label: 's' },
          { value: 'm', label: 'm' },
        ]}
      />
      <Textinput label="content" tip="содержимое кнопки" type="text" />
      <Textinput
        label="view"
        tip="внешний вид кнопки"
        type="select"
        options={[
          { value: 'ks', label: 's' },
          { value: 'm', label: 'm' },
        ]}
      />
      <Textinput
        label="state"
        tip="состояние кнопки"
        type="select"
        options={[
          { value: 's', label: 's' },
          { value: 'm', label: 'm' },
        ]}
      />

      <Textinput
        label="pin"
        tip="форма кнопки"
        type="select"
        options={[
          { value: 's', label: 's' },
          { value: 'm', label: 'm' },
        ]}
      />
      <Textinput label="check" tip="выбранная кнопка" type="boolean" />
    </>
  )
}
