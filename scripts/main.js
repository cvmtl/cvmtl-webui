const markers = require('./lib/markers');
const draw = require('./lib/draw');
const icon = require('./lib/icon');
const config = require('./lib/config');
draw.config();

var drawnItems = new L.FeatureGroup();
var drawControl = new L.Control.Draw({
  position: 'topright',
  draw: {
    polyline: false,
    polygon: false,
    circle: false,
    rectangle: false,
    marker: {
      icon: icon.getIcon('tree', 'green')
    }
  },
  edit: {
    featureGroup: drawnItems
  }
});
$(document).ready(function () {
  cartodb.createVis('map', config.cartoUrl , {
     shareable: false,
    // title: true,
     description: false,
    search: false,
    // tiles_loader: true,
    layer_selector: false,
    center_lat: 45.5388,
    center_lon: -73.6654,
    zoom: 11,
    no_cdn: true
  })
  .error(function(err) {
    console.log(err);
  })
  .done(function (vis,layers) {
    var map = vis.getNativeMap();
    markers.addToMap(map);
    map.addLayer(drawnItems);
    map.addControl(drawControl);
    map.on('draw:created', function (e) {
      drawnItems.addLayer(e.layer);
      map.addLayer(e.layer);
      markers.postMarker(e);
    });
  });
});
