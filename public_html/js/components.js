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
Crafty.c('Grass', {
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
    speed: 2,
    init: function() {
        this.requires('2D, Canvas, GridAlignment, Color, Collision')
        .color('#cccccc')
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
        this.requires('2D, DOM, Canvas, PixelAlignment, Image')
        .attr({'z':5})
        .image("./images/cloud.png");
    }
});



// ####################### [Plane] #######################

// This is the player-controlled character
Crafty.c('Plane', {
    dir: 'e',
    speed: 1,
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
        this.requires('2D, Canvas, PixelAlignment, Color, Gravity, Delay')
        .color('#ff0000')
        .gravityConst(0.1)
        .gravity("Floor");
    }
});

// paratroopersailopen.png

Crafty.c('ParatrooperSailOpened', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Multiway, Image, Gravity, Delay, Collision')
        .image("./assets/paratroopersailopen.png")
        .gravityConst(0.002)
        .gravity("Floor")
		// open parachute after cerain delay
        .delay(function() {
            // add possibility to move the paratrooper after it has opened his sail
            this.multiway(1, {DOWN_ARROW: 90, RIGHT_ARROW: 0, LEFT_ARROW: 180});
        }, 800, 0)
		.collision()
		.onHit("Grass", function(e) {
			alert('You loose');
		})
		.onHit("jollyBoat", function(e) {
		
			// récupérer les positions x/y
			
			// charger la scène score et afficher
			Crafty.scene("score");
		});
    }
});

Crafty.c('Invisible', {
    init: function() {
        this.requires('2D, Canvas, PixelAlignment, Color')
        .color('#ff0000');
    }
});


// Create our player entity with some premade components
Crafty.c('Bird', {
    dir: 'e',
    speed: 0.35,
    init: function() {
        this.requires('2D, DOM, PixelAlignment, Animate, Collision, SpriteAnimation, spr_bird')
        //.image("./images/bird.jpg")
        .bind("EnterFrame", function(e) { // event trigered when whe enter the frame : https://github.com/craftyjs/Crafty/wiki/Event-List
            
            //this.animate('PlayerMovingRight', 8, -1);
            
            // move the plane in the right direction
            this.move(this.dir, this.speed);
            
            if(this.x > Game.map_grid.width * Game.map_grid.tile.width || this.x < 0  || this.y >= Game.map_grid.height * Game.map_grid.tile.height - 2 * Game.map_grid.tile.height ) { 
                this.destroy();
            }
        })
         // These next lines define our four animations
        // each call to .animate specifies:
        // - the name of the animation
        // - the x and y coordinates within the sprite
        // map at which the animation set begins
        // - the number of animation frames *in addition to* the first one
        //.animate('PlayerMovingRight', 0, 1, 2)
        .reel('PlayerMovingRight', 1000, 0, 0, 7) // time between changes, colums, row, number
        .animate('PlayerMovingRight', -1); // -1 : infinite animation
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


