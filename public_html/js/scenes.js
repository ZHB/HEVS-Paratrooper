// spashscreen
Crafty.scene("sce_loading", function() {
    Crafty.background("#111");
    
    Crafty.paths({ audio: "./sounds/", images: "./assets/", sprites: "./assets/" });
    
    // assets to load
    var assetsObj = {
        "audio": {
            "planeflyingover": ["plane-flying-over.mp3"]
        },
        "images": ["loading.png", "nuage3.png"],
        "sprites": {
            "spr_bird.png": {
                "tile": 40,
                "tileh": 40,
                "map": { "spr_bird": [0,1] }
            },
            "spr_arrow.png": {
                "tile": 100,
                "tileh": 78,
                "map": { "spr_arrow": [0,1] }
            },
            "spr_egg.png": {
                "tile": 32,
                "tileh": 32,
                "map": { "spr_egg": [0,1] }
            }
        }
    };

    // Load our sprite map image
    Crafty.load(assetsObj, function(){
        Crafty.e('2D, Canvas, Mouse, Image')
            .attr({x: Crafty.viewport.width / 2 - 215})
            .image("./assets/loading.png")
            .bind('Click', function(MouseEvent){
                Crafty.scene("main");
            });
    },
    function() {
        console.log("Loading assets");
    },
    function() {
        console.log("Error loading assets");
    }
    );
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
    //Crafty.background('url("./assets/header-bg.png") no-repeat center top #7dcfff');
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
        if(!Crafty.isPaused()) {
            Crafty.e('ExtraUp');
        }
    }, 2000);
    
    

    
    
    // the plane
    var plane = Crafty.e('Plane').at(0, 50).dim(200, 63);
    plane.bind("KeyDown", function(e) {
        if(e.keyCode === 32 && !Crafty.isPaused() && !Game.paratrooperHasJumped) { // see http://craftyjs.com/api/Crafty-keys.html
            Game.paratrooperHasJumped = true; // prevent multiple paratrooper
            jump(plane);
        }
    });
    
    

    var shaker = Crafty.e("shaker");
	
    // generate random birds
    for(var i = 0; i < 5; i++)
    {
        Crafty.e('Bird, RandomPosition');  
    }

    // generate birds infinitly
    setInterval(function()
    {
        Crafty.e('Bird, RandomPositionOnX');        
    }, Crafty.math.randomInt(3000, 20000));
    
    
});
