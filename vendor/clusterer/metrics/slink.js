Module(Clusterer.Metrics, "Slink")({
  measure : function (a, b) {
    var distance = Infinity;

    // Iterate over every pair and find the minimum
    a.children.forEach(function (pointA) {
      b.children.forEach(function (pointB) {
        var d;
        d = Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2));
        distance = (d < distance) ? d : distance;
      });
    });

    return distance;
  }
});
