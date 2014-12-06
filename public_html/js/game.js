Game = {
     // This defines our grid's size and the size of each of its tiles
    map_grid: {
            width: 60,
            height: 38,
        tile: {
            width: 20,
            height: 20
        }
    },
    map_bounds: {
        min: {
            x: -500,
            y: 0
        },
        max: {
            x: 2000, 
            y:1500
        }
    },
    
    // The total width of the game screen. Since our grid takes up the entire screen
    // this is just the width of a tile times the width of the grid
    width: function() {
        return this.map_grid.width * this.map_grid.tile.width;
    },

    // The total height of the game screen. Since our grid takes up the entire screen
    // this is just the height of a tile times the height of the grid
    height: function() {
        return this.map_grid.height * this.map_grid.tile.height;
    },
    
    paratrooperHasJumped: false, // prevent multiple paratrooper

    // Initialize and start our game
    start: function() {
        // Start crafty and set a background color so that we can see it's working
        Crafty.init(Game.width(), Game.height());

        // call our loading scene
        Crafty.scene("sce_loading");
        
        // reset scores
        $('#game-info input').val(0);
    }
}

/**
 * Create clouds
 * 
 * @returns {undefined}
 */
function drawClouds() 
{
    var number = Crafty.math.randomInt(2, 20);
    
    for(var i = 0; i < number; i++) 
    {
        Crafty.e('Cloud').at(Crafty.math.randomInt(Game.map_bounds.min.x, Game.map_bounds.max.x),  Crafty.math.randomInt(0, Game.map_bounds.max.y - 500));
    }   
}

function jump(plane) 
{       
    var paratrooperBody = Crafty.e('ParatrooperBody').at(plane._x + plane._w / 2, 70);
    Crafty.viewport.centerOn(paratrooperBody, 1000);
    
    paratrooperBody.gravityConst(0.1).gravity("Floor");
    
    var ParatrooperSailOpening = Crafty.e('ParatrooperSailOpening').at(paratrooperBody._x - 60 , paratrooperBody._y - 120);
    paratrooperBody.attach(ParatrooperSailOpening);
    
    // open the sail after 0.8 sec
    paratrooperBody.delay(function() {
            this.antigravity();
            Crafty.viewport.follow(paratrooperBody, 0, 0);
            
        }, 1200, 0);
}