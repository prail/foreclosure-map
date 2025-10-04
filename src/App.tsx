import { useState } from 'react'
import { Map } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>WA Homes Foreclosed By Tax</h1>
      <Map
        initialViewState={{
          longitude: -121,
          latitude: 47,
          zoom: 6
        }}
        style={{width: 800, height: 600}}
        mapStyle="https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json"
      />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p>Made with ❤️ by <a href="https://f40c40.com/">Andrew Teesdale, Jr.</a></p>
    </>
  )
}

export default App
