PlanetRunner.world = (viewWidth, viewHeight) ->
  world = Physics()
  world.add renderer()
  world.add edgeCollisionBehavior(viewWidth, viewHeight)

  world.on 'step', ->
    world.render()

  Physics.util.ticker.on (time) ->
    world.step time

  Physics.util.ticker.start()

  world.add(baseBehaviors())

  world

edgeCollisionBehavior = (viewWidth, viewHeight) ->
  viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight)
  Physics.behavior 'edge-collision-detection',
    aabb: viewportBounds,
    restitution: 0.95,
    cof: 0.95

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
