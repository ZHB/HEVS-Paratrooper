Crafty.c("RandomPositionOnX", {
    init: function() {
        this.attr({
            x: 0,
            y: Crafty.math.randomInt(50, Game.map_grid.height * Game.map_grid.tile.height - 200),
            rotation: 0
        });
    }
});

Crafty.c("RandomPosition", {
    init: function() {
        this.attr({
            x: Crafty.math.randomInt(50, Game.map_grid.width * Game.map_grid.tile.width),
            y: Crafty.math.randomInt(50, Game.map_grid.height * Game.map_grid.tile.height - 200),
            rotation: 0
        });
    }
});