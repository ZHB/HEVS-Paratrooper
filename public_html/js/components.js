// The Grid component allows an element to be located
// on a grid of tiles
Crafty.c('GridAlignment', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        })
    },

    /*
     * Locate this entity at the given position on the grid
     * 
     * @param x
     * @param y
     */
    at: function(x, y) {
        if (x === undefined && y === undefined) {
            return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height };
        } else {
            this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
            return this;
        }
    },
    
    dim: function(w, h) {
        if(w === undefined && h === undefined) {
            return { w: Game.map_grid.tile.width, h: Game.map_grid.tile.height };
        } else {
            this.attr({w: w * Game.map_grid.tile.width, h: h * Game.map_grid.tile.height});
            return this;
        }
    }
});

Crafty.c('PixelAlignment', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        })
    },

    // Locate this entity at the given position on the grid
    /*
     * Set the component position on the grid
     * 
     * @param x
     * @param y
     */
    at: function(x, y) {
        if (x === undefined && y === undefined) {
            return { x: this.x, y: this.y };
        } else {
            this.attr({ x: x, y: y });
            return this;
        }
    },
    
    dim: function(w, h) {
        if(w === undefined && h === undefined) {
            return { w: Game.map_grid.tile.width, h: Game.map_grid.tile.height };
        } else {
            this.attr({w: w, h: h});
            return this;
        }
    }
});
 
 
// ####################### [Nature] #######################
 
Crafty.c('Floor', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Color')
        .color('#000000')
		.attr({ x: 0, y: Game.map_grid.tile.height * Game.map_grid.height - 1, w: Game.map_grid.tile.height * Game.map_grid.height, h: 1 });
    }
});

// A Tree is just an Actor with a certain color/image
Crafty.c('WaterCollision', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Collision')
        .attr({'x': Game.map_bounds.min.x, 'y': Game.map_bounds.max.y - 100})
        .dim(3500, 200)
        .attr({'z':20});
    }
});
Crafty.c('Water', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Image, Color')
        .attr({'z':10})
        .at(-800, 730)
        .dim(3500, 200)
        .color("#4588e1");
        //.image("./assets/water.jpg");
    }
});
Crafty.c('RightIsland', {
    init: function() {
        this.requires('2D, Canvas, GridAlignment, Image, Collision')
        .attr({'z':200})
        .collision([15,209], [17,203], [43,180], [68,166], [97,152], [88,134], [67,144], [53,132], [45,97], [118,71], [150,97], [158,64], [137,43], [165,2], [266,11], [269,56], [258,74], [229,75], [224,127], [214,155], [231,164], [254,189], [263,211])
        .image("./assets/island.png");
    }
});
Crafty.c('LeftIsland', {
    init: function() {
        this.requires('2D, Canvas, GridAlignment, Image, Collision')
        .attr({'z':200})
        .collision([17,218], [19,206], [28,184], [48,165], [83,151], [121,146], [149,147], [185,155], [225,172], [253,189], [261,197], [266,206], [263,212], [236,219], [185,222], [93,225], [40,220])  
        .image("./assets/islandLeft.png");
    }
});
Crafty.c('Nest', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Collision')
        //.dim(20, 60)
        .attr({'z':500});
    }
});


Crafty.c('jollyBoat', {
    dir: 'w',
    speed: 3,
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Collision, Image, SpriteAnimation, spr_jollyboat')
        //.image("./assets/boatnest.png")
        .attr({'z':300})
        .reel('JollyBoatSpr', 800, 0, 0, 2) // time between changes, colums, row, number
        .animate('JollyBoatSpr', -1) // -1 : infinite animation
        .bind("EnterFrame", function(e) { // event trigered when whe enter the frame : https://github.com/craftyjs/Crafty/wiki/Event-List
            
            // move the plane in the right direction
            this.move(this.dir, this.speed);
        })
        .collision([9,31], [87,53], [168,27], [195,46], [169,77], [53,76])
        .onHit("RightIsland", function(e) {
            this.unflip("X");
            this.shift(-5, 20, 0, 0);
            this.dir = 'w';
        })
        .onHit("LeftIsland", function(e) {
            this.flip("X");
            this.shift(5, -20, 0, 0);
            this.dir = 'e';
        })
    }
});

Crafty.c('Cloud', {
    init: function() {
        this.requires('2D, DOM, Canvas, PixelAlignment, Image, Color')
        .attr({'z':2000})
        .dim(369, 165)
        .image("./assets/nuage3.png");
    }
});



// ####################### [Plane] #######################

// This is the player-controlled character
Crafty.c('Plane', {
    dir: 'e',
    speed: 2,
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Image, audio')
        .image("./images/pc6porter.png")
        .attr({'z':1})
        .bind("EnterFrame", function(e) { // event trigered when whe enter the frame : https://github.com/craftyjs/Crafty/wiki/Event-List
    
            Crafty.audio.play("planeflyingover");
            // move the plane in the right direction
            this.move(this.dir, this.speed);
			
            if(this.x > Game.map_bounds.max.x || this.x < 0) { 
                this.destroy();
                Crafty.audio.remove("planeflyingover");
            }			
        })
    }
});

/*
 * Create a parachute with a default gravity
 */
Crafty.c('ParatrooperSailClosed', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Image, Gravity, Delay')
        .image("./assets/paratrooperBody.png")
        .gravityConst(0.1)
        .gravity("Floor");
    }
});

Crafty.c('ParatrooperSailOpening', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Image, SpriteAnimation, spr_sailopening')
        .reel('PlayerMovingRisght', 800, 0, 0, 12) // time between changes, colums, row, number
        .animate('PlayerMovingRisght', 1); // -1 : infinite animation
    }
});

