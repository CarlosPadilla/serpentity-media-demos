Class(App.Systems, "FrequencyD3Renderer").inherits(Serpentity.System)({
  prototype : {
    _palette : null,
    analysers : null,
    resolution: 32,
    init : function init(config) {
      var property;

      this._palette = [
        '#8b0000','#91000a','#960212','#9d0519','#a2081f','#a70d25','#ac122c','#b11732','#b61b37','#ba213e','#bf2543','#c32b48','#c7304d','#cb3453','#cf3a58','#d23f5d','#d64563','#da4967','#dd4e6c','#e05471','#e35976','#e65e7a','#e9647f','#eb6984','#ee6e88','#f0748c','#f27990','#f47e94','#f68599','#f88a9c','#fa8fa1','#fb95a4','#fd9ba8','#fea0ac','#ffa6b0','#ffacb3','#ffb1b7','#ffb7bb','#ffbdbe','#ffc4c2','#ffc9c5','#ffd0c9','#ffd4cb','#ffdbce','#ffe1d2','#ffe5d4','#ffebd7','#fff2da','#fff6dc','#fffcdf','#fbffdd','#f3fdd7','#ecfcd2','#e4facc','#def8c8','#d8f6c4','#d1f3c0','#ccf2bd','#c6efba','#c0edb6','#bbebb3','#b7e8b1','#b0e6ad','#ace4ab','#a7e1a9','#a2dea7','#9edba4','#98d9a2','#95d6a1','#90d39f','#8bd19d','#88ce9b','#83cb9a','#7fc998','#7ac696','#77c495','#73c094','#6fbd92','#6bbb91','#67b890','#64b58f','#5fb28e','#5baf8d','#57ac8c','#53aa8b','#50a78a','#4ca589','#48a288','#449e87','#3f9c87','#3c9986','#389685','#339384','#2e9184','#288e83','#248b82','#1e8882','#168581','#0c8281','#008080'
      ];

      for (property in config) {
        if (config.hasOwnProperty(property)) {
          this[property] = config[property];
        }
      }

      this._scale = chroma.scale(this._palette).domain([20, 200])
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
      this._updateSvgPoints();
    },

    _updateSvgPoints : function updateSvgPoints() {
      var circle, circle2, frequencies, w, h, inverseFrequencies;

      this.svg = d3.select("svg");
      w = parseInt(this.svg.style("width")) / 5;
      h = parseInt(this.svg.style("height"));

      frequencies = this._getFrequencies(w, h);

      circle = this.svg.selectAll("circle.point")
          .data(frequencies);

      circle.enter().append("circle").attr("class", "point");
      circle.exit().remove();

      circle
        .attr("cx", function(d, i) { return i * w / this.resolution; }.bind(this))
        .attr("cy", function(d, i) { return h - 10 - d * h / 255; })
        .attr("fill", function (d, i) { return this._getColor(d) }.bind(this))
        .attr("r", 2);

      circle2 = this.svg.selectAll("circle.point2")
          .data(frequencies);

      circle2.enter().append("circle").attr("class", "point2");
      circle2.exit().remove();

      circle2
        .attr("cx", function(d, i) { return i * w / this.resolution; }.bind(this))
        .attr("cy", function(d, i) { return 10 + d * h / 255; })
        .attr("fill", function (d, i) { return this._getColor(d) }.bind(this))
        .attr("r", 2);
    },

    // Assume only one analyser
    _getFrequencies : function getFrequencies(w, h) {
      var bufferLength, frequencies, analyserNode;;

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

      return frequencies;
    },

    _getColor : function getColor(f) {
      return this._scale(f).alpha(1).hex();
    }
  }
});
