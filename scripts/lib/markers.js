const icon = require('./icon');
const config = require('./config');

function addMarkerToMap(map,item) {
  var latlon = item.latlon;
  var options = { icon: icon.getIcon('tree', 'orange') };
  var marker = L.marker(latlon, options).addTo(map);
  marker.bindPopup(item.details).openPopup();
}

function addMarkersToMap(map,items) {
  for (var item of items) {
    addMarkerToMap(map,item)
  }
}

export function addToMap(map) {
  $.get( config.baseurl + "geo/markers", function( items ) {
    addMarkersToMap(map,items);
  })
};
export function postMarker(event) {
  console.log(event);
  console.log(event.layer.getLatLng());
};
