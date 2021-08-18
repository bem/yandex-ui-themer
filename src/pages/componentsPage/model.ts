import { createStore, createEvent, combine } from 'effector'

import { $designTokens } from '../../model/designTokens'
import { $invertedTokenMappings } from '../../model/mappings'
import { $resolvedTokens } from '../../model/resolvedTokens'
import { $theme } from '../../model/themes'
import { toHEXA } from '../../utils/color'
import { extractParams } from '../../utils/extractParams'
import { getType } from '../../utils/tokenType'
import { transformMappings } from '../../utils/transformers'
import { getComponentMetaByName } from '../../utils/getComponentByName';

export type TokenBase = {
  label: string
  path: string[]
  description: string
  defaultValue: string
  rawValue: string
  changed: boolean
}

export type TokenType = TokenBase &
  (
    | { type: 'text'; value: string }
    | {
        type: 'color'
        hex: string
        alpha: string
        color: string
      }
    | {
        type: 'link'
        link: string
        isColor: boolean
        colorValue: string
      }
  )


export const componentChange = createEvent<string>();
export const tokenChange = createEvent<string>();
export const tokenReset = createEvent();
export const activeTabChange = createEvent<string>();
export const currentPropsChange = createEvent<{
    name: string;
    value: unknown;
}>();

export interface Prop {
    name: string;
    description: string;
    type: {
        required: boolean;
        name: 'node' | 'boolean' | 'string' | 'number' | 'enum' | 'array' | 'object' 
    };
    options?: string[];
    defaultValue: unknown;
}
interface IComponent {
    block: string;
    props: Prop[];
}

interface ComponentState {
    allProps: Record<string, Prop>;
    currentProps: Record<string, unknown>;
}

// Current selected component to be shown
export const $component = createStore<string>('overview');
export const $componentProps = createStore<ComponentState>({
    allProps: {},
    currentProps: {},
});

// Current selected token to be edited
export const $token = createStore<string>('');
export const $tokenPresent = $token.map((token) => token.length > 0);

// Tokens of the component
export const $tokens = combine(
  {
    theme: $theme,
    mappings: $invertedTokenMappings,
    selectedComponent: $component,
    resolvedChanges: $resolvedTokens,
    changes: $designTokens,
  },
  ({
    theme: {
      tokens: { globals, components },
    },
    changes,
    resolvedChanges,
    mappings,
    selectedComponent,
  }) => {
    const tokens = selectedComponent === 'overview' ? globals : components[selectedComponent]

    return Object.entries(tokens).map<TokenType>(([tokenName, token]) => {
      // Initial type of the token
      const baseType = getType(String(token.value))
      const tokenChanged = typeof resolvedChanges[tokenName]?.value !== 'undefined'
      const value = tokenChanged ? resolvedChanges[tokenName].value : String(token.value)

      // Current type of the token (can become link)
      const rawValue = transformMappings((changes[tokenName] || {}).rawValue || '', mappings, true)
      const type = getType(rawValue || value)
      const changed = value !== token.value

      let resultToken: any
      switch (type) {
        case 'text':
          resultToken = { value }
          break
        case 'color':
          const [hex, alpha] = toHEXA(value)
          resultToken = { hex, alpha, color: value }
          break
        case 'link':
          const params = extractParams(rawValue)

          // TODO: добавить поддержку для нескольких ссылок
          // Пример: padding: {size-l} {size-l}
          // Сейчас оно работает только для одной ссылки
          if (params) {
            resultToken = {
              link: params[0].token,
              isColor: baseType === 'color',
              colorValue: value,
            }
          }
      }

      return {
        ...token,
        ...resultToken,
        label: tokenName,
        type,
        defaultValue: token.value,
        rawValue,
        changed,
      }
    })
  },
)

// Current tab to show
export const $activeTab = createStore<string>('');

$component.on(componentChange, (_, component) => component);
$componentProps.on(componentChange, (_, component) => {
    // @ts-expect-error
    const currentComponent = getComponentMetaByName(component);

    return {
        allProps: currentComponent.argTypes,
        currentProps: currentComponent.args
    };
});
$componentProps.on(
    currentPropsChange,
    ({ allProps, currentProps }, newProp) => {
        const newState = { ...currentProps };
        newState[newProp.name] = newProp.value;

        return { allProps, currentProps: newState };
    }
);

$token.on(tokenChange, (_, token) => token).reset(tokenReset);

$activeTab.on(activeTabChange, (_, activeTab) => activeTab);
