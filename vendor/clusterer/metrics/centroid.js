Module(Clusterer.Metrics, "Centroid")({
  measure : function (a, b) {
    var centroidA, centroidB, distance;

    centroidA = a.centroid();
    centroidB = b.centroid();

    // Iterate over every pair and find the minimum
    distance = Math.sqrt(Math.pow(centroidB.x - centroidA.x, 2) + Math.pow(centroidB.y - centroidA.y, 2));

    return distance;
  }
});
