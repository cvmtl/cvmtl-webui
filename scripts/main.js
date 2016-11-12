const markers = require('./lib/markers');
const projects = require('./lib/projects');
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
  cartodb.createVis('map', config.carto.url , config.carto.parameters)
  .error(function(err) {
    console.log(err);
  })
  .done(function (vis,layers) {
    var map = vis.getNativeMap();
    projects.display(map);
    map.addLayer(drawnItems);
    map.addControl(drawControl);
    map.on('draw:created', function (e) {
      drawnItems.addLayer(e.layer);
      map.addLayer(e.layer);
      markers.postMarker(e);
    });
  });
});
