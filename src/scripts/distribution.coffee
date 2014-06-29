MAX_CANDIDATES = 10

# Best-candidate distribution.  TODO: implement something more fun like Bridson's
# fast poisson disk sampling.  Not that it really solves the problem here any
# better (since we don't really need a completely smooth sampling), but just
# for fun.
PlanetRunner.randomDistribution = (maxHeight, maxWidth, radius, count) ->
  acceptedPoints = []

  for i in [0..count]
    acceptedPoints.push sample(acceptedPoints, {x: radius*2, y: radius*2}, {x: maxWidth - radius*2, y: maxHeight - radius*2})
  acceptedPoints

sample = (acceptedPoints, min, max) ->
  bestCandidate = null
  bestDistance = Infinity
  for i in [0..MAX_CANDIDATES]
    candidate =
      x: _.random(min.x, max.x),
      y: _.random(min.y, max.y)

    candidateDistance = closestDistance(candidate, acceptedPoints)
    if candidateDistance > bestDistance || bestDistance == Infinity
      bestDistance = candidateDistance
      bestCandidate = candidate
  bestCandidate

# Euclidean distance
distance = (a,b) ->
  dX = a.x - b.x
  dY = a.y - b.y
  return Math.sqrt(dX * dX + dY * dY)

closestDistance = (candidate, existingPoints) ->
  minDistance = Infinity
  for existingPoint in existingPoints
    pairDistance = distance(candidate, existingPoint)
    if pairDistance < minDistance
      minDistance = pairDistance
  minDistance

