import { useState } from 'react'
import { Map } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Map of Homes Foreclosed By Tax</h1>
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 3.5
        }}
        style={{width: 800, height: 600}}
        mapStyle="https://demotiles.maplibre.org/style.json"
      />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
