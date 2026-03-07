import { useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import { Button } from './components/Button'
import { useCounter } from './hooks/useCounter'
import viteLogo from '/vite.svg'

function App() {
  const [name, setName] = useState('')
  const { count, increment, decrement, reset } = useCounter({
    initialValue: 0,
    min: 0,
    max: 100,
  })

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>This is a new project template</h1>
      <div className="card">
        <p>Count: {count}</p>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
          <Button variant="primary" onClick={increment}>
            +
          </Button>
          <Button variant="secondary" onClick={decrement}>
            -
          </Button>
          <Button variant="danger" onClick={reset}>
            Reset
          </Button>
        </div>
      </div>
      <div className="card">
        <label htmlFor="name-input">Your name: </label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        {name && <p>Hello, {name}!</p>}
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
