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
  console.log('version 70');
  mapboxgl.accessToken = config.mapbox.token;
  var map = new mapboxgl.Map({
      container: 'map',
      style: config.mapbox.style,
     zoom: config.baseZoom,
     center: [config.centerLat, config.centerLng]
  });
  map.addControl(new mapboxgl.NavigationControl(), ['top-left']);

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
      $.get('https://corridorsvertsmtl.org/wp-json/wp/v2/projet', function (projects) {
        console.log(projects);
        for (let project of projects){
          for (let item of items){
            if (project.acf.shortname == item.properties.shortname){
              item.properties.goal = project.acf['objectif'];
              item.properties.facebook = project.acf['page_facebook'];
            }
          }
        }
        mapHelper.addCorridors(map,items);
        for(var item of items){
          var menuId = "item-"+ item.properties.id;
          var relatedId = item.properties.id - 1
          $('.menu').append(
            '<a class="item" related='+ relatedId +
            '>' +
            item.properties.title+'</a>')
        }
        $('.item').on('click', function(){
          var itemId = $(this).attr('related');
          var item = items[itemId];
          var p = polylabel(item.geometry.coordinates);
          map.flyTo({
              center: p,
               zoom: 12
          });
          mapHelper.hoverCorridor(map, item, popup);
        });
        map.on('mousemove', function(e) {
          var features = map.queryRenderedFeatures(e.point, { layers: ['corridors'] });
          mapHelper.toggleHoverCorridor(map, features, popup);
        });

        map.on("mouseout", function() {
            map.setFilter("corridors-hover", ["==", "title", ""]);
        });
        map.on('click', function(e) {
            var features = map.queryRenderedFeatures(e.point, { layers: ['corridors'] });
            if (!features.length) {
                return;
            }
            var feature = features[0];
            $('.ui.modal .header #title').html(feature.properties.title);
            $('.ui.modal .header #facebook-link').attr('href', feature.properties.facebook);
            $(".ui.modal .content #description").html(feature.properties.goal);
            $('.ui.modal').modal({
              inverted: true
            })
            .modal('show');
        });
      }).done(function (items) {

      })
    }).done(function (items) {

    });
  });
});
