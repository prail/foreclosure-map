import { useEffect, useState } from 'react'
import { Layer, Map, Source } from '@vis.gl/react-maplibre';
import type { LayerProps } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import './App.css'


function App() {


const MAX_ZOOM_LEVEL = 16;

const heatmapLayer: LayerProps = {
  id: 'heatmap',
  maxzoom: MAX_ZOOM_LEVEL,
  type: 'heatmap',
  paint: {
    // Exponential curve - this is KEY for showing variation in 0-1 data
    // Makes values above 0.7 MUCH hotter than below
    'heatmap-weight': [
      'interpolate',
      ['exponential', 3], // Try 2, 3, or 4 - higher = more dramatic
      ['get', 'weight'],
      0, 0,
      0.5, 0.2,  // Half-way through data only gets 20% heat
      0.8, 0.6,  // 80th percentile gets 60% heat
      1, 1       // Top values get full heat
    ],
    
    // Aggressive intensity boost
    'heatmap-intensity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0, 1,
      MAX_ZOOM_LEVEL / 2, 2,
      MAX_ZOOM_LEVEL, 3
    ],
    
    // High contrast color ramp
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0, 'rgba(0, 0, 0, 0)',
      0.1, 'rgba(0, 0, 139, 0.1)',      // Dark blue (barely visible)
      0.3, 'rgba(0, 128, 255, 0.4)',    // Blue
      0.5, 'rgba(0, 255, 0, 0.6)',      // Green
      0.7, 'rgba(255, 255, 0, 0.8)',    // Yellow
      0.9, 'rgba(255, 100, 0, 0.95)',   // Orange
      1, 'rgba(255, 0, 0, 1)'           // Red HOT
    ],
    
    // Bigger radius for better blending
    'heatmap-radius': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0, 2,
      MAX_ZOOM_LEVEL / 2, 20,
      MAX_ZOOM_LEVEL, 40
    ],
    
    'heatmap-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      0, 1,
      MAX_ZOOM_LEVEL - 2, 0.8,
      MAX_ZOOM_LEVEL, 0
    ]
  }};


  const [taxData, setTaxData] = useState("");

  useEffect(() => {
    fetch("/taxes.geojson")
      .then(r => r.json())
      .then(r => setTaxData(r));
  });

  return (
    <>
      <h1>Snohomish County Tax Heatmap</h1>
      <Map
        initialViewState={{
          longitude: -122,
          latitude: 48,
          zoom: 8
        }}
        style={{width: 800, height: 600}}
        mapStyle="https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json"
      >
        <Source type="geojson" data={taxData}>
          <Layer {...heatmapLayer}></Layer>
        </Source>
      </Map>
      <p>Made with ❤️ by <a href="https://f40c40.com/">Andrew Teesdale, Jr.</a></p>
    </>
  )
}

export default App
