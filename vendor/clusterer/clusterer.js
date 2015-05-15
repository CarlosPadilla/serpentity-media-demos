Class("Clusterer")({
  Metrics : {},
  prototype : {
    metric : null,

    // Receives array of points, sets them their cluster ID
    cluster : function (points, target) {
      var clusters;

      if (!this.metric || !this.metric.measure) {
        console.log("There's no valid metric")
        return;
      }

      clusters = points.map(function(point) {
        return new Cluster({
          children: [point]
        });
      })

      this._cluster(clusters, target);

      // Assign the points their numbers
      clusters.forEach(function (cluster, i) {
        cluster.children.forEach(function (point) {
          point.cluster = i;
        })
      });

      return clusters;
    },

    // Receives array of clusters, attempts to merge;
    _cluster : function _cluster(clusters, target) {
      var distances, minDistance, mergeeA, mergeeB, location;

      // Only one cluster left, we're done.
      if (clusters.length === 1) {
        return;
      }

      // Lets get the distance matrix.
      distances = this._getDistanceMatrix(clusters);
      minDistance = Infinity;

      // Lets get the minimum distance from this matrix.
      distances.forEach(function (subDistances, i) {
        subDistances.forEach(function (distance, j) {
          if (i === j) {
            return;
          }

          if (distance < minDistance) {
            minDistance = distance;
            mergeeA = clusters[i];
            mergeeB = clusters[j];
          }
        });
      });

      // The minimum distance is larger than the target...
      // Nothing to merge, we're done.
      if (minDistance > target) {
        return;
      }

      // Remove the old clusters, and add the merged one.
      location = clusters.indexOf(mergeeA);
      clusters.splice(location, 1);
      location = clusters.indexOf(mergeeB);
      clusters.splice(location, 1);

      clusters.push(Cluster.merge(mergeeA, mergeeB))

      return this._cluster(clusters, target);
    },

    _getDistanceMatrix : function getDistanceMatrix(clusters) {
      var matrix = [];

      clusters.forEach(function (cluster, i) {
        matrix[i] = [];
        clusters.forEach(function (otherCluster, j) {
          matrix[i][j] = this.metric.measure(cluster, otherCluster);
        }.bind(this));
      }.bind(this));

      return matrix;
    }
  },
})
