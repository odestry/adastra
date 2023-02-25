import React from 'react'
import ReactDOM from 'react-dom/client'

import HelloWorld from '../hello-world'

ReactDOM.createRoot(document.getElementById('hello-world')).render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>
)
