Class(App.Systems, "FrequencyD3Renderer").inherits(Serpentity.System)({
  prototype : {
    analysers : null,
    init : function init(config) {
      var property;

      for (property in config) {
        if (config.hasOwnProperty(property)) {
          this[property] = config[property];
        }
      }
    },

    added : function added(engine) {
      this.svg = d3.select("svg");
      this.analysers = engine.getNodes(App.Nodes.Analyser);
    },
    removed : function removed(engine) {
      this.svg = null;
      this.analysers = null;
    },
    update : function update(dt) {
      var circle, frequencies;

      frequencies = this._getFrequencies();

      circle = this.svg.selectAll("circle.point")
          .data(frequencies);

      circle.exit().remove();

      circle.enter().append("circle.point")
        .attr("r", 2.5);

      circle
        .attr("cx", function(d) { return d; })
        .attr("cy", function(d, i) { return i * 10; })
    },

    // Assume only one analyser
    _getFrequencies : function getFrequencies() {
      var bufferLength, frequencies, analyserNode;

      frequencies = [];

      this.analysers.forEach(function (analyser) {
        analyserNode = analyser.analyser.analyser;

        bufferLength = analyserNode.frequencyBinCount;
        frequencies = new Uint8Array(bufferLength);
        analyserNode.getByteFrequencyData(frequencies);
      });

      return frequencies;
    }
  }
});
