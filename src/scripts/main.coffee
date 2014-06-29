$ ->
  window.viewWidth = window.innerWidth
  window.viewHeight = window.innerHeight
  world = PlanetRunner.world( viewWidth, viewHeight )

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

sign = (number) ->
  if number > 0 then 1 else (if number < 0 then -1 else 0)
