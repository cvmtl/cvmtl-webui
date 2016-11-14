const $ = require('jquery');
const config = require('./lib/config');
const polylabel = require ('polylabel');
const mapboxgl = require('mapbox-gl');
const mapHelper = require ('./lib/map-helper.js')
$(document).ready(function () {
  mapboxgl.accessToken = config.mapbox.token;
  var map = new mapboxgl.Map({
      container: 'map',
      style: config.mapbox.style,
     zoom: config.baseZoom,
     center: [config.centerLat, config.centerLng]
  });
  var getAllUrl = config.apiBaseUrl + "projects?type=geojson";
  var getAllUrl = "http://localhost:8080/projects.json";
  map.on('load', function () {
    $.get( getAllUrl, function( items ) {
      mapHelper.addCorridors(map,items);
    }).done(function (items) {
          console.log(items);
    })
    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mousemove', function(e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['corridors'] });
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

        if (!features.length) {
            popup.remove();
            return;
        }

        var feature = features[0];
        // Populate the popup and set its coordinates
        // based on the feature found.

        popup.setLngLat(polylabel(feature.geometry.coordinates))
           .setHTML(feature.properties.description)
            .addTo(map);
        map.setPaintProperty('corridors', 'fill-opacity', 1);
    });


});
});
