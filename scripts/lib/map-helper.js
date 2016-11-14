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
    'paint': {
        'fill-color': 'green',
        //'fill-outline-color': 'black',
        'fill-opacity': 0.2
    }
  });
}
