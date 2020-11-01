import { createStore, createEvent } from 'effector';

export const variablesChanged = createEvent<{
  name: string;
  path: string[];
  value: string;
  changed: boolean;
}>();

export const $cssVariables = createStore({})
export const $designTokens = createStore({})

// TODO: Удалять значение из стора если change=false.
$designTokens
  .on(variablesChanged, (state, { name, ...data }) => ({ ...state, [name]: data }));

// TODO: Удалять значение из стора если change=false.
$cssVariables
  .on(variablesChanged, (state, { name, value }) => ({ ...state, [`--${name}`]: value }));

$designTokens.watch(r => console.log(r));
