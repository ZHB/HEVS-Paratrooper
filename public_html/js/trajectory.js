Crafty.c("RandomPositionOnX", {
    init: function() {
        this.attr({
            x: 0,
            y: Crafty.math.randomInt(0, Game.map_grid.height * Game.map_grid.tile.height - 400),
            rotation: 0
        });
    }
});

Crafty.c("RandomPosition", {
    init: function() {
        this.attr({
            x: Crafty.math.randomInt(50, Game.map_grid.width * Game.map_grid.tile.width),
            y: Crafty.math.randomInt(50, Game.map_grid.height * Game.map_grid.tile.height - 400),
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