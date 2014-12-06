// spashscreen
Crafty.scene("sce_loading", function() {
    Crafty.background("#111");
    
    Crafty.paths({ audio: "./sounds/", images: "./assets/", sprites: "./assets/" });
    
    // assets to load
    var assetsObj = {
        "audio": {
            "planeflyingover": ["plane-flying-over.mp3"]
        },
        "images": ["loading.png", "nuage3.png", "water.jpg"],
        "sprites": {
            "spr_bird.png": {
                "tile": 40,
                "tileh": 40,
                "map": { "spr_bird": [0,1] }
            },
            "spr_arrow.png": {
                "tile": 50,
                "tileh": 45,
                "map": { "spr_arrow": [0,1] }
            },
            "spr_egg.png": {
                "tile": 32,
                "tileh": 32,
                "map": { "spr_egg": [0,1] }
            },
             "spr_sailopening.png": {
                "tile": 150,
                "tileh": 127,
                "map": { "spr_sailopening": [0,1] }
            },
            "spr_jollyboat.png": {
                "tile": 200,
                "tileh": 100,
                "map": { "spr_jollyboat": [0,1] }
            }
        }
    };
    // spr_jollyboat.png
    // Load our sprite map image
    Crafty.load(assetsObj, function(){
        Crafty.e('2D, Canvas, Mouse, Image')
            .attr({x: Crafty.viewport.width / 2 - 215})
            .image("./assets/loading.png")
            .bind('Click', function(MouseEvent){
                Crafty.scene("main");
                //Crafty.scene("score");
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
    
    
    // load best scores
    var winScores = Crafty.storage('winScores');
    
    // get the current score
    var myScore = $('.scoreTotal').val();

     // add last score to the array (at the end)
    winScores.push(myScore);

    // sort the array
    winScores.sort(function(a, b) {return b-a});

    // remove last element
    if (winScores.length > 5) {
        winScores.splice(5, 5);
    }

    // store score if needed
    Crafty.storage('winScores', winScores);
        
    Crafty.background('url("./assets/scores-template.png") no-repeat center top #111');    

    Crafty.e("DOM, Text")
            .attr({ x: 562, y: 230 })
            .textFont({ family: '"Agency FB", Arial', size: '200px', weight: 'bold', width: '100%' })
            .text(myScore)
            .textColor('#ffffff');
    
    var i = 0;
    for (var key in winScores)
    {

        Crafty.e("DOM, Text")
            .attr({ x: 582, y: 560 + i })
            .textFont({ family: '"Agency FB", Arial', size: '50px', weight: 'bold', width: '100%' })
            .text(winScores[key])
            .textColor('#ffffff');
    
        i = i + 50;
     }
    
    //Crafty.stop(true);
}); 









// Game screen
Crafty.scene("main", function() {
    
    Crafty.viewport.bounds = {min:{x:-500, y:0}, max:{x:2000, y:900}};
    
    //Crafty.background('SkyBlue');
    //Crafty.background('url("./assets/header-bg.png") no-repeat center top #7dcfff');
    Crafty.background('#81d4fa');
	
    /* ############################ [loading scene assets] ############################ */
    
    // Right island
    Crafty.e('RightIsland').at(Game.map_grid.width - 20, Game.map_grid.height - 11).dim(14, 12);
    Crafty.e('LeftIsland').at(0, Game.map_grid.height - 8).dim(15, 13);
    
	
     
    
    Crafty.e('Floor');

    
    drawClouds();
    Crafty.e('WaterCollision');
    

    
    // Place grass at bottom of our world
    drawGrass();    
    
    

    // draw the jolly boat
    var jollyBoat = Crafty.e('jollyBoat').at(Game.map_grid.width * Game.map_grid.tile.width / 2 - 3, Game.map_grid.height * Game.map_grid.tile.height - 30);
    
    var Nest = Crafty.e('Nest').at(jollyBoat._x + 90 , jollyBoat._y + 10 );
    jollyBoat.attach(Nest);
    
    
    // add extra randomly
    setInterval(function()
    {   
        if(!Crafty.isPaused()) {
            Crafty.e('ExtraUp');
        }
    }, 1500);
    
   
    // the plane
    var plane = Crafty.e('Plane').at(0, 50).dim(200, 63);
    
    
    //Crafty.viewport.follow(plane, 0, 0);
    
    plane.bind("KeyDown", function(e) {
        if(e.keyCode === 32 && !Crafty.isPaused() && !Game.paratrooperHasJumped) { // see http://craftyjs.com/api/Crafty-keys.html
            Game.paratrooperHasJumped = true; // prevent multiple paratrooper
            jump(plane);
        }
    });
    
    
    //Crafty.e('Test, RandBirdPosFromLeft');  
	
    // generate random birds
    for(var i = 0; i < 5; i++)
    {
        var bird = Crafty.e('Bird, RandBirdPos');  
        bird.speed = Crafty.math.randomInt(2, 8) / 10;
    }

    // generate birds infinitly
    setInterval(function()
    {
        //Crafty.e('Bird'); 
        
        var birdFromLeft = Crafty.e('Bird, RandBirdPosFromLeft'); 
        birdFromLeft.speed = Crafty.math.randomInt(2, 8) / 10;
    }, Crafty.math.randomInt(2000, 15000));
    
    
});
