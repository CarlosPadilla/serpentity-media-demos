Class(App.Systems, "ConfigurationControls").inherits(Serpentity.System)({
  prototype : {
    gp: null,
    config: null,
    _pointToggleLock: false,
    _radiusMax: 5,
    _baseRadius: 10,
    init : function init(config) {
      var property;

      this.config = {
        clusterRadius : 30,
        showPoints : true
      }

      for (property in config) {
        if (config.hasOwnProperty(property)) {
          this[property] = config[property];
        }
      }
    },
    added : function added(engine) {
      this.configurables = engine.getNodes(App.Nodes.Configurable);
    },
    removed : function removed(engine) {
      this.configurables = null;
    },
    update : function update(dt) {
      this._checkControls();
      this._updateConfigurables();
    },

    _updateConfigurables : function updateConfigurables() {
      this.configurables.forEach(function (configurable) {
        configurable.configuration.config = this.config;
      }, this);
    },

    _checkControls : function checkControls() {
      var radiusX, radiusY;

      this.gp = navigator.getGamepads()[0];

      if (this.gp) {
        radiusX = this._radiusMax + this.gp.axes[0] * this._radiusMax;
        radiusY = this._radiusMax + this.gp.axes[1] * this._radiusMax;
        this.config.clusterRadius = this._baseRadius + radiusX + radiusY;

        console.log(this.config.clusterRadius);

        // toggle point rendering;
        if (this.gp.buttons[0].pressed) {
          if (!this._pointToggleLock) {
            this._pointToggleLock = true;
            this.config.showPoints = !this.config.showPoints;
          }
        } else {
          this._pointToggleLock = false;
        }
      }
    }
  }
});
