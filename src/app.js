Module("App")({
    Components : {},
    Systems : {},
    Nodes : {},
    init : function init(config) {
      this.engine = new Serpentity();
    },

    _preload : function preload() {
        console.log("Preloading.");
        this._initializeSystems();
        this._initializeEntities();
    },

    _create : function create() {
        console.log("Creating.");
    },

    _update : function update(game) {
        this.engine.update(game.time.elapsed);
    },

    // Adds the systems to serpentity so they can be used
    _initializeSystems : function initializeSystems() {
    },

    // Calls to the entity factory to create all initial
    // entities
    _initializeEntities : function initializeEntities() {
    }
});

