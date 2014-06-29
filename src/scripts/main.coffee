$ ->
  window.world = Physics()
  window.viewWidth = window.innerWidth
  window.viewHeight = window.innerHeight

  world.add renderer()

  points = PlanetRunner.randomDistribution(viewHeight, viewWidth, 20, 15)
  for point in points
    planet = new PlanetRunner.Planet(position : point)
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
    Physics.behavior('body-collision-detection'),
    Physics.behavior('sweep-prune'),
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

