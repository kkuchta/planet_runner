(function() {
  var baseBehaviors, edgeCollisionBehavior, renderer;

  PlanetRunner.world = function(viewWidth, viewHeight) {
    var world;
    world = Physics();
    world.add(renderer());
    world.add(edgeCollisionBehavior(viewWidth, viewHeight));
    world.on('step', function() {
      return world.render();
    });
    Physics.util.ticker.on(function(time) {
      return world.step(time);
    });
    Physics.util.ticker.start();
    world.add(baseBehaviors());
    return world;
  };

  edgeCollisionBehavior = function(viewWidth, viewHeight) {
    var viewportBounds;
    viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
    return Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.95,
      cof: 0.95
    });
  };

  baseBehaviors = function() {
    return [Physics.behavior('body-impulse-response'), Physics.behavior('body-collision-detection'), Physics.behavior('sweep-prune')];
  };

  renderer = function() {
    return renderer = Physics.renderer('canvas', {
      el: 'viewport',
      width: viewWidth,
      height: viewHeight,
      meta: false,
      styles: {
        circle: {
          strokeStyle: '#351024',
          lineWidth: 1,
          fillStyle: '#d33682',
          angleIndicator: '#351024'
        }
      }
    });
  };

}).call(this);
