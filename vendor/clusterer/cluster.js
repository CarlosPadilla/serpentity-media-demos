Class("Cluster")({

  // Merges two clusters and returns a new one.
  merge : function (a, b) {
    var newChildren = [];

    a.children.forEach(function (child) {
      newChildren.push(child);
    });

    b.children.forEach(function (child) {
      newChildren.push(child);
    });

    return new Cluster({children: newChildren});
  },

  prototype : {
    children : null,

    init : function init(config) {
      var property;

      this.children = [];

      for (property in config) {
        if (config.hasOwnProperty(property)) {
          this[property] = config[property];
        }
      }
    },

    enclosingCircle : function centroid() {
      var circle, centroid;

      circle = {
        radius : 0
      };

      centroid = this.centroid();
      circle.x = centroid.x;
      circle.y = centroid.y;

      this.children.forEach(function (item) {
        var d = Math.sqrt(Math.pow(item.x - circle.x, 2) + Math.pow(item.y - circle.y, 2));
        if (d > circle.radius) {
          circle.radius = d;
        }
      });

      return circle;
    },

    centroid : function getCentroid() {
      var centroid = {};

      centroid.x = this.children.reduce(function sumX(mem, item) {
        return mem + item.x;
      }, 0) / this.children.length;

      centroid.y = this.children.reduce(function sumX(mem, item) {
        return mem + item.y;
      }, 0) / this.children.length;

      return centroid;
    }
  }
});
