Crafty.c("RandBirdPosFromLeft", {
    init: function() {        
        this.attr({
            x: -500,
            y: Crafty.math.randomInt(0, Game.map_grid.height * Game.map_grid.tile.height - 400)
        });
    }
});

Crafty.c("RandBirdPos", {
    init: function() {
        this.attr({
            x: Crafty.math.randomInt(50, Game.map_grid.width * Game.map_grid.tile.width),
            y: Crafty.math.randomInt(50, Game.map_grid.height * Game.map_grid.tile.height - 400),
            rotation: 0
        });
    }
});

Crafty.c("RandPosTherm", {
    init: function() {
        this.attr({
            x: Crafty.math.randomInt(Game.map_bounds.min.x, Game.map_bounds.max.x),
            y: Crafty.math.randomInt(50, Game.map_grid.height * Game.map_grid.tile.height - 200),
            rotation: 0
        });
    }
});

Crafty.c("RandomPositionFromTop", {
    init: function() {
        this.attr({
            x: Crafty.math.randomInt(50, Game.map_grid.width * Game.map_grid.tile.width),
            y: 0,
            rotation: 0
        });
    }
});

Crafty.c("RandomAppearTime", {
    init: function() {
        this.requires('Delay')
        this.delay(function() {
            // remove the component after a delay
            this.destroy();
        }, Crafty.math.randomInt(3000, 10000), 0);
    }
});