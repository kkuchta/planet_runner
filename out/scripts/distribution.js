(function() {
  var MAX_CANDIDATES, closestDistance, distance, sample;

  MAX_CANDIDATES = 10;

  PlanetRunner.randomDistribution = function(maxHeight, maxWidth, radius, count) {
    var acceptedPoints, i, _i;
    acceptedPoints = [];
    for (i = _i = 0; 0 <= count ? _i <= count : _i >= count; i = 0 <= count ? ++_i : --_i) {
      acceptedPoints.push(sample(acceptedPoints, {
        x: radius * 2,
        y: radius * 2
      }, {
        x: maxWidth - radius * 2,
        y: maxHeight - radius * 2
      }));
    }
    return acceptedPoints;
  };

  sample = function(acceptedPoints, min, max) {
    var bestCandidate, bestDistance, candidate, candidateDistance, i, _i;
    bestCandidate = null;
    bestDistance = Infinity;
    for (i = _i = 0; 0 <= MAX_CANDIDATES ? _i <= MAX_CANDIDATES : _i >= MAX_CANDIDATES; i = 0 <= MAX_CANDIDATES ? ++_i : --_i) {
      candidate = {
        x: _.random(min.x, max.x),
        y: _.random(min.y, max.y)
      };
      candidateDistance = closestDistance(candidate, acceptedPoints);
      if (candidateDistance > bestDistance || bestDistance === Infinity) {
        bestDistance = candidateDistance;
        bestCandidate = candidate;
      }
    }
    return bestCandidate;
  };

  distance = function(a, b) {
    var dX, dY;
    dX = a.x - b.x;
    dY = a.y - b.y;
    return Math.sqrt(dX * dX + dY * dY);
  };

  closestDistance = function(candidate, existingPoints) {
    var existingPoint, minDistance, pairDistance, _i, _len;
    minDistance = Infinity;
    for (_i = 0, _len = existingPoints.length; _i < _len; _i++) {
      existingPoint = existingPoints[_i];
      pairDistance = distance(candidate, existingPoint);
      if (pairDistance < minDistance) {
        minDistance = pairDistance;
      }
    }
    return minDistance;
  };

}).call(this);
