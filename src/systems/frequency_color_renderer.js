Class(App.Systems, "FrequencyColorRenderer").inherits(Serpentity.System)({
  prototype : {
    _palette : null,
    analysers : null,
    resolution : 128,
    shave : 0.4,
    init : function init(config) {
      var property;

      this._palette = ["#DC8571","#E396B1","#B7BAE1","#7FDDE0","#9AF2B1","#F4F785"]

      for (property in config) {
        if (config.hasOwnProperty(property)) {
          this[property] = config[property];
        }
      }

      this._scale = chroma.scale(this._palette).domain([0, 5])
    },

    added : function added(engine) {
      this.svg = d3.select("svg");
      this.analysers = engine.getNodes(App.Nodes.ConfigurableAnalyser);
    },
    removed : function removed(engine) {
      this.svg = null;
      this.analysers = null;
    },
    update : function update(dt) {
      this._renderColor();
    },

    _renderColor : function renderColor() {
      var frequencies, average, size, bandSize, histogram, averages;

      this.svg = d3.select("svg");

      frequencies = this._getFrequencies();
      size = frequencies.length;
      bandSize = Math.round(size / this._palette.length);

      frequencies = Array.prototype.slice.call(frequencies);
      histogram = frequencies.reduce(function (mem, frequency, i) {
        var index;

        index = Math.floor(i / bandSize)
        mem[index] = mem[index] || {value: 0, length: 0};
        mem[index].value += frequency;
        mem[index].length += 1;

        return mem;
      }, []);

      averages = histogram.map(function (bar) {
        return bar.value / bar.length;
      });

    },

    // Assume only one analyser
    _getFrequencies : function getFrequencies(w, h) {
      var bufferLength, frequencies, analyserNode, newLength;

      frequencies = [];

      if (this.analysers[0] && this.analysers[0].configuration.config && 
          !this.analysers[0].configuration.config.showPoints) {
        return [];
      }

      this.analysers.forEach(function (analyser) {
        analyserNode = analyser.analyser.analyser;

        analyserNode.fftSize = this.resolution * 2;
        bufferLength = analyserNode.frequencyBinCount;
        frequencies = new Uint8Array(bufferLength);
        analyserNode.getByteFrequencyData(frequencies);
      }, this);

      newLength = Math.round(frequencies.length * this.shave);
      frequencies = Array.prototype.slice.call(frequencies, 0, newLength)

      return frequencies;
    },

    _getColor : function getColor(f) {
      return this._scale(f).alpha(1).hex();
    }
  }
});
