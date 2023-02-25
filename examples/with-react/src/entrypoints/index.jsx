import React from 'react'
import ReactDOM from 'react-dom/client'

// Same as './src/components/hello-world.jsx'
import HelloWorld from '@/components/hello-world'

ReactDOM.createRoot(document.getElementById('hello-world')).render(
  <React.StrictMode>
    <HelloWorld />
  </React.StrictMode>
)