Crafty.c('ParatrooperSail', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Image')
        .image("./assets/paratrooperSail.png");
    }
});

Crafty.c('ParatrooperBody', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Multiway, Image, Gravity, Delay, Collision, Tween, Particles')
        .image("./assets/paratrooperBody.png")
        .attr({'z':1000})
        .dim(42, 40)

       
		// open parachute after cerain delay
        .delay(function() {
            // add possibility to move the paratrooper after it has opened his sail
            this.multiway(1.5, {DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180}); // speed, directions
        }, 600, 0)
        .collision([4,13], [15,14], [14,12], [13,9], [13,5], [17,2], [22,2], [26,4], [26,10], [32,9], [38,14], [38,17], [34,17], [28,19], [27,23], [31,32], [35,31], [35,33], [31,36], [25,29], [18,28], [12,36], [7,33], [11,33], [15,25], [15,19], [8,15], [3,15])  
        .bind("EnterFrame", function(e) {
            //Crafty.audio.play("paratrooperWind");	
            this.y = this._y + 0.2; // custom gravity
        })
        .onHit("WaterCollision", function(e) {
            Crafty.scene("gameover");
        })
        .onHit("jollyBoat", function(e) {
            Crafty.scene("gameover");
        })
        .onHit("Nest", function(e) {
            Crafty.scene("score"); // win the game, no show scores 
        })
        .onHit("ExtraUp", function(e) {
            e[0].obj.destroy();
            this.tween({rotation: 360, y: this._y - Crafty.math.randomInt(100, 200)}, 400);
        }, function(e) {
           updateScores(1, 0, 0);
        })
        .onHit("Bird", function(e) {
            //e[0].obj.destroy();
        }, function(e) { // callback after hit
            updateScores(0, 0, -3);
        })
        .onHit("Egg", function(e) {
            e[0].obj.destroy();
        }, function(e) { // callback after hit
            updateScores(0, 1, 0);
        })
        .onHit("RightIsland", function(e) {
            Crafty.scene("gameover");
        })
        .onHit("LeftIsland", function(e) {
            Crafty.scene("gameover");
        })
        .bind('KeyDown', function(e) {
            if(e.key === Crafty.keys.LEFT_ARROW) {
                this.rotation = -10;
            } else if (e.key === Crafty.keys.RIGHT_ARROW) {
                this.rotation = 10;
            } else if (e.key === Crafty.keys.UP_ARROW) {
                this.rotation = 0;
            } else if (e.key === Crafty.keys.DOWN_ARROW) {
                this.rotation = 0;
            }
        });
    }
});

Crafty.c('Invisible', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Color')
        .color('#ff0000');
    }
});

Crafty.c('Bird', {
    dir: 'e',
    speed: 0.35,
    init: function() {
        this.requires('2D, DOM, PixelAlignment, Animate, Collision, SpriteAnimation, spr_bird, Delay')
        .attr({'z':100})
        .bind("EnterFrame", function(e) { // event trigered when whe enter the frame : https://github.com/craftyjs/Crafty/wiki/Event-List
            
            // move the plane in the right direction
            this.move(this.dir, this.speed);
            
            if(this.x > Game.map_bounds.max.x  || this.y >= Game.map_bounds.max.y ) { 
                this.destroy();
            }
        })
        .collision([12,19], [17,15], [22,13], [27,15], [30,17], [35,17], [37,20], [32,21], [30,24], [27,26], [25,28], [22,29], [16,29], [15,29], [14,27], [12,24])
        .onHit("ParatrooperBody", function(e) {
                // birds falls to the ground
                this.addComponent("Gravity").gravity("Floor");
        })
        .onHit("Water", function(e) {
                // birds falls to the ground
                this.destroy();
        }) 
        .delay(function() {
            var egg = Crafty.e('Egg');
                egg.at(this._x, this._y);
        }, Crafty.math.randomInt(10000, 30000), Crafty.math.randomInt(3, 7))
         // These next lines define our four animations
        // each call to .animate specifies:
        // - the name of the animation
        // - the x and y coordinates within the sprite
        // map at which the animation set begins
        // - the number of animation frames *in addition to* the first one
        //.animate('PlayerMovingRight', 0, 1, 2)
        .reel('PlayerMovingRisght', 1000, 0, 0, 7) // time between changes, colums, row, number
        .animate('PlayerMovingRisght', -1); // -1 : infinite animation
    }
});


Crafty.c('ExtraUp', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, SpriteAnimation, spr_arrow, RandPosTherm, RandomAppearTime, Collision')
        //.dim(50,45)
        .collision([4,6], [17,2], [37,3], [48,15], [35,42], [23,44], [2,13])
        .attr({'z':100})
        .reel('ArrowUp', 1000, 0, 0, 3) // time between changes, colums, row, number
        .animate('ArrowUp', -1); // -1 : infinite animation
    }
});

/*
 * Generate eggs falling from birds
 */
Crafty.c('Egg', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Image, SpriteAnimation, spr_egg, Delay, Collision')
        .dim(32,32)
        .attr({'z':110})
        .collision([7,8], [11,2], [14,1], [19,1], [22,4], [27,10], [28,13], [28,20], [25,26], [24,27], [21,29], [10,30], [6,26], [4,23], [4,19], [4,14])
        .reel('EggFalling', 1000, 0, 0, 4) // time between changes, colums, row, number
        .animate('EggFalling', 1) // animate only once, then stop
        .bind("EnterFrame", function(e) {
            this.y = this._y + 0.95; // Custom gravity
        });
    }
});