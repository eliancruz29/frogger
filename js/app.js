// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xLLimitEnemy = -101;
    this.xRLimitEnemy = 101*5;
    this.x = this.xLLimitEnemy;
    this.y = 60;
    this.py = 0;
    this.speed = 0

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    
    if (this.x > this.xRLimitEnemy){
        this.x = this.xLLimitEnemy - 202;
    }
    
    if ( (this.py === player.py) && ((this.x+55) > player.xP) && ((this.x-55) < player.xP) ){
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getRandom = function(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // This the image/sprite for the player
    this.xP = (101*2);
    this.yP = (83*4.5);
    this.py = 4;
    this.xllimit = 0;
    this.xrlimit = (101*4);
    this.yulimit = (83*(0.5));
    this.ydlimit = (83*4.5);
    this.spriteP = 'images/char-boy.png';
};

Player.prototype.update = function(){
    this.render();
};

Player.prototype.reset = function(){
    this.xP = (101*2);
    this.yP = (83*4.5);
    this.py = 4;
    this.update();
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.spriteP), this.xP, this.yP);
};

Player.prototype.handleInput = function(dt){
    switch(dt){
        case 'left':
            this.xP += (-1*101);
            if (this.xP < this.xllimit) {this.xP = this.xllimit;}
            this.update();
            break;
        case 'up':
            this.yP += (-1*83);
            this.py -= 1;
            if (this.yP < this.yulimit) {
                this.yP = this.ydlimit;
                this.py = 4;
            }
            this.update();
            break;
        case 'right':
            this.xP += (1*101);
            if (this.xP > this.xrlimit) {this.xP = this.xrlimit;}            
            this.update
            break;
        case 'down':
            this.yP += (1*83);
            this.py += 1;
            if (this.yP > this.ydlimit) {
                this.yP = this.ydlimit;
                this.py = 4;
            }
            this.update();
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();
for(var c=0, m=0; c<6; c++, m++){
        var _enemy = new Enemy();
        if (m>2) {m=0;}
        _enemy.py = m;
        _enemy.y += (m * 83);
        _enemy.x -= (_enemy.getRandom(0,12) * 101);
        _enemy.speed = _enemy.getRandom(60,400);
        allEnemies.push(_enemy);
    };

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
