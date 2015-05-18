'use strict';

Class(App.Systems, "FrequencyColorRenderer").inherits(Serpentity.System)({
  prototype : {
    _palette : null,
    analysers : null,
    resolution : 128,
    shave : 0.4,
    init : function init(config) {
      var property;

      this._palettes = [["rgb(250, 105, 0)","rgb(105, 210, 231)","rgb(167, 219, 216)","rgb(224, 228, 204)","rgb(243, 134, 48)","rgb(250, 105, 0)"],["rgb(250, 105, 0)","rgb(105, 210, 231)","rgb(167, 219, 216)","rgb(224, 228, 204)","rgb(243, 134, 48)","rgb(250, 105, 0)"],["rgb(131, 175, 155)","rgb(254, 67, 101)","rgb(252, 157, 154)","rgb(249, 205, 173)","rgb(200, 200, 169)","rgb(131, 175, 155)"],["rgb(131, 175, 155)","rgb(254, 67, 101)","rgb(252, 157, 154)","rgb(249, 205, 173)","rgb(200, 200, 169)","rgb(131, 175, 155)"],["rgb(83, 119, 122)","rgb(236, 208, 120)","rgb(217, 91, 67)","rgb(192, 41, 66)","rgb(84, 36, 55)","rgb(83, 119, 122)"],["rgb(83, 119, 122)","rgb(236, 208, 120)","rgb(217, 91, 67)","rgb(192, 41, 66)","rgb(84, 36, 55)","rgb(83, 119, 122)"],["rgb(11, 72, 107)","rgb(207, 240, 158)","rgb(168, 219, 168)","rgb(121, 189, 154)","rgb(59, 134, 134)","rgb(11, 72, 107)"],["rgb(11, 72, 107)","rgb(207, 240, 158)","rgb(168, 219, 168)","rgb(121, 189, 154)","rgb(59, 134, 134)","rgb(11, 72, 107)"],["rgb(196, 77, 88)","rgb(85, 98, 112)","rgb(78, 205, 196)","rgb(199, 244, 100)","rgb(255, 107, 107)","rgb(196, 77, 88)"],["rgb(196, 77, 88)","rgb(85, 98, 112)","rgb(78, 205, 196)","rgb(199, 244, 100)","rgb(255, 107, 107)","rgb(196, 77, 88)"],["rgb(197, 224, 220)","rgb(119, 79, 56)","rgb(224, 142, 121)","rgb(241, 212, 175)","rgb(236, 229, 206)","rgb(197, 224, 220)"],["rgb(197, 224, 220)","rgb(119, 79, 56)","rgb(224, 142, 121)","rgb(241, 212, 175)","rgb(236, 229, 206)","rgb(197, 224, 220)"],["rgb(3, 22, 52)","rgb(232, 221, 203)","rgb(205, 179, 128)","rgb(3, 101, 100)","rgb(3, 54, 73)","rgb(3, 22, 52)"],["rgb(3, 22, 52)","rgb(232, 221, 203)","rgb(205, 179, 128)","rgb(3, 101, 100)","rgb(3, 54, 73)","rgb(3, 22, 52)"],["rgb(245, 105, 145)","rgb(209, 242, 165)","rgb(239, 250, 180)","rgb(255, 196, 140)","rgb(255, 159, 128)","rgb(245, 105, 145)"],["rgb(245, 105, 145)","rgb(209, 242, 165)","rgb(239, 250, 180)","rgb(255, 196, 140)","rgb(255, 159, 128)","rgb(245, 105, 145)"],["rgb(138, 155, 15)","rgb(73, 10, 61)","rgb(189, 21, 80)","rgb(233, 127, 2)","rgb(248, 202, 0)","rgb(138, 155, 15)"],["rgb(138, 155, 15)","rgb(73, 10, 61)","rgb(189, 21, 80)","rgb(233, 127, 2)","rgb(248, 202, 0)","rgb(138, 155, 15)"],["rgb(229, 252, 194)","rgb(89, 79, 79)","rgb(84, 121, 128)","rgb(69, 173, 168)","rgb(157, 224, 173)","rgb(229, 252, 194)"],["rgb(229, 252, 194)","rgb(89, 79, 79)","rgb(84, 121, 128)","rgb(69, 173, 168)","rgb(157, 224, 173)","rgb(229, 252, 194)"],["rgb(237, 201, 81)","rgb(0, 160, 176)","rgb(106, 74, 60)","rgb(204, 51, 63)","rgb(235, 104, 65)","rgb(237, 201, 81)"],["rgb(237, 201, 81)","rgb(0, 160, 176)","rgb(106, 74, 60)","rgb(204, 51, 63)","rgb(235, 104, 65)","rgb(237, 201, 81)"],["rgb(244, 234, 213)","rgb(233, 78, 119)","rgb(214, 129, 137)","rgb(198, 164, 154)","rgb(198, 229, 217)","rgb(244, 234, 213)"],["rgb(244, 234, 213)","rgb(233, 78, 119)","rgb(214, 129, 137)","rgb(198, 164, 154)","rgb(198, 229, 217)","rgb(244, 234, 213)"],["rgb(153, 178, 183)","rgb(217, 206, 178)","rgb(148, 140, 117)","rgb(213, 222, 217)","rgb(122, 106, 83)","rgb(153, 178, 183)"],["rgb(153, 178, 183)","rgb(217, 206, 178)","rgb(148, 140, 117)","rgb(213, 222, 217)","rgb(122, 106, 83)","rgb(153, 178, 183)"],["rgb(255, 61, 127)","rgb(63, 184, 175)","rgb(127, 199, 175)","rgb(218, 216, 167)","rgb(255, 158, 157)","rgb(255, 61, 127)"],["rgb(255, 61, 127)","rgb(63, 184, 175)","rgb(127, 199, 175)","rgb(218, 216, 167)","rgb(255, 158, 157)","rgb(255, 61, 127)"],["rgb(203, 232, 107)","rgb(255, 255, 255)","rgb(203, 232, 107)","rgb(242, 233, 225)","rgb(28, 20, 13)","rgb(203, 232, 107)"],["rgb(203, 232, 107)","rgb(255, 255, 255)","rgb(203, 232, 107)","rgb(242, 233, 225)","rgb(28, 20, 13)","rgb(203, 232, 107)"]];
      this._palette = ["#DC8571","#E396B1","#B7BAE1","#7FDDE0","#9AF2B1","#F4F785"]

      for (property in config) {
        if (config.hasOwnProperty(property)) {
          this[property] = config[property];
        }
      }

      this._scale = chroma.scale(this._palette).domain([0, 5])
    },

    added : function added(engine) {
      this.analysers = engine.getNodes(App.Nodes.ConfigurableAnalyser);
    },
    removed : function removed(engine) {
      this.svg.select("rect.color-frequency").remove();
      this.svg = null;
      this.analysers = null;
    },
    update : function update(dt) {
      this._switchColor();
      this._renderColor();
    },

    _renderColor : function renderColor() {
      var rect, frequencies, average, size, bandSize, histogram, averages, max;

      this.svg = d3.select("svg");

      rect = this.svg.select('rect.color-frequency');

      if (this.analysers[0] && !this.analysers[0].configuration.config.showBackground) {
        return rect.attr('fill', '#ffffff');
      }

      frequencies = this._getFrequencies();
      size = frequencies.length;
      bandSize = Math.round(size / this._palette.length);

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

      max = Math.max.apply(null, averages);
      max = averages.indexOf(max);

      rect.attr('fill', this._getColor(max));
    },

    // Assume only one analyser
    _getFrequencies : function getFrequencies(w, h) {
      var bufferLength, frequencies, analyserNode, newLength;

      frequencies = [];

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
      return this._scale(f).alpha(0.5).css();
    },

    _switchColor : function () {
      var palette;
      if (this.analysers[0] && this.analysers[0].configuration.config.switchColorBg) {
        this.analysers[0].configuration.config.switchColorBg = false;
        palette = Math.floor(Math.random() * this._palettes.length);
        this._scale = chroma.scale(this._palettes[palette]).domain([0, 5])
      }
      if (this.analysers[0] && this.analysers[0].configuration.config.resetColorBg) {
        this.analysers[0].configuration.config.resetColorBg = false;
        this._scale = chroma.scale(this._palette).domain([0, 5])
      }
    }
  }
});
