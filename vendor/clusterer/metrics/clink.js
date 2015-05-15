Module(Clusterer.Metrics, "Clink")({
  measure : function (a, b) {
    var distance = 0;

    // Iterate over every pair and find the maximum
    a.children.forEach(function (pointA) {
      b.children.forEach(function (pointB) {
        var d;
        d = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
        if (d > distance) {
          distance = d;
        }
      });
    });

    return distance;
  }
});
