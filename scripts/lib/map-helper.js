const polylabel = require ('polylabel');
export function addCorridors(map, items) {

  var featureCollection = {
    "type": "FeatureCollection",
    "features": items
  };

  map.addSource(
    "corridors",
    {
      'type': 'geojson',
      'data': featureCollection
    }
  );

  map.addLayer({
    'id': "corridors",
    'type': 'fill',
    'source': "corridors",
    "layout": {},
    'paint': {
        'fill-color': '#367133',
        'fill-outline-color': '#053e0e',
        'fill-opacity': 0
    }
  });

  map.addLayer({
    'id': "corridors-borders",
    'type': "line",
    'source': "corridors",
    "layout": {},
    "paint": {
         "line-color": "#053e0e",
         "line-width": 1
     }
  });

  map.addLayer({
    'id': "corridors-hover",
    'type': 'fill',
    'source': "corridors",
    "layout": {},
    'paint': {
        'fill-color': '#367133',
        'fill-outline-color': 'black',
        'fill-opacity': 0.2

    },
    "filter": ["==", "title", ""]
  });

}

export function hoverCorridor(map, feature, popup) {
  map.setFilter("corridors-hover", ["==", "title", feature.properties.title]);
  popup.setLngLat(polylabel(feature.geometry.coordinates))
     .setHTML(feature.properties.title)
      .addTo(map);
}
export function toggleHoverCorridor(map, features, popup){
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
  var feature = features[0];

  if (!features.length) {
      popup.remove();
      map.setFilter("corridors-hover", ["==", "title", ""]);
      return;
  }
  hoverCorridor(map, feature, popup)
}
