import { Map, StyleSpecification } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const mapStyle: StyleSpecification = {
  version: 8,
  sources: {
    velomapa: {
      type: 'raster',
      tiles: ['https://tiles.velomapa.pl/styles/velomap/{z}/{x}/{y}@2x.png'],
      tileSize: 256,
      minzoom: 0,
      maxzoom: 19,
      attribution:
        '&copy <a href="https://www.openstreetmap.org/copyright" rel="nofollow external noopener" taget="_blank">OpenStreetMap</a> contributors; &copy<a href="https://openmaptiles.org/" rel="nofollow external noopener" taget="_blank">OpenMapTiles</a>',
    },
    bikeInfra: {
      type: 'geojson',
      data: './infra.json',
    },
  },
  layers: [
    {
      id: 'background',
      type: 'raster',
      source: 'velomapa',
    },
    {
      id: 'bikeInfra',
      type: 'line',
      source: 'bikeInfra',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': 'red',
        'line-width': [
          'interpolate',
          ['exponential', 0.5],
          ['zoom'],
          11,
          1,
          15,
          3,
        ],
      },
    },
  ],
}

window.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('map-container')
  if (!mapContainer) {
    return
  }

  const map = new Map({
    container: mapContainer,
    style: mapStyle,
    center: [18.65, 54.4],
    zoom: 10,
    minZoom: 9,
    hash: true,
  })
})
