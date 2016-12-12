const $ = require('jquery');
const polylabel = require ('polylabel');
const config = require ('./config');

const defaultThemeName = 'dark';

export function queryFromUrl() {
    var queries = {};
      $.each(document.location.search.substr(1).split('&'),function(c,q){
        var i = q.split('=');
        queries[i[0].toString()] = i[1].toString();
    });

    return queries;
}

export function getActiveTheme() {
  var themeName = defaultThemeName;
  const query = queryFromUrl();
  if (query.theme) {
     themeName = query.theme;
  }
  return config.getTheme(themeName);
}

export function addStaticLayers(map) {
  const theme = getActiveTheme();
  const baseLayers = theme.baseLayers;

  console.log('version 13');
  for(var i = 0; i < baseLayers.length; i++) {
    var layer = baseLayers[i];
    map.addSource(
      layer.shortname,
      {
        'type': 'vector',
        'url': 'mapbox://' + 'cvmtl.' + layer.id
      }
    );

    map.addLayer({
      'id': layer.shortname,
      'type': 'fill',
      'source':  layer.shortname,
      'source-layer': layer.sourceLayer,
      'layout': {
          'visibility': 'none'
      },
      'paint': {
          'fill-color': layer.color,
          'fill-opacity': layer.opacity
      }
    });
    $('#menu').append(
      `<a class="layerItem" related="${i}">${layer.name}</a>`
      );
  }

  $('.layerItem').on('click', function(){
    var itemId = $(this).attr('related');
    var layerItem = baseLayers[itemId];
    var visibility = map.getLayoutProperty(layerItem.shortname, 'visibility');

    if (visibility === 'visible') {
        map.setLayoutProperty(layerItem.shortname, 'visibility', 'none');
        this.className = '';
    } else {
        this.className = 'active';
        map.setLayoutProperty(layerItem.shortname, 'visibility', 'visible');
    }
  });
}

export function addCorridors(map, items) {
  const theme = getActiveTheme();

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
    "paint": theme.corridorsLine
  });

  map.addLayer({
    'id': "corridors-hover",
    'type': 'fill',
    'source': "corridors",
    "layout": {},
    'paint': theme.corridorsFill,
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
