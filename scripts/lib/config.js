export const devMode = false;
export const baseZoom = 9;
export const centerLat = -73.6654;
export const centerLng = 45.5388;
export const mapbox = {
    token : 'pk.eyJ1IjoiY3ZtdGwiLCJhIjoiY2l2ZWEwNzBkMDBwbzJvbzB0ZWdjM2JiaSJ9.QZAmBwV1f-EYQ20GnZkJ8A',
    style : 'mapbox://styles/cvmtl/ciw2pjpq2005v2kr32l393bs3'
}
// export const mapbox = {
//     token : 'pk.eyJ1IjoidG9tcmFnIiwiYSI6ImQ4OWZiMWQwOGM5NDNmMGIzNDhlM2I0MGI5NGM4MzFhIn0.-7KNnHCqDmjUJ-tvjngx-A',
//     style : 'mapbox://styles/tomrag/ciq8kpayl001eb0kqkl84301h'
// }
export const apiBaseUrl = 'https://www.corridorsvertsmtl.org/api/'
export const style =
{
    // 'fill-outline-color': 'black',
    // "weight": 1,
    // "opacity": 1
}
export const baseLayers = [
  {
    name:'milieux humides',
    shortname:'humide',
    id:'9r818a2c',
    sourceLayer: 'milieuhumidegeojson',
    color:'yellow',
  },
  {
    name:'hydrographie',
    shortname:'hydro',
    id:'1l0k9992',
    sourceLayer: 'hydrogeojson',
    color:'blue',
  },
  {
    name : 'îlots de chaleur',
    shortname:'chaleur',
    id:'crkrph54',
    sourceLayer: 'ilotschaleur_region06geojson',
    color:'orange',
  },
  {
    name : 'canopée',
    shortname:'canopee',
    id:'a4m2l9cc',
    sourceLayer: 'Canopee_2011_4326geojson',
    color:'green',
  }
]
