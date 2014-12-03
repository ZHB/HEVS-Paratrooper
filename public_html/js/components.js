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
Crafty.c('Water', {
    init: function() {
        this.requires('2D, Canvas, GridAlignment, Image')
        .image("./images/grass.jpg");
    }
});
Crafty.c('RightIsland', {
    init: function() {
        this.requires('2D, Canvas, GridAlignment, Image')
        .attr({'z':5})
        .image("./assets/island.png");
    }
});
Crafty.c('LeftIsland', {
    init: function() {
        this.requires('2D, Canvas, GridAlignment, Image')
        .attr({'z':5})
        .image("./assets/islandLeft.png");
    }
});

Crafty.c('jollyBoat', {
    dir: 'e',
    speed: 3,
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Collision, Image')
        .image("./assets/jollyBoat.png")
        .bind("EnterFrame", function(e) { // event trigered when whe enter the frame : https://github.com/craftyjs/Crafty/wiki/Event-List
            
            // move the plane in the right direction
            this.move(this.dir, this.speed);
        })
        .collision()
        .onHit("RightIsland", function(e) {
                this.dir = 'w';
        })
        .onHit("LeftIsland", function(e) {
                this.dir = 'e';
        })
    }
});

Crafty.c('Cloud', {
    init: function() {
        this.requires('2D, DOM, Canvas, PixelAlignment, Image, Color')
        .attr({'z':5})
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
			
			if(this.x > Game.map_grid.width * Game.map_grid.tile.width || this.x < 0) { 
                Crafty.audio.remove("planeflyingover");
            }
			
			
        })
    }
});


//http://buildnewgames.com/introduction-to-crafty/

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

// paratroopersailopen.png

Crafty.c('ParatrooperSail', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Image')
        .image("./assets/paratrooperSail.png");
    }
});

Crafty.c('ParatrooperBody', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Multiway, Image, Gravity, Delay, Collision, Tween')
        .image("./assets/paratrooperBody.png")
        .dim(42, 40)
		// open parachute after cerain delay
        .delay(function() {
            // add possibility to move the paratrooper after it has opened his sail
            this.multiway(1.3, {DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180}); // speed, directions
        }, 600, 0)
        .collision()
        .bind("EnterFrame", function(e) {
            this.y = this._y + 0.2; // custom gravity
        })
        .onHit("Water", function(e) {
            alert('dsdfsd');
            
        })
        .onHit("jollyBoat", function(e) {

                // récupérer les positions x/y

                // charger la scène score et afficher
                Crafty.scene("score");
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


// new egg randomly
        
// Create our player entity with some premade components
Crafty.c('Bird', {
    dir: 'e',
    speed: 0.35,
    init: function() {
        this.requires('2D, DOM, PixelAlignment, Animate, Collision, SpriteAnimation, spr_bird, Delay')
        //.image("./images/bird.jpg")
        .bind("EnterFrame", function(e) { // event trigered when whe enter the frame : https://github.com/craftyjs/Crafty/wiki/Event-List
            
            //this.animate('PlayerMovingRight', 8, -1);
            
            // move the plane in the right direction
            this.move(this.dir, this.speed);
            
            if(this.x > Game.map_grid.width * Game.map_grid.tile.width || this.x < 0  || this.y >= Game.map_grid.height * Game.map_grid.tile.height - 2 * Game.map_grid.tile.height ) { 
                this.destroy();
            }
        })
        .collision()
        .onHit("ParatrooperBody", function(e) {

                //shaker.shaker(25);

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
         }, Crafty.math.randomInt(5000, 50000), 7)
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


Crafty.c("shaker", {
        init: function() {
          this.requires('Delay')  
        },
        shaker: function(duration) {
            var current = Crafty.frame();
                    
            this.bind("EnterFrame", function(e) {
                
                // exit frame
                if(e.frame - current >= duration) {
                    this.unbind("EnterFrame");
                    return;
                }
                
                // randomly gengerate viewport deplacement
                var xmove = Crafty.math.randomInt(-3,3),
                    ymove = Crafty.math.randomInt(-3,3);
                    
                Crafty.viewport.x += xmove;
                Crafty.viewport.y += ymove;
                
                // reset default viewport
                this.delay(function() {
                   
                    Crafty.viewport.x -= xmove;
                    Crafty.viewport.y -= ymove;
                }, 100);
              
                   
                
            });
        }
    });
/*
 * TODO:
 *  - effet du vent
 *  - effet turbulances
 *  - déplacement avion de gauche à droite
 *      - Sauter de l'avion sur appui de la touche espace
 *      - déployer la voile du parachute sur appui une deuxième fois de la touche espace (diminuer la vitesse de chute)
 */


Crafty.c('ExtraUp', {
    init: function() {
        this.requires('2D, Canvas, GridAlignment, Image, SpriteAnimation, spr_arrow, RandomPosition, RandomAppearTime')
        .dim(2,2)
        .attr({'z':100})
        .reel('ArrowUp', 1000, 0, 0, 3) // time between changes, colums, row, number
        .animate('ArrowUp', -1); // -1 : infinite animation
    }
});

Crafty.c('Egg', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Image, SpriteAnimation, spr_egg, Delay')
        .dim(32,32)
        .attr({'z':110})
		//.image("./assets/chick.png")
        .reel('EggFalling', 1000, 0, 0, 4) // time between changes, colums, row, number
        .animate('EggFalling', 1) // animate only once, then stop
        .bind("EnterFrame", function(e) {

            // Custom gravity
            this.y = this._y + 0.75;
        });
    }
});