Module(App, "AudioFactory")({
  _context : null,
  createMicAnalyser : function createMicAnalyser(callback) {
    var entity, node;

    if (!this._context) {
      this._context = new (window.AudioContext || window.webkitAudioContext)();
    }

    entity = new Serpentity.Entity();

    this._getUserMedia({
      audio : true
    }, this._onUserMedia.bind(this, entity, callback), this._onUserMediaError.bind(this, entity, callback))
  },

  _onUserMedia : function _onUserMedia(entity, callback, localMediaStream) {
    var source, analyser;

    source = this._context.createMediaStreamSource(localMediaStream);
    analyser = this._context.createAnalyser();
    source.connect(analyser);

    entity.addComponent(new App.Components.Analyser({
      analyser : analyser
    }));

    entity.addComponent(new App.Components.Configuration({
      clusterRadius: 30
    }));

    App.engine.addEntity(entity);
    callback(entity);
  },

  _onUserMediaError : function _onUserMediaError(entity, callback, error) {
    console.log("Something went wrong", error);
    callback(null);
  },

  _getUserMedia : (navigator.getUserMedia ||
                   navigator.webkitGetUserMedia ||
                   navigator.mozGetUserMedia ||
                   navigator.msGetUserMedia).bind(navigator)
});
