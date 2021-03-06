var player = {
    name: "",
    loc: "",
    level: 99,
    maxhp: 300,
    currhp: 300,
    xp: 0
};

var enemy = {
    name: "",
    loc: "",
    level: 99,
    maxhp: 100,
    currhp: 100,
    xp: 0
};

var playerDamage = 1500;
var enemyDamage = 100;
var requestAnimFrame = window.mozRequestAnimationFrame  ||
                                window.webkitRequestAnimationFrame  ||
                                window.msRequestAnimationFrame  ||
                                window.oRequestAnimationFrame;

                                
function gameLogic() {
    
}

function loadPlayer(name) {
    player.name = name.charAt(0).toUpperCase() + name.slice(1);
    player.loc = "images/" + name + "B.gif";
    
    var playerName = document.getElementById("playerName");
    var text = document.createTextNode(player.name + " lv." + player.level);
    //playerName.appendChild(text);
    var img = document.getElementById("playerImg");
    var imgurl = document.createElement("IMG");
    imgurl.setAttribute("src", player.loc);
    img.appendChild(imgurl);
}

function loadEnemy(name) {
    enemy.name = name.charAt(0).toUpperCase() + name.slice(1);
    enemy.loc = "images/" + name + "F.gif";
    
    var enemyName = document.getElementById("enemyName");
    var text = document.createTextNode(enemy.name);
    //enemyName.appendChild(text);
    var img = document.getElementById("enemyImg");
    var imgurl = document.createElement("IMG");
    imgurl.setAttribute("src", enemy.loc);
    img.appendChild(imgurl);
}

function loadBattle() {
    var player = "zekrom";
    var enemy = "kyurem-Black";
    loadPlayer(player);
    loadEnemy(enemy);
    createCanvas(player,enemy);
    updateHp();
}


function createCanvas() {

    //Bottom UI
    var button = 0; //button currently selected
    
    var loader = new PxLoader(), 
    backgroundImg = loader.addImage('images/BG_grass.png'), 
    platformImg = loader.addImage('images/PF_grass.png'),
    bar = loader.addImage('images/bar.png'),
    hud = loader.addImage('images/hud.png'),
    button = loader.addImage('images/button.png'),
    pokeball = loader.addImage('images/Pokeball.png');
    
    loader.addCompletionListener(function() { 
        var canvas = document.getElementById('game'), //background for 1st screen
            ctx = canvas.getContext('2d');
            
        var canvas2 = document.getElementById('game2'),
            ctx2 = canvas2.getContext('2d');
            
        var canvas3 = document.getElementById('game3'), //background for 2nd screen
            ctx3 = canvas3.getContext('2d'); 
        var canvas4 = document.getElementById('game4'),
            ctx4 = canvas4.getContext('2d'); 
     
        ctx.drawImage(backgroundImg, 0, 0, 600, 450); 
        ctx.drawImage(platformImg, 0, 0, 600, 450); 
        ctx.drawImage(bar, 80, 250, 200, 50); 
        ctx.drawImage(bar, 360, 50, 200, 50);
        ctx2.shadowColor = "black";
        ctx2.shadowOffsetX = 1; 
        ctx2.shadowOffsetY = 1; 
        ctx2.shadowBlur = 2;
        ctx2.scale(1,1);
        ctx2.font = '14px Verdana';
        ctx2.textBaseline = 'top';
        ctx2.fillStyle = 'white';
        ctx2.fillText(player.name, 95, 240);
        ctx2.fillText(enemy.name, 375, 40);
        ctx2.font = '15px Courier New';
        ctx2.fillText('lv.' + player.level, 225, 240);
        ctx2.fillText('lv.' + enemy.level, 510, 40);
        
        //ctx3.fillStyle = "#a8a8a8";
        //ctx3.fillRect(0, 0, 600, 200);
        ctx3.drawImage(hud, 0, 0, 600, 200);
        
        loadMoves(ctx4);
        /*ctx4.fillStyle = "white";
        ctx4.shadowBlur = 20;
        ctx4.shadowColor = "black";
        ctx4.font = '15px Verdana';
        ctx4.fillText("Tackle", 100, 30);
        ctx4.fillText("123", 100, 100);
        ctx4.fillText("123", 400, 30);
        ctx4.fillText("123", 400, 100);*/
      
    }); 
     
    // begin downloading images 
    loader.start();
}

function loadMoves(ctx) {
        ctx.fillStyle = "white";
        ctx.shadowBlur = 20;
        ctx.shadowColor = "black";
        ctx.font = '15px Verdana';
        ctx.fillText("Tackle", 100, 30);
        ctx.fillText("123", 100, 100);
        ctx.fillText("123", 400, 30);
        ctx.fillText("123", 400, 100);
}

function updateHp() {
        var canvas = document.getElementById('game'), 
            ctx = canvas.getContext('2d'); 
        var canvas2 = document.getElementById('game2'), 
            ctx2 = canvas2.getContext('2d');     
        
        ctx2.clearRect(92, 260, 170, 20);
        ctx2.clearRect(372, 60, 170, 20);
        ctx2.fillStyle="#CF0720";
        ctx2.fillRect(95,262,(player.currhp/player.maxhp)*165,13);
        ctx2.fillRect(375,62,(enemy.currhp/enemy.maxhp)*165,13);
        
        //hp
        ctx2.font = '15px Courier New';
        ctx2.textBaseline = 'top';
        ctx2.fillStyle = 'white';
        ctx2.fillStyle="#FFFFFF";
        ctx2.clearRect(150,280,100,18);
        ctx2.fillText(player.currhp + '/' + player.maxhp, 150, 280);
        ctx2.clearRect(435,80,100,18);
        ctx2.fillText(enemy.currhp + '/' + enemy.maxhp, 435, 80)
        
        if(playerDamage > 0) {
            if(player.currhp <= 0)
                return;
            player.currhp -= 1;
            playerDamage -= 1;
        }
        if(enemyDamage > 0) {
            if(enemy.currhp <= 0)
                return;
            enemy.currhp -= 1;
            enemyDamage -= 1;
        }
        
        requestAnimFrame(updateHp);
}

function damage(person, amount) {
    if(person == "player") {
        person = this.player;
    } else {
        person = this.enemy;
    }
    var hp = person.currhp;
    if(amount >= hp) {
        for(i = person.currhp; i > 0; i--) {
            person.currhp --;
            requestAnimFrame(updateHp);
        }
    } else {
        for(i = amount; i > 0; i--) {
            console.log(person.currhp);
            person.currhp --;
            requestAnimFrame(updateHp);
        }
    }
}