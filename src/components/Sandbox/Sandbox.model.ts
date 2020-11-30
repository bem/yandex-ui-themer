import { createStore, createEvent } from 'effector';

export const variablesChanged = createEvent<{
  name: string;
  path: string[];
  value: string;
  changed: boolean;
}>();

export const variablesChangedBatch = createEvent<{
  name: string;
  path: string[];
  value: string;
  changed: boolean;
}[]>();

export const $cssVariables = createStore({})
export const $designTokens = createStore<any>({})

// TODO: Удалять значение из стора если change=false.
$designTokens
  .on(variablesChanged, (state, { name, ...data }) => ({ ...state, [name]: data }))
  .on(variablesChangedBatch, (state, tokens) => {
    const ret: Record<string, any> = {};
    tokens.forEach(v => ret[v.name] = v);
    return { ...state, ...ret }
  });

// TODO: Удалять значение из стора если change=false.
$cssVariables
  .on(variablesChanged, (state, { name, value }) => ({ ...state, [`--${name}`]: value }))
  .on(variablesChangedBatch, (state, tokens) => {
    const ret: Record<string, any> = {};
    tokens.forEach(v => ret[`--${v.name}`] = v.value);
    return { ...state, ...ret }
  });

$designTokens.watch(r => console.log(r));
