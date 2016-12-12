export const devMode = false;
export const baseZoom = 9;
export const centerLat = -73.6654;
export const centerLng = 45.5388;

export const mapbox = {
    token : 'pk.eyJ1IjoiY3ZtdGwiLCJhIjoiY2l2ZWEwNzBkMDBwbzJvbzB0ZWdjM2JiaSJ9.QZAmBwV1f-EYQ20GnZkJ8A'
}


export const apiBaseUrl = 'https://www.corridorsvertsmtl.org/api/'
export const style =
{

}

export function getTheme(themeName) {
   if (themeName === 'dark') {
       return {
          style: 'mapbox://styles/cvmtl/ciwirdnqa00052qnyl3mcrb4c',
          baseLayers: [
          {
            name:'milieux humides',
            shortname:'humide',
            id:'9r818a2c',
            sourceLayer: 'milieuhumidegeojson',
            color:'hsla(165, 55%, 46%, 0.8)',
            opacity: 0.5
          },
          {
            name:'hydrographie',
            shortname:'hydro',
            id:'1l0k9992',
            sourceLayer: 'hydrogeojson',
            color:'hsla(201, 100%, 75%, 0.7)',
            opacity: 0.5
          },
          {
            name : 'îlots de chaleur',
            shortname:'chaleur',
            id:'crkrph54',
            sourceLayer: 'ilotschaleur_region06geojson',
            color:'hsla(38, 100%, 59%, 0.5)',
            opacity: 0.5
          },
          {
            name : 'canopée',
            shortname:'canopee',
            id:'a4m2l9cc',
            sourceLayer: 'Canopee_2011_4326geojson',
            color:'hsla(112, 56%, 42%, 0.8)',
            opacity: 0.5
          }
        ],
        corridorsFill: {
            'fill-color': '#367133',
            'fill-outline-color': 'black',
            'fill-opacity': 0.2
        },
        corridorsLine: {
                 "line-color": "white",
                 "line-width": 2
        }
       };
   } else {
       return {
          style: 'mapbox://styles/cvmtl/ciw2pjpq2005v2kr32l393bs3',
          baseLayers: [
              {
                name:'milieux humides',
                shortname:'humide',
                id:'9r818a2c',
                sourceLayer: 'milieuhumidegeojson',
                color:'hsla(165, 55%, 46%, 0.8)',
                opacity: 0.5
              },
              {
                name:'hydrographie',
                shortname:'hydro',
                id:'1l0k9992',
                sourceLayer: 'hydrogeojson',
                color:'hsla(201, 100%, 75%, 0.7)',
                opacity: 0.5
              },
              {
                name : 'îlots de chaleur',
                shortname:'chaleur',
                id:'crkrph54',
                sourceLayer: 'ilotschaleur_region06geojson',
                color:'hsla(38, 100%, 59%, 0.5)',
                opacity: 0.5
              },
              {
                name : 'canopée',
                shortname:'canopee',
                id:'a4m2l9cc',
                sourceLayer: 'Canopee_2011_4326geojson',
                color:'hsla(112, 56%, 42%, 0.8)',
                opacity: 0.5
              }
            ],
            corridorsFill: {
                'fill-color': '#367133',
                'fill-outline-color': 'white',
                'fill-opacity': 0.2
            },
            corridorsLine: {
                 "line-color": "#053e0e",
                 "line-width": 2
             }
       };
   }
}

