Module("App")({
    Components : {},
    Systems : {},
    Nodes : {},
    _looping : false,
    _t : 0,
    _fps : 25,
    init : function init(config) {
      this.engine = new Serpentity();

      this._t = Date.now();

      this._initializeSystems();
      this._initializeEntities();
      this.startLoop();
    },

    pauseLoop : function pauseLoop() {
      this._looping = false;
    },

    startLoop : function startLoop() {
      this._looping = true;
      window.requestAnimationFrame(this._loop.bind(this))
    },

    _loop : function update(game) {
        var interval, delta, now;

        if (!this._looping) {
          return;
        }

        window.requestAnimationFrame(this._loop.bind(this))
        interval = 1000 / this._fps
        now = Date.now();
        delta = now - this._t;

        if (delta > interval) {
          this._t = now - (delta % interval);

          this.engine.update(delta);
        }
    },

    // Adds the systems to serpentity so they can be used
    _initializeSystems : function initializeSystems() {
      this.engine.addSystem(new App.Systems.FrequencyColorRenderer());
      this.engine.addSystem(new App.Systems.FrequencyD3Renderer());
      this.engine.addSystem(new App.Systems.FrequencyD3ClustererRenderer());
      this.engine.addSystem(new App.Systems.ConfigurationControls());
      this.engine.addSystem(new App.Systems.Fader());
    },

    // Calls to the entity factory to create all initial
    // entities
    _initializeEntities : function initializeEntities() {
      this.AudioFactory.createMicAnalyser(function (entity) {
        console.log("Added: ", entity);
      });
    }
});

