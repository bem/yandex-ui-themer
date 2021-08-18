import { createStore, createEvent } from 'effector';

import Components from '../../components.json';
import { getComponentMetaByName } from '../../utils/getComponentByName';

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
