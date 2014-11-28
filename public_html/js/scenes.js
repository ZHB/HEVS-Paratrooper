// spashscreen
Crafty.scene("sce_loading", function() {
    Crafty.background("#111");
   
     // Load our sprite map image
    Crafty.load(['./assets/16x16_forest_1.gif', './assets/loading.png', './assets/hunter.png', './assets/spr_bird.png'], function(){
        // Once the image is loaded...

		Crafty.audio.add({
			planeflyingover: [
				"./sounds/plane-flying-over.mp3",
			],
		});

		
        // Define the individual sprites in the image
        // Each one (spr_tree, etc.) becomes a component
        // These components' names are prefixed with "spr_"
        // to remind us that they simply cause the entity
        // to be drawn with a certain sprite
        Crafty.sprite(16, './assets/16x16_forest_1.gif', {
            spr_tree: [0, 0],
            spr_bush: [1, 0],
            spr_village: [0, 1]
        });
        
        Crafty.sprite("./assets/loading.png", {
            spr_loading: [0,0, 430, 396]
        });
        
        // Define the PC's sprite to be the first sprite in the third row of the
        // animation sprite map
        Crafty.sprite(16, 'assets/hunter.png', {
            spr_player: [0, 2],
        }, 0, 2);
		
		// Define the PC's sprite to be the first sprite in the third row of the
        // animation sprite map
        Crafty.sprite(40, 40, 'assets/spr_bird.png', {
            spr_bird: [0,1]
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

    // draw drop zone
    Crafty.e('jollyBoat').at(Game.map_grid.width / 2 - 3, Game.map_grid.height - 2).dim(6, 1);

    // the plane
    var plane = Crafty.e('Plane').at(0, 50).dim(200, 63);
    plane.bind("KeyDown", function(e) {
        if(e.keyCode === 32) { // see http://craftyjs.com/api/Crafty-keys.html
            jump(plane);
        }
    });

    var shaker = Crafty.e("shaker");
	
	// generate random birds
	for(var i = 0; i < 10; i++)
	{
		var bird = Crafty.e('Bird, RandomPosition');
				bird.collision()
					.onHit("ParatrooperSailOpened", function(e) {

						//shaker.shaker(25);
						
						// birds falls to the ground
						this.addComponent("Gravity").gravity("Floor");
					})
					.onHit("Grass", function(e) {
						// birds falls to the ground
						this.destroy();
					});
	}
	
	
    // generate birds infinitly
    var i = 0;
    while(true) {

		
        var randTime = i * 2500;

        setTimeout(function()
        {
            var bird = Crafty.e('Bird, RandomPositionOnX');
				bird.collision()
					.onHit("ParatrooperSailOpened", function(e) {

						//shaker.shaker(25);
						
						// birds falls to the ground
						this.addComponent("Gravity").gravity("Floor");
					})
					.onHit("Grass", function(e) {
						// birds falls to the ground
						this.destroy();
					});

        }, randTime);

        if(i == 15) {
            break;
        }

        ++i;
    }
});
