'use strict';

Class(App.Systems, "FrequencyLogger").inherits(Serpentity.System)({
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
      this.analysers = engine.getNodes(App.Nodes.Analyser);
    },
    removed : function removed(engine) {
      this.analysers = null;
    },
    update : function update(dt) {
      this.analysers.forEach(function (analyser) {
        this._log(analyser);
      }.bind(this));
    },

    _log : function logAnalyser(analyser) {
      var bufferLength, frequencies, analyserNode;

      analyserNode = analyser.analyser.analyser;

      bufferLength = analyserNode.frequencyBinCount;
      frequencies = new Uint8Array(bufferLength);
      analyserNode.getByteFrequencyData(frequencies);

      console.log("Frequencies: ", frequencies);
    }
  }
});



