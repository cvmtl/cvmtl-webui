const icon = require('./icon');
export function addToMap(map) {
  $.get( "http://localhost:7070/api/geo/markers", function( markers ) {
    for (var marker of markers) {
      var latlon = marker.latlon;
      var options = { icon: icon.getIcon('tree', 'yellow') };
      var result = L.marker(latlon, options).addTo(map);
      console.log(result);
    }
  })
};
export function postMarker(event) {
  console.log(event);
  console.log(event.layer.getLatLng());
};
