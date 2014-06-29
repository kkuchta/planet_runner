$ ->
  window.world = Physics()
  window.viewWidth = window.innerWidth
  window.viewHeight = window.innerHeight

  world.add renderer()

  #for i in [0..5]
    #planet = new Planet(position : {x: Math.random() * viewWidth, y: Math.random() * viewHeight})
    #world.add( planet.addable() )
  points = randomDistribution(viewHeight, viewWidth, 20, 15)
  console.log "Points =", points
  for point in points
    planet = new Planet(position : point)
    world.add(planet.addable())

  ball = Physics.body( 'circle',
    x: 50,
    y: 20,
    vx: -.02,
    vy: .01,
    mass: 100
    radius: 5,
    restitution: 0.5
  )
  world.add( ball )

  $(document).keypress( ->
    accel = 0.05
    vX = ball.state.vel.x
    vY = ball.state.vel.y
    newVX = vX + sign(vX) * accel
    newVY = vY + sign(vY) * accel
    ball.applyForce(x: newVX, y: newVY)
  )

  viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight)
  world.add( Physics.behavior 'edge-collision-detection',
    aabb: viewportBounds,
    restitution: 0.95,
    cof: 0.95
  )
  world.add(baseBehaviors())

  world.on 'step', ->
    world.render()

  Physics.util.ticker.on (time) ->
    world.step time

  Physics.util.ticker.start()

baseBehaviors = ->
  [
    Physics.behavior('body-impulse-response'),
    #Physics.behavior('constant-acceleration'),
    Physics.behavior('body-collision-detection'),
    Physics.behavior('sweep-prune'),
    #Physics.behavior('attractor')
    #Physics.behavior('newtonian', { strength: .1 })
  ]

renderer = ->
  renderer = Physics.renderer 'canvas',
    el: 'viewport',
    width: viewWidth,
    height: viewHeight,
    meta: false,
    styles:
      circle:
          strokeStyle: '#351024',
          lineWidth: 1,
          fillStyle: '#d33682',
          angleIndicator: '#351024'

sign = (number) ->
  if number > 0 then 1 else (if number < 0 then -1 else 0)

randomDistribution = (maxHeight, maxWidth, radius, count) ->
  
  # Best-candidate distribution.  TODO: implement something better like Bridson's
  # fast poisson disk sampling
  maxCandidates = 10
  acceptedPoints = []

  distance = (a,b) ->
    dX = a.x - b.x
    dY = a.y - b.y
    return Math.sqrt(dX * dX + dY * dY)

  closestDistance = (candidate) ->
    minDistance = Infinity
    for existingPoint in acceptedPoints
      pairDistance = distance(candidate, existingPoint)
      if pairDistance < minDistance
        minDistance = pairDistance
    minDistance

  sample = ->
    bestCandidate = null
    bestDistance = Infinity
    for i in [0..maxCandidates]
      candidate =
        x: _.random(radius*2, maxWidth - radius*2),
        y: _.random(radius*2, maxHeight - radius*2)

      candidateDistance = closestDistance(candidate)
      if candidateDistance > bestDistance || bestDistance == Infinity
        bestDistance = candidateDistance
        bestCandidate = candidate
    bestCandidate

  for i in [0..count]
    acceptedPoints.push sample()
  acceptedPoints


class Planet

  defaults:
    position: {x: 100, y: 100}
    mass: 10
    radius: 20

  constructor: (options = {}) ->
    new_options = _.pick(_.defaults( options, @defaults ), _.keys(@defaults))
    _.assign( @, new_options )

  addable: =>
    [
      @attractor()
      @shape()
    ]

  attractor: =>
    Physics.behavior('attractor',
      order: 2,
      strength: 0.5,
      pos: @position
    )

  shape: =>
    Physics.body( 'circle',
      treatment: 'static'
      x: @position.x,
      y: @position.y,
      vx: 0,
      vy: 0,
      mass: @mass
      radius: @radius,
      restitution: 0.5
    )

