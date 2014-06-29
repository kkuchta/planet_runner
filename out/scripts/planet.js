(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  PlanetRunner.Planet = (function() {
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
