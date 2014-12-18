/**
 * Set a random position for entities from the left at a rand height
 */
Crafty.c("RandBirdPosFromLeft", {
    init: function() {        
        this.attr({
            x: Game.map_bounds.min.x,
            y: Crafty.math.randomInt(0, Game.map_bounds.max.y - 500)
        });
    }
});

/**
 * Set birds a random position when the game starts
 */
Crafty.c("RandBirdPos", {
    init: function() {
        this.attr({
            x: Crafty.math.randomInt(Game.map_bounds.min.x, Game.map_bounds.max.x),
            y: Crafty.math.randomInt(50, Game.map_bounds.max.y - 400),
            rotation: 0
        });
    }
});

/**
 * Set a random position for thermals (up wind)
 */
Crafty.c("RandPosTherm", {
    init: function() {
        this.attr({
            x: Crafty.math.randomInt(Game.map_bounds.min.x, Game.map_bounds.max.x),
            y: Crafty.math.randomInt(50, Game.map_bounds.max.y - 200),
            rotation: 0
        });
    }
});

/**
 * Set the duration for thermals (up wind)
 */
Crafty.c("RandomAppearTime", {
    init: function() {
        this.requires('Delay')
        this.delay(function() {
            // remove the component after a delay
            this.destroy();
        }, Crafty.math.randomInt(5000, 15000), 0);
    }
});