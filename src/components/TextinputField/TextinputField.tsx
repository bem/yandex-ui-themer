import React, { useState, useEffect, useCallback, useRef } from 'react'
import { ChromePicker } from 'react-color'
import { Textinput } from '@yandex/ui/Textinput/desktop/bundle'
import { ListTile } from '@yandex/ui/ListTile/desktop'
import { Text } from '@yandex/ui/Text/bundle'
import { Badge } from '@yandex/ui/Badge/desktop'
import { Popup } from '@yandex/ui/Popup/desktop/bundle'

import { isColor } from '../../utils/isColor'
import { variablesChanged } from '../Sandbox/Sandbox.model'
import { IconBack } from '../IconBack/IconBack'

import { metricaGoal } from '../YaMetrika/YaMetrika'

export const TextinputField: React.FC<{
  label: string
  value: string
  path: string[]
  description: string
  customTokens: string
}> = ({ label, value, path, description, customTokens }) => {
  const [val, setVal] = useState(customTokens)

  const [visible, setVisible] = useState(false)
  const scopeRef = useRef<HTMLDivElement>(null)
  const anchorRef = useRef<HTMLDivElement>(null)

  const isColorValue = isColor(value)
  const isChanged2 = value !== val

  // Update internal value when showcase is changed.
  useEffect(() => {
    setVal(value)
  }, [value])

  const handleClick = useCallback(() => {
    setVisible(!visible)
  }, [visible])

  const handleClose = useCallback(() => {
    setVisible(false)
  }, [])

  const onClearClick = useCallback(() => {
    setVal(value)
    variablesChanged({
      path,
      name: label,
      value: value,
      changed: false,
    })
  }, [value])

  const onColorChange = useCallback(
    (color) => {
      let colorValue = ''

      // TODO: Move to util.
      if (color.source === 'rgb') {
        colorValue = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`
      } else if (color.source === 'hsl') {
        colorValue = `hsla(${color.hsl.h}, ${color.hsl.s}, ${color.hsl.l}, ${color.hsl.a})`
      } else {
        colorValue = color.hex
      }

      setVal(colorValue)
      variablesChanged({
        path,
        name: label,
        value: colorValue,
        changed: colorValue !== value,
      })
    },
    [path, value, label],
  )

  const onChange = useCallback(
    (event) => {
      setVal(event.target.value)
      variablesChanged({
        path,
        name: label,
        value: event.target.value,
        changed: event.target.value !== value,
      })
    },
    [path, value, label],
  )

  return (
    <ListTile
      leftSpace="m"
      rightSpace="m"
      alignItems="center"
      leading={
        <div style={{ width: 300, display: 'inline-block' }}>
          <Text typography="control-m" color="secondary">
            {label}:{' '}
          </Text>
          {description && (
            <div className="Description-Wrapper">
              <Badge
                style={{ fontSize: '11px' }}
                className="Description-Trigger"
                content="?"
                textColor="#fff"
                color="#535353"
              />
              <span className="Description-Popover" style={{ fontSize: 14 }}>
                {description}
              </span>
            </div>
          )}
        </div>
      }
    >
      <div style={{ display: 'flex' }}>
        <Textinput
          debounceTimeout={500}
          onChange={(event) => {
            onChange(event)
            metricaGoal('change-tokens')
          }}
          // @ts-ignore
          iconRight={isChanged2 && <IconBack onClick={() => {
            onClearClick()
            metricaGoal('clear-textinput')
          }} />}
          view="default"
          size="s"
          style={{ width: 200, marginBottom: 8 }}
          value={val}
          // @ts-ignore
          hint={isChanged2 && `Оригинальное значение - ${value}`}
        />
        {isColorValue && (
          <div style={{ position: 'relative' }} ref={scopeRef}>
            <div
              ref={anchorRef}
              onClick={() => {
                handleClick();
                metricaGoal('picker');
              }}
              style={{
                boxSizing: 'border-box',
                background: val,
                width: 32,
                height: 32,
                marginLeft: 8,
                borderRadius: '50%',
                border: '1px solid #d9d9d9',
              }}
            />
            <Popup
              directions={['bottom-right']}
              target="anchor"
              anchor={anchorRef}
              view="default"
              visible={visible}
              scope={scopeRef}
              onClose={handleClose}
            >
              <ChromePicker color={val} onChangeComplete={(event) => {
                onColorChange(event)
                metricaGoal('change-tokens')
              }} />
            </Popup>
          </div>
        )}
      </div>
    </ListTile>
  )
}
