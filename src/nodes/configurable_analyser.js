'use strict';

Class(App.Nodes, "ConfigurableAnalyser").inherits(Serpentity.Node)({
  types : {
    analyser : App.Components.Analyser,
    configuration : App.Components.Configuration
  }
});
