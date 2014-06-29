class PlanetRunner.Planet

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
