import reactDOM from 'react-dom'
import React from 'react'
import { App } from './components/app'

document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app')!
  reactDOM.render(React.createElement(App), appElement)
})
