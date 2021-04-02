

function initCanvas(){
    let canvas = document.getElementById('canvas');
    let ctx  = canvas.getContext('2d');
    let cW = ctx.canvas.width, cH = ctx.canvas.height;
    let enemies = [ {"id":"enemy1","x":100,"y":-20,"w":40,"h":20},
                    {"id":"enemy2","x":225,"y":-20,"w":40,"h":20},
                    {"id":"enemy3","x":350,"y":-20,"w":40,"h":20},
                    {"id":"enemy4","x":100,"y":-70,"w":40,"h":20},
                    {"id":"enemy5","x":225,"y":-70,"w":40,"h":20},
                    {"id":"enemy6","x":350,"y":-70,"w":40,"h":20}
    ];
    function renderEnemies(){
        for(var i = 0; i < enemies.length; i++){
            ctx.fillStyle = "black";
            ctx.fillRect(enemies[i].x, enemies[i].y+=1, enemies[i].w, enemies[i].h);
        }
    }
    function Launcher(){
        this.y = 540, this.x = cW *.5-25, this.w = 50, this.h = 50, this.dir, this.bg="red", this.missiles = [];
        this.render = function(){
            if(this.dir == 'left'){
                this.x-=10;
            } else if(this.dir == 'right'){
                this.x+=10;
            }
            ctx.fillStyle = this.bg;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            for(let i=0; i < this.missiles.length; i++){
                let m = this.missiles[i];
                ctx.fillStyle = m.bg;
                ctx.fillRect(m.x, m.y-=10, m.w, m.h);
                this.hitDetect(this.missiles[i],i);
                if(m.y <= 0){ // If a missile goes past the canvas boundaries, remove it
                    this.missiles.splice(i,1); // Splice that missile out of the missiles array
                }
            }
            if(enemies.length == 0){
                clearInterval(animateInterval); // Stop the game animation loop
                ctx.fillStyle = 'black';
                ctx.font = 'italic bold 36px Arial, sans-serif';
                ctx.fillText('Game Over!', cW*.5-130, cH/2, 300);
            }
        }
        this.hitDetect = function(m,mi){
            for(let i = 0; i < enemies.length; i++){
                let e = enemies[i];
                if(m.x+m.w >= e.x && m.x <= e.x+e.w && m.y >= e.y && m.y <= e.y+e.h){
                    this.missiles.splice(this.missiles[mi],1); // Remove the missile
                    enemies.splice(i,1); // Remove the enemy that the missile hit
                    document.getElementById('status').innerHTML = "You destroyed "+ e.id;
                }
            }
        }
    }
    let launcher = new Launcher();
    function animate(){
        //ctx.save();
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies();
        //ctx.restore();
    }
    let animateInterval = setInterval(animate, 30);
    let left_btn = document.getElementById('left');
    let right_btn = document.getElementById('right');
    let fire_btn = document.getElementById('fire');
    left_btn.addEventListener('mousedown', function(event) {
        launcher.dir = 'left';
    });
    left_btn.addEventListener('mouseup', function(event) {
        launcher.dir = '';
    });
    right_btn.addEventListener('mousedown', function(event) {
        launcher.dir = 'right';
    });
    right_btn.addEventListener('mouseup', function(event) {
        launcher.dir = '';
    });
    fire_btn.addEventListener('mousedown', function(event) {

        launcher.missiles.push({"x":launcher.x+launcher.w*.5,"y":launcher.y,"w":3,"h":10,"bg":"red"});

    });
}
window.addEventListener('load', function(event) {
    initCanvas();
});

// InitCanvas();