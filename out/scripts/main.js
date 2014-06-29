(function() {
  var Planet, baseBehaviors, randomDistribution, renderer, sign,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  $(function() {
    var ball, planet, point, points, viewportBounds, _i, _len;
    window.world = Physics();
    window.viewWidth = window.innerWidth;
    window.viewHeight = window.innerHeight;
    world.add(renderer());
    points = randomDistribution(viewHeight, viewWidth, 20, 15);
    console.log("Points =", points);
    for (_i = 0, _len = points.length; _i < _len; _i++) {
      point = points[_i];
      planet = new Planet({
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
    $(document).keypress(function() {
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
    viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
    world.add(Physics.behavior('edge-collision-detection', {
      aabb: viewportBounds,
      restitution: 0.95,
      cof: 0.95
    }));
    world.add(baseBehaviors());
    world.on('step', function() {
      return world.render();
    });
    Physics.util.ticker.on(function(time) {
      return world.step(time);
    });
    return Physics.util.ticker.start();
  });

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

  randomDistribution = function(maxHeight, maxWidth, radius, count) {
    var acceptedPoints, closestDistance, distance, i, maxCandidates, sample, _i;
    maxCandidates = 10;
    acceptedPoints = [];
    distance = function(a, b) {
      var dX, dY;
      dX = a.x - b.x;
      dY = a.y - b.y;
      return Math.sqrt(dX * dX + dY * dY);
    };
    closestDistance = function(candidate) {
      var existingPoint, minDistance, pairDistance, _i, _len;
      minDistance = Infinity;
      for (_i = 0, _len = acceptedPoints.length; _i < _len; _i++) {
        existingPoint = acceptedPoints[_i];
        pairDistance = distance(candidate, existingPoint);
        if (pairDistance < minDistance) {
          minDistance = pairDistance;
        }
      }
      return minDistance;
    };
    sample = function() {
      var bestCandidate, bestDistance, candidate, candidateDistance, i, _i;
      bestCandidate = null;
      bestDistance = Infinity;
      for (i = _i = 0; 0 <= maxCandidates ? _i <= maxCandidates : _i >= maxCandidates; i = 0 <= maxCandidates ? ++_i : --_i) {
        candidate = {
          x: _.random(radius * 2, maxWidth - radius * 2),
          y: _.random(radius * 2, maxHeight - radius * 2)
        };
        candidateDistance = closestDistance(candidate);
        if (candidateDistance > bestDistance || bestDistance === Infinity) {
          bestDistance = candidateDistance;
          bestCandidate = candidate;
        }
      }
      return bestCandidate;
    };
    for (i = _i = 0; 0 <= count ? _i <= count : _i >= count; i = 0 <= count ? ++_i : --_i) {
      acceptedPoints.push(sample());
    }
    return acceptedPoints;
  };

  Planet = (function() {
    Planet.prototype.defaults = {
      position: {
        x: 100,
        y: 100
      },
      mass: 10,
      radius: 20
    };

    function Planet(options) {
      var new_options;
      if (options == null) {
        options = {};
      }
      this.shape = __bind(this.shape, this);
      this.attractor = __bind(this.attractor, this);
      this.addable = __bind(this.addable, this);
      new_options = _.pick(_.defaults(options, this.defaults), _.keys(this.defaults));
      _.assign(this, new_options);
    }

    Planet.prototype.addable = function() {
      return [this.attractor(), this.shape()];
    };

    Planet.prototype.attractor = function() {
      return Physics.behavior('attractor', {
        order: 2,
        strength: 0.5,
        pos: this.position
      });
    };

    Planet.prototype.shape = function() {
      return Physics.body('circle', {
        treatment: 'static',
        x: this.position.x,
        y: this.position.y,
        vx: 0,
        vy: 0,
        mass: this.mass,
        radius: this.radius,
        restitution: 0.5
      });
    };

    return Planet;

  })();

}).call(this);
