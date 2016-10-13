const icon = require('./icon');
const config = require('./config');
export function addToMap(map) {
  $.get( config.baseurl + "geo/markers", function( markers ) {
    for (var marker of markers) {
      var latlon = marker.latlon;
      var options = { icon: icon.getIcon('tree', 'orange') };
      var result = L.marker(latlon, options).addTo(map);
      console.log(result);
    }
  })
};
export function postMarker(event) {
  console.log(event);
  console.log(event.layer.getLatLng());
};
