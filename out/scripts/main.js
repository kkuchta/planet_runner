(function() {
  var sign;

  $(function() {
    var ball, planet, point, points, world, _i, _len;
    window.viewWidth = window.innerWidth;
    window.viewHeight = window.innerHeight;
    world = PlanetRunner.world(viewWidth, viewHeight);
    points = PlanetRunner.randomDistribution(viewHeight, viewWidth, 20, 15);
    for (_i = 0, _len = points.length; _i < _len; _i++) {
      point = points[_i];
      planet = new PlanetRunner.Planet({
        position: point
      });
      world.add(planet.addable());
    }
    ball = Physics.body('circle', {
      x: 50,
      y: 20,
      vx: -.02,
      vy: .01,
      mass: 100,
      radius: 5,
      restitution: 0.5
    });
    world.add(ball);
    return $(document).keypress(function() {
      var accel, newVX, newVY, vX, vY;
      accel = 0.05;
      vX = ball.state.vel.x;
      vY = ball.state.vel.y;
      newVX = vX + sign(vX) * accel;
      newVY = vY + sign(vY) * accel;
      return ball.applyForce({
        x: newVX,
        y: newVY
      });
    });
  });

  sign = function(number) {
    if (number > 0) {
      return 1;
    } else {
      if (number < 0) {
        return -1;
      } else {
        return 0;
      }
    }
  };

}).call(this);
