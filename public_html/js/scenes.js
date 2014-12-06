// spashscreen
Crafty.scene("sce_loading", function() {
    //Crafty.background("#111");
    Crafty.background('url("./assets/init-template.png") no-repeat center top #111');   
    
    Crafty.paths({ audio: "./sounds/", images: "./assets/", sprites: "./assets/" });
    
    // assets to load
    var assetsObj = {
        "audio": {
            "planeflyingover": ["plane-flying-over.mp3"],
            "paratrooperWind": ["wind.mp3"],
            "audioThermal": ["thermal.wav"],
            "audioEgg": ["egg.wav"],
            "audioBird": ["bird.wav"]
        },
        "images": ["loading.png", "nuage3.png", "water.jpg", "init-template.png", "gameover-template.png"],
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
            },
            "spr_leftisland.png": {
                "tile": 280,
                "tileh": 250,
                "map": { "spr_leftisland": [0,1] }
            }
        }
    };
    // spr_jollyboat.png
    // Load our sprite map image
    
    
    Crafty.load(assetsObj, function(){
        
        
      
        function load_scene(scene, duration) {
            Crafty.e("2D, Canvas, Tween, Color")
                .attr({alpha:0.0, x:0, y:0, w:1500, h:800})
                .color("#000000")
                .tween({alpha: 1.0}, duration)
                .bind("TweenEnd", function() {
                    Crafty.scene(scene);
                    Crafty.e("2D, Canvas, Tween, Color")
                        .attr({alpha:1.0, x:0, y:0, w:1500, h:800})
                        .color("#000000")
                        .tween({alpha: 0.0}, duration);
                });
        }

         
        Crafty.e("Delay").delay(function() {
            
            load_scene('main', 400);
        }, 4000, 0, function() {
            console.log("delay finished");
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

Crafty.scene("gameover", function() {
    
    Crafty.background('url("./assets/gameover-template.png") no-repeat center center #111');    
    
    // stop calling set intervall
    clearInterval(extraSetInterval);
    clearInterval(birdsSetInterval);
    
    Crafty.audio.toggleMute();
});

// score screen
Crafty.scene("score", function() {
    
    // reset viewport dimensions
    Crafty.viewport.x = 0;
    Crafty.viewport.y = 0;
    Crafty.viewport.reset();
    

    
    // stop calling set intervall
    clearInterval(extraSetInterval);
    clearInterval(birdsSetInterval);
    
    
    // load best scores
    var winScores = Crafty.storage('winScores');
    
    // create new array if it doesn't exist
    if(!winScores) {
        winScores = new Array();
    }
    
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

    //alert(Crafty.viewport.width);
    
    Crafty.e("HTML, DOM")
        .attr({x:0, y:110, w:Game.map_grid.width * Game.map_grid.tile.width, h:100})
        .css("textAlign", "center")
        .replace('<span style="color:#fff;font-size:200px;font-family:\'Agency FB\', Arial;">'+myScore+'</span>');
    
    
    var i = 0;
    for (var key in winScores)
    {
         Crafty.e("HTML, DOM")
        .attr({x:0, y:450 + i, w:Game.map_grid.width * Game.map_grid.tile.width, h:100})
        .css("textAlign", "center")
        .replace('<span style="color:#fff;font-size:50px;font-family:\'Agency FB\', Arial;">'+winScores[key]+'</span>');

        i = i + 50;
     } 
    
    //Crafty.stop(true);
}); 


// Game screen
Crafty.scene("main", function() {
    
    Crafty.viewport.bounds = {min:{x:-500, y:0}, max:{x:2000, y:1500}};
    
    //Crafty.background('SkyBlue');
    //Crafty.background('url("./assets/header-bg.png") no-repeat center top #7dcfff');
    Crafty.background('#81d4fa');
	
    /* ############################ [loading scene assets] ############################ */
    
    // Right island
    Crafty.e('RightIsland').at(1100, Game.map_bounds.max.y - 300);
    Crafty.e('LeftIsland').at(100, Game.map_bounds.max.y - 270);

    drawClouds();
    Crafty.e('WaterCollision');
    
    // Place grass at bottom of our world
    Crafty.e('Water');
    
    

    // draw the jolly boat
    var jollyBoat = Crafty.e('jollyBoat').at(500, Game.map_bounds.max.y - 120);
    
    var Nest = Crafty.e('Nest').at(jollyBoat._x + 90 , jollyBoat._y + 10 );
    jollyBoat.attach(Nest);
    
    
    // add extra randomly
    //var refreshIntervalId = setInterval(fname, 10000);
    extraSetInterval = setInterval(function()
                            {   
                                if(!Crafty.isPaused()) {
                                    Crafty.e('ExtraUp');
                                }
                            }, 1400);
    
   
    // the plane
    var plane = Crafty.e('Plane').at(0, 50).dim(200, 63);
    
    
    //Crafty.viewport.follow(plane, 0, 0);
    
    plane.bind("KeyDown", function(e) {
        if(e.keyCode === 32 && !Crafty.isPaused() && !Game.paratrooperHasJumped) { // see http://craftyjs.com/api/Crafty-keys.html
            Game.paratrooperHasJumped = true; // prevent multiple paratrooper
            jump(plane);
        }
    });
	
    // generate random birds
    for(var i = 0; i < 10; i++)
    {
        var bird = Crafty.e('Bird, RandBirdPos');  
        bird.speed = Crafty.math.randomInt(2, 10) / 10;
    }

    // generate birds infinitly
    birdsSetInterval = setInterval(function()
                        {
                            //Crafty.e('Bird'); 

                            var birdFromLeft = Crafty.e('Bird, RandBirdPosFromLeft'); 
                            birdFromLeft.speed = Crafty.math.randomInt(2, 8) / 10;
                        }, Crafty.math.randomInt(2000, 13000));
    
    
});

