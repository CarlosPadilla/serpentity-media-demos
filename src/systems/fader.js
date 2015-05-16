Class(App.Systems, "Fader").inherits(Serpentity.System)({
  prototype : {
    _palette : null,
    analysers : null,
    lifetime: 1000,
    maxLifetime: 5000,
    added : function added(engine) {
      this.configurables = engine.getNodes(App.Nodes.Configurable);
    },
    removed : function removed(engine) {
      this.configurables = null;
    },
    update : function update(dt) {
      var svg, faders, lifetime, system;

      system = this;

      lifetime = this.lifetime;
      if (this.configurables[0]) {
        config = this.configurables[0].configuration.config;
        if (config) {
          lifetime = config.clusterFade;
        }
      }

      svg = d3.select("svg");
      faders = svg.selectAll(".fading");

      faders.each(function (d, i) {
        var el, lifespan, localLifetime;
        el = d3.select(this);
        lifespan = el.attr("lifespan")
        localLifetime = el.attr("lifetime")

        if (!lifespan) {
          el.attr("lifespan", dt);
          el.attr("lifetime", lifetime);
        } else {
          localLifetime = parseFloat(localLifetime);
          lifespan = parseFloat(lifespan);
          lifespan += dt;

          el.attr("lifespan", lifespan);

          if (lifespan > localLifetime || lifespan > system.maxLifetime) {
            el.remove();
          }

        }
      })

    }
  }
});
