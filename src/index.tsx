import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ComponentRendererInit } from './ComponentsRenderer';

const urlParams = new URLSearchParams(window.location.search);
const isComponentRenderer = urlParams.get('componentRenderer');

if (!isComponentRenderer) {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root'),
    )
} else {
    ComponentRendererInit(document.getElementById('root') as HTMLElement);
}
