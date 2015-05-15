Module(Clusterer.Metrics, "Alink")({
  measure : function (a, b) {
    var sum, distance;

    sum = 0;

    // Iterate over every pair and find the minimum
    a.children.forEach(function (pointA) {
      b.children.forEach(function (pointB) {
        var d;
        d = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
          sum += d;
      });
    });

    distance = sum / (a.children.length * b.children.length);

    return distance;
  }
});
