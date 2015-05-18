Class(App.Systems, "FrequencyD3ClustererRenderer").inherits(Serpentity.System)({
  prototype : {
    _palette : null,
    analysers : null,
    resolution: 64,
    radius: 25,
    shave : 0.6,
    init : function init(config) {
      var property;

      this._clusterer = new Clusterer();
      this._clusterer.metric = Clusterer.Metrics.Slink;

      this._palettes = [["rgb(250, 105, 0)","rgb(105, 210, 231)","rgb(167, 219, 216)","rgb(224, 228, 204)","rgb(243, 134, 48)","rgb(250, 105, 0)"],["rgb(250, 105, 0)","rgb(105, 210, 231)","rgb(167, 219, 216)","rgb(224, 228, 204)","rgb(243, 134, 48)","rgb(250, 105, 0)"],["rgb(131, 175, 155)","rgb(254, 67, 101)","rgb(252, 157, 154)","rgb(249, 205, 173)","rgb(200, 200, 169)","rgb(131, 175, 155)"],["rgb(131, 175, 155)","rgb(254, 67, 101)","rgb(252, 157, 154)","rgb(249, 205, 173)","rgb(200, 200, 169)","rgb(131, 175, 155)"],["rgb(83, 119, 122)","rgb(236, 208, 120)","rgb(217, 91, 67)","rgb(192, 41, 66)","rgb(84, 36, 55)","rgb(83, 119, 122)"],["rgb(83, 119, 122)","rgb(236, 208, 120)","rgb(217, 91, 67)","rgb(192, 41, 66)","rgb(84, 36, 55)","rgb(83, 119, 122)"],["rgb(11, 72, 107)","rgb(207, 240, 158)","rgb(168, 219, 168)","rgb(121, 189, 154)","rgb(59, 134, 134)","rgb(11, 72, 107)"],["rgb(11, 72, 107)","rgb(207, 240, 158)","rgb(168, 219, 168)","rgb(121, 189, 154)","rgb(59, 134, 134)","rgb(11, 72, 107)"],["rgb(196, 77, 88)","rgb(85, 98, 112)","rgb(78, 205, 196)","rgb(199, 244, 100)","rgb(255, 107, 107)","rgb(196, 77, 88)"],["rgb(196, 77, 88)","rgb(85, 98, 112)","rgb(78, 205, 196)","rgb(199, 244, 100)","rgb(255, 107, 107)","rgb(196, 77, 88)"],["rgb(197, 224, 220)","rgb(119, 79, 56)","rgb(224, 142, 121)","rgb(241, 212, 175)","rgb(236, 229, 206)","rgb(197, 224, 220)"],["rgb(197, 224, 220)","rgb(119, 79, 56)","rgb(224, 142, 121)","rgb(241, 212, 175)","rgb(236, 229, 206)","rgb(197, 224, 220)"],["rgb(3, 22, 52)","rgb(232, 221, 203)","rgb(205, 179, 128)","rgb(3, 101, 100)","rgb(3, 54, 73)","rgb(3, 22, 52)"],["rgb(3, 22, 52)","rgb(232, 221, 203)","rgb(205, 179, 128)","rgb(3, 101, 100)","rgb(3, 54, 73)","rgb(3, 22, 52)"],["rgb(245, 105, 145)","rgb(209, 242, 165)","rgb(239, 250, 180)","rgb(255, 196, 140)","rgb(255, 159, 128)","rgb(245, 105, 145)"],["rgb(245, 105, 145)","rgb(209, 242, 165)","rgb(239, 250, 180)","rgb(255, 196, 140)","rgb(255, 159, 128)","rgb(245, 105, 145)"],["rgb(138, 155, 15)","rgb(73, 10, 61)","rgb(189, 21, 80)","rgb(233, 127, 2)","rgb(248, 202, 0)","rgb(138, 155, 15)"],["rgb(138, 155, 15)","rgb(73, 10, 61)","rgb(189, 21, 80)","rgb(233, 127, 2)","rgb(248, 202, 0)","rgb(138, 155, 15)"],["rgb(229, 252, 194)","rgb(89, 79, 79)","rgb(84, 121, 128)","rgb(69, 173, 168)","rgb(157, 224, 173)","rgb(229, 252, 194)"],["rgb(229, 252, 194)","rgb(89, 79, 79)","rgb(84, 121, 128)","rgb(69, 173, 168)","rgb(157, 224, 173)","rgb(229, 252, 194)"],["rgb(237, 201, 81)","rgb(0, 160, 176)","rgb(106, 74, 60)","rgb(204, 51, 63)","rgb(235, 104, 65)","rgb(237, 201, 81)"],["rgb(237, 201, 81)","rgb(0, 160, 176)","rgb(106, 74, 60)","rgb(204, 51, 63)","rgb(235, 104, 65)","rgb(237, 201, 81)"],["rgb(244, 234, 213)","rgb(233, 78, 119)","rgb(214, 129, 137)","rgb(198, 164, 154)","rgb(198, 229, 217)","rgb(244, 234, 213)"],["rgb(244, 234, 213)","rgb(233, 78, 119)","rgb(214, 129, 137)","rgb(198, 164, 154)","rgb(198, 229, 217)","rgb(244, 234, 213)"],["rgb(153, 178, 183)","rgb(217, 206, 178)","rgb(148, 140, 117)","rgb(213, 222, 217)","rgb(122, 106, 83)","rgb(153, 178, 183)"],["rgb(153, 178, 183)","rgb(217, 206, 178)","rgb(148, 140, 117)","rgb(213, 222, 217)","rgb(122, 106, 83)","rgb(153, 178, 183)"],["rgb(255, 61, 127)","rgb(63, 184, 175)","rgb(127, 199, 175)","rgb(218, 216, 167)","rgb(255, 158, 157)","rgb(255, 61, 127)"],["rgb(255, 61, 127)","rgb(63, 184, 175)","rgb(127, 199, 175)","rgb(218, 216, 167)","rgb(255, 158, 157)","rgb(255, 61, 127)"],["rgb(203, 232, 107)","rgb(255, 255, 255)","rgb(203, 232, 107)","rgb(242, 233, 225)","rgb(28, 20, 13)","rgb(203, 232, 107)"],["rgb(203, 232, 107)","rgb(255, 255, 255)","rgb(203, 232, 107)","rgb(242, 233, 225)","rgb(28, 20, 13)","rgb(203, 232, 107)"]];

      this._palette = [
        '#8b0000','#91000a','#960212','#9d0519','#a2081f','#a70d25','#ac122c','#b11732','#b61b37','#ba213e','#bf2543','#c32b48','#c7304d','#cb3453','#cf3a58','#d23f5d','#d64563','#da4967','#dd4e6c','#e05471','#e35976','#e65e7a','#e9647f','#eb6984','#ee6e88','#f0748c','#f27990','#f47e94','#f68599','#f88a9c','#fa8fa1','#fb95a4','#fd9ba8','#fea0ac','#ffa6b0','#ffacb3','#ffb1b7','#ffb7bb','#ffbdbe','#ffc4c2','#ffc9c5','#ffd0c9','#ffd4cb','#ffdbce','#ffe1d2','#ffe5d4','#ffebd7','#fff2da','#fff6dc','#fffcdf','#fbffdd','#f3fdd7','#ecfcd2','#e4facc','#def8c8','#d8f6c4','#d1f3c0','#ccf2bd','#c6efba','#c0edb6','#bbebb3','#b7e8b1','#b0e6ad','#ace4ab','#a7e1a9','#a2dea7','#9edba4','#98d9a2','#95d6a1','#90d39f','#8bd19d','#88ce9b','#83cb9a','#7fc998','#7ac696','#77c495','#73c094','#6fbd92','#6bbb91','#67b890','#64b58f','#5fb28e','#5baf8d','#57ac8c','#53aa8b','#50a78a','#4ca589','#48a288','#449e87','#3f9c87','#3c9986','#389685','#339384','#2e9184','#288e83','#248b82','#1e8882','#168581','#0c8281','#008080'
      ];

      for (property in config) {
        if (config.hasOwnProperty(property)) {
          this[property] = config[property];
        }
      }

      this._scale = chroma.scale(this._palette).domain([0, 20])
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
      var frequencies, radius, clusters, w, h, config;

      this._switchColor();

      this.svg = d3.select("svg");

      w = parseInt(this.svg.style("width"));
      h = parseInt(this.svg.style("height"));

      radius = this.radius;
      if (this.analysers[0]) {
        config = this.analysers[0].configuration.config;
        if (config) {
          radius = config.clusterRadius;
        }
      }

      frequencies = this._getFrequencies(w, h);
      clusters = this._clusterer.cluster(frequencies, w / radius);
      this._updateClusters(clusters);
    },

    _updateClusters : function updateSvgPoints(clusters) {
      var frequencies, clusters, circle, frequencies;

      circle = this.svg.selectAll("circle.cluster")
          .data(clusters);

      circle.enter().append("circle").attr("class", "cluster");
      circle.exit().attr("class", "fading");

      circle
        .attr("cx", function(d) { return d.enclosingCircle().x; })
        .attr("cy", function(d) { return d.enclosingCircle().y; })
        .attr('stroke', function (d, i) { return this._getColor(i)}.bind(this))
        .attr('fill', function (d, i) { return this._getTransparentColor(i)}.bind(this))
        .attr('r', function (d) { return d.enclosingCircle().radius + 10; }.bind(this))
    },

    // Assume only one analyser
    _getFrequencies : function getFrequencies(w, h) {
      var bufferLength, frequencies, frequencyPoints, analyserNode, 
          finalFrequencies, newLength;

      frequencies = [];
      frequencyPoints = [];

      this.analysers.forEach(function (analyser) {
        analyserNode = analyser.analyser.analyser;

        analyserNode.fftSize = this.resolution * 2;
        bufferLength = analyserNode.frequencyBinCount;
        frequencies = new Uint8Array(bufferLength);
        analyserNode.getByteFrequencyData(frequencies);
      }, this);

      newLength = Math.round(frequencies.length * this.shave);
      frequencies = Array.prototype.slice.call(frequencies, 0, newLength)

      finalFrequencies = frequencies.map(function (frequency, i) {
        return {
          x: i * w / Math.round(this.resolution * this.shave),
          y: h - 10 - frequency * h / 255
        };
      }, this);

      finalFrequencies = finalFrequencies.concat(frequencies.map(function (frequency, i) {
        return {
          x: i * w / Math.round(this.resolution * this.shave),
          y: 10 + frequency * h / 255
        };
      }, this));

      return finalFrequencies;
    },

    _getColor : function (f) {
      var color = this._scale(f).alpha(1).rgba();
      return "rgba(" + Math.round(color[0]) + "," + Math.round(color[1]) + "," + Math.round(color[2]) + ", " + color[3] + ")";
    },

    _getTransparentColor : function (f) {
      var color = this._scale(f).alpha(0.2).rgba();
      return "rgba(" + Math.round(color[0]) + "," + Math.round(color[1]) + "," + Math.round(color[2]) + ", " + color[3] + ")";
    },

    _switchColor : function () {
      var palette;
      if (this.analysers[0] && this.analysers[0].configuration.config.switchColor) {
        this.analysers[0].configuration.config.switchColor = false;
        palette = Math.floor(Math.random() * this._palettes.length);
        this._scale = chroma.scale(this._palettes[palette]).domain([0, 20])
      }
      if (this.analysers[0] && this.analysers[0].configuration.config.resetColor) {
        this.analysers[0].configuration.config.resetColor = false;
        this._scale = chroma.scale(this._palette).domain([0, 20])
      }
    }
  }
});
