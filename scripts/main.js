const $ = require('jquery');
const config = require('./lib/config');
const polylabel = require ('polylabel');
const mapboxgl = require('mapbox-gl');
const mapHelper = require ('./lib/map-helper.js');
const Modal = require('semantic-ui-modal');
const Transition = require('semantic-ui-transition');
const  Dimmer = require('semantic-ui-dimmer');

$.fn.dimmer = Dimmer;
$.fn.transition = Transition;
$.fn.modal = Modal;

$(document).ready(function () {

  mapboxgl.accessToken = config.mapbox.token;
  var map = new mapboxgl.Map({
      container: 'map',
      style: config.mapbox.style,
     zoom: config.baseZoom,
     center: [config.centerLat, config.centerLng]
  });

  var getAllUrl = config.apiBaseUrl + "projects?type=geojson";
  if (config.devMode) {
    var getAllUrl = "projects.json";
  }

  map.on('load', function () {
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });
    $.get( getAllUrl, function( items ) {
      mapHelper.addCorridors(map,items);
      for(var item of items){
        var menuId = "item-"+ item.properties.id;
        var relatedId = item.properties.id - 1
        $('.menu').append(
          '<a class="item" related='+ relatedId +
          '>' +
          item.properties.description+'</a>')
        }
    })
    .done(function (items) {
          console.log('chargement ok');
          $('.item').on('click', function(){
            var itemId = $(this).attr('related');
            var item = items[itemId];
            var p = polylabel(item.geometry.coordinates);
            map.flyTo({
                center: p,
                 zoom: 12
            });
          });
    })

    map.on('mousemove', function(e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['corridors'] });
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

        if (!features.length) {
            popup.remove();
            return;
        }
        var feature = features[0];
        popup.setLngLat(polylabel(feature.geometry.coordinates))
           .setHTML(feature.properties.description)
            .addTo(map);
    });

    map.on('click', function(e) {
        console.log('click');
        var features = map.queryRenderedFeatures(e.point, { layers: ['corridors'] });
        if (!features.length) {
            return;
        }
        var feature = features[0];
        var testresult = $('.ui.modal .header').html(feature.properties.description);
        console.log(testresult);
        $('.ui.modal').modal({
          inverted: true
        })
        .modal('show');
    });


  });

});
