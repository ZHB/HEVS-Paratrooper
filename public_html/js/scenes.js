// spashscreen
Crafty.scene("sce_loading", function() {
    Crafty.background("#111");
   

     // Load our sprite map image
    Crafty.load(['./assets/16x16_forest_1.gif', './assets/loading.png', './assets/hunter.png', './assets/spr_bird.png', './assets/spr_arrow.png', './sounds/plane-flying-over.mp3'], function(){
        // Once the image is loaded...

        Crafty.audio.add({
                planeflyingover: [
                        "./sounds/plane-flying-over.mp3",
                ],
        });
        
        Crafty.sprite("./assets/loading.png", {
            spr_loading: [0,0, 430, 396]
        });
        

		
        // Define the PC's sprite to be the first sprite in the third row of the
        // animation sprite map
        Crafty.sprite(40, 40, 'assets/spr_bird.png', {
            spr_bird: [0,1]
        });

        Crafty.sprite(42, 42, 'assets/spr_arrow.png', {
            spr_arrow: [0,1]
        });

        // Now that our sprites are ready to draw, start the game on click
        // 215 is half sprite size
        Crafty.e("2D, DOM, spr_loading, Mouse").attr({x: Crafty.viewport.width / 2 - 215}).bind("Click", function(e) {
            Crafty.scene("main");
        });
        
        
    });
}); 

// score screen
Crafty.scene("score", function() {
    /*
     * TODO:
     *  - Afficher les résultats de la position par rapport à la cible
     */
}); 









// Game screen
Crafty.scene("main", function() {
    //Crafty.background('SkyBlue');
    //Crafty.background('url("./images/game-bg.png") no-repeat center bottom / cover #81d4fa');
    Crafty.background('#81d4fa');
	
    /* ############################ [loading scene assets] ############################ */
    
    // Right island
    Crafty.e('RightIsland').at(Game.map_grid.width - 20, Game.map_grid.height - 11).dim(14, 12);
    Crafty.e('LeftIsland').at(0, Game.map_grid.height - 11).dim(15, 13);
    
	
        
    
    Crafty.e('Floor');


    drawClouds();

    // Place grass at bottom of our world
    drawGrass();    

    // draw the jolly boat
    Crafty.e('jollyBoat').at(Game.map_grid.width * Game.map_grid.tile.width / 2 - 3, Game.map_grid.height * Game.map_grid.tile.height - 70).dim(6, 1);
    
    // add extra randomly
    setInterval(function()
    {
            Crafty.e('ExtraUp, RandomPosition, RandomAppearTime');
    }, 4000);

    // the plane
    var plane = Crafty.e('Plane').at(0, 50).dim(200, 63);
    plane.bind("KeyDown", function(e) {
        if(e.keyCode === 32) { // see http://craftyjs.com/api/Crafty-keys.html
            jump(plane);
        }
    });

    var shaker = Crafty.e("shaker");
	
    // generate random birds
    for(var i = 0; i < 7; i++)
    {
        Crafty.e('Bird, RandomPosition');                   
    }

    // generate birds infinitly
    setInterval(function()
    {
        var bird = Crafty.e('Bird, RandomPositionOnX');
    }, Crafty.math.randomInt(4000, 10000));
});
