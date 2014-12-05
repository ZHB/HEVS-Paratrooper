/*
 * 
 * http://jsfiddle.net/LgEbq/128/
 */

Game = {
     // This defines our grid's size and the size of each of its tiles
    map_grid: {
            width: 75,
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
            y:900
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
        
        
        $('#game-info input').val(0);
    }
}


/**
 * Draw grass at the bottom of the world
 * 
 * @returns void
 */
function drawGrass() 
{
    Crafty.e('Water');
    /*
    // Add grass fow the whole world width
    for (var x = Game.map_grid.width * -1.5; x < Game.map_grid.width * 1.5; x++) {
        for (var y = Game.map_grid.height - 1; y < Game.map_grid.height + 10; y++) {
            Crafty.e('Water').at(
                x, 
                y // last tile
            );
        }
    }*/
}

/**
 * Create clouds
 * 
 * @returns {undefined}
 */
function drawClouds() 
{
    var number = Crafty.math.randomInt(2, 7);
    
    for(var i = 0; i < number; i++) 
    {
        Crafty.e('Cloud').at(Crafty.math.randomInt(Game.map_bounds.min.x, Game.map_bounds.max.x),  Crafty.math.randomInt(100, 400));
    }
    
}


function jump(plane) 
{       
    var plane_width = plane._w;
    var plane_position = plane._x;
    
    
    var paratrooperBody = Crafty.e('ParatrooperBody').at(plane_position + plane_width / 2, 70);
    Crafty.viewport.centerOn(paratrooperBody, 1000);
    
    
    
    paratrooperBody.gravityConst(0.1).gravity("Floor");
    
    var ParatrooperSailOpening = Crafty.e('ParatrooperSailOpening').at(paratrooperBody._x - 60 , paratrooperBody._y - 120);
    paratrooperBody.attach(ParatrooperSailOpening);
    
    
    // open the sail after 0.8 sec
    paratrooperBody.delay(function() {
            // destroy the paratrooper before creating the new one with the parachute
            //this.destroy();
            
            // add the paratrooper with opened sail
            //var paratrooperBody = Crafty.e('ParatrooperBody').at(parachute._x, parachute._y);
            this.antigravity();
            Crafty.viewport.follow(paratrooperBody, 0, 0);
            
            //var ParatrooperSail = Crafty.e('ParatrooperSail').at(paratrooperBody._x - 60 , paratrooperBody._y - 120);
            //paratrooperBody.attach(ParatrooperSail);
            
                
            //Crafty.viewport.follow(paraSailOpened, 0, 0);
        }, 1000, 0);
}
/*
function jump(plane) 
{       
    var plane_width = plane._w;
    var plane_position = plane._x;
    
    // jump from the middle of the plane
    parachute = Crafty.e('ParatrooperSailClosed').at(plane_position + plane_width / 2, 70);
    var ParatrooperSailOpening = Crafty.e('ParatrooperSailOpening').at(parachute._x - 60 , parachute._y - 120);
    parachute.attach(ParatrooperSailOpening);
    
    // open the sail after 0.8 sec
    parachute.delay(function() {
            // destroy the paratrooper before creating the new one with the parachute
            this.destroy();
            
            // add the paratrooper with opened sail
            var paratrooperBody = Crafty.e('ParatrooperBody').at(parachute._x, parachute._y);
            var ParatrooperSail = Crafty.e('ParatrooperSail').at(parachute._x - 60 , parachute._y - 120);

            
            paratrooperBody.attach(ParatrooperSail);
            
                
            //Crafty.viewport.follow(paraSailOpened, 0, 0);
        }, 800, 0);
}*/
