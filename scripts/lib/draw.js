const icon = require('./icon');
export function config() {
  L.Draw.MarkerA = L.Draw.Marker.extend({
      initialize: function (map, options) {
          this.type = 'A';

          L.Draw.Feature.prototype.initialize.call(this, map, options);
      },

      addHooks: function () {
          L.Draw.Marker.prototype.addHooks.call(this);

          if (this._map) {
              this._tooltip.updateContent({ text: 'Click map to place tree.' });
          }
      }
  });

  L.Draw.MarkerB = L.Draw.Marker.extend({
      initialize: function (map, options) {

          this.type = 'B';

          L.Draw.Feature.prototype.initialize.call(this, map, options);
      },

      addHooks: function () {
          L.Draw.Marker.prototype.addHooks.call(this);

          if (this._map) {
              this._tooltip.updateContent({ text: 'Click map to place heart.' });
              console.log(this.options);
          }
      }
  });

  L.Draw.MarkerC = L.Draw.Marker.extend({
      initialize: function (map, options) {
          this.type = 'C';

          L.Draw.Feature.prototype.initialize.call(this, map, options);
      },

      addHooks: function () {
          L.Draw.Marker.prototype.addHooks.call(this);

          if (this._map) {
              this._tooltip.updateContent({ text: 'Click map to place cloud.' });
          }
      }
  });

  L.DrawToolbar.include({
      getModeHandlers: function (map) {
          return [
              {
                  enabled: true,
                  handler: new L.Draw.MarkerA(map, { icon: icon.getIcon('tree', 'green') }),
                  title: 'Place tree marker'
              },
              {
                  enabled: true,
                  handler: new L.Draw.MarkerB(map, { icon: icon.getIcon('heart', 'green'), name:'heart' }),
                  title: 'Place heart marker'
              },
              {
                  enabled: true,
                  handler: new L.Draw.MarkerC(map, { icon: icon.getIcon('cloud', 'blue') }),
                  title: 'Place cloud marker'
              }
          ];
      }
  });

}
