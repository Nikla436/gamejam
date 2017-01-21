var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var waves = [];


//// PLAYER 1 VARIABLES/////////////
var x1 = canvas.width/4;
var y1 = canvas.height/2;
var dx1 = 0;
var dy1 = 0;
var player1radius = 40; //size of player 1
var upPressed1 = false;
var downPressed1 = false;
var leftPressed1 = false;
var rightPressed1 = false;
var player1moveSpeedVertical = 0;
var player1moveSpeedHorizontal = 0;
var player1charge = 0;
////////////////////////////////////

//// PLAYER 2 VARIABLES ////////////
var x2 = canvas.width * 0.75;
var y2 = canvas.height/2;
var dx2 = 0;
var dy2 = 0;
var player2radius = 40; //size of player 2
var upPressed2 = false;
var downPressed2 = false;
var leftPressed2 = false;
var rightPressed2 = false;
var player2moveSpeedVertical = 0;
var player2moveSpeedHorizontal = 0;
var player2charge = 0;
////////////////////////////////////

/**
 * Draws the Line separating each half of the playing area
 */
function drawMiddleLine() {
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,0);
    ctx.lineTo(canvas.width/2,canvas.height);
    ctx.strokeStyle = '#9B9B9B';
    ctx.stroke();
}

function drawBorder() {
    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#9b9b9b';
    ctx.stroke();
}


/**
 * Draws player 1 to the canvas
 */
function drawPlayer1() {
    ctx.beginPath();
    ctx.arc(x1, y1, player1radius, 0, Math.PI*2);
    ctx.fillStyle = "#9495DD";
    ctx.fill();
    ctx.closePath();
}

function drawPlayer1Charge() {
    ctx.beginPath();
    ctx.arc(x1, y1, player1radius*( ((player1charge*100)/40)/100 ), 0, Math.PI*2);
    ctx.fillStyle = "#03ddc1";
    ctx.fill();
}

/**
 * Draws player 2 to the canvas
 */
function drawPlayer2() {
    ctx.beginPath();
    ctx.arc(x2, y2, player2radius, 0, Math.PI*2);
    ctx.fillStyle = "#dd504a";
    ctx.fill();
    ctx.closePath();
}

function drawPlayer2Charge() {
    ctx.beginPath();
    ctx.arc(x2, y2, player2radius*( ((player2charge*100)/40)/100 ), 0, Math.PI*2);
    ctx.fillStyle = "#dd325d";
    ctx.fill();
}

/**
 * Pass in two circles with x, y, and radius values.
 * Determine if the two circles are colliding and return true if they are.
 */
function circlesColliding(c1,c2){
    var dx=c2.x-c1.x;
    var dy=c2.y-c1.y;
    var rSum=c1.r+c2.r;
    return(dx*dx+dy*dy<=rSum*rSum);
}

/**
 * Starts by looping through each wave in the wave array.
 * sets variables for each player and the current wave.
 * Determines if the wave has hit either play, and if it finds that it has collided with
 * a player, remove that wave from the array and damage the player (lower their radius.)
 * If it finds no players have been hit, then iterate through the waves again and check
 * if the current wave is colliding with any OTHER waves.
 * If it determines that the wave has collided with another wave, AND that it is not
 * checking against iself, remove both waves from the waves array.
 */
function playerCollisionDetection() {
    for (c = 0; c < waves.length; c++) {
        var player1= { x:x1, y:y1, r:player1radius };
        var player2= { x:x2, y:y2, r:player2radius };
        var wave = { x:waves[c].x, y:waves[c].y, r:waves[c].power };
        if(circlesColliding(player1, wave) && waves[c].player == 2){
            console.log("PLAYER 1 HIT!");
            console.log("Wave's Power: " + waves[c].power);
            if (waves[c].power <5) {
                player1radius -= 1;
            }
            if (waves[c].power <10) {
                player1radius -= 2;
            }
            if (waves[c].power <15) {
                player1radius -= 3;
            }
            if (waves[c].power <20) {
                player1radius -= 4;
            }
            if (waves[c].power <21) {
                player1radius -= 5;
            }
            waves.splice(c, 1); //remove the wave from the array
        }
        if(circlesColliding(player2, wave) && waves[c].player == 1){
            console.log("PLAYER 2 HIT!");
            console.log("Wave's Power: " + waves[c].power);
            if (waves[c].power <5) {
                player2radius -= 1;
            }
            if (waves[c].power <10) {
                player2radius -= 2;
            }
            if (waves[c].power <15) {
                player2radius -= 3;
            }
            if (waves[c].power <20) {
                player2radius -= 4;
            }
            if (waves[c].power <21) {
                player2radius -= 5;
            }
            waves.splice(c, 1); //remove the wave from the array
        }
        for (k = 0; k < waves.length; k++) {
            var otherWave = { x:waves[k].x, y:waves[k].y, r:waves[k].power };
            if(circlesColliding(wave, otherWave)){
                if(waves[c] == waves[k]){
                    //do nothing
                } else {
                    //detected 2 waves collided. remove both waves from the waves array.
                    console.log("Waves Collided!");
                    var wavesToRemove = [c, k];
                    wavesToRemove.sort();
                    for (var i = wavesToRemove.length - 1; i >= 0; i--){
                        waves.splice(wavesToRemove[i], 1);
                    }
                }
            }
        }
    }
}

/**
 * Determines if a player's radius is less than 5. If player's radius is less than 5
 * end the game and determine the other player as the winner!
 */
function gameOver() {
    if (player1radius < 5) {
        clearInterval(gamePlay);
        ctx.beginPath();
        ctx.font = "16px Arial";
        ctx.fillText("PLAYER 2 WINS!",(canvas.width/2),canvas.height/2);
        //todo: fix this
        ctx.closePath();
        console.log("GAME OVER. Player 2 WINS");

    }
    if (player2radius < 5) {
        clearInterval(gamePlay);
        ctx.font = "16px Arial";
        ctx.fillText("PLAYER 1 WINS!",(canvas.width/2),canvas.height/2);
        console.log("GAME OVER. Player 1 WINS");
    }
}

/**
 * Clears the canvas then redraws the game state
 */
function draw() {
    gameOver();
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas for a complete redraw
    drawMiddleLine();
    drawBorder();
    drawPlayer1();
    drawPlayer2();
    drawPlayer1Charge();
    drawPlayer2Charge();
    playerCollisionDetection();
    x1 += dx1;
    y1 += dy1;
    x2 += dx2;
    y2 += dy2;

    //player 1 collisions
    if(x1 + dx1 > canvas.width/2 - player1radius || x1 + dx1 < player1radius) {
        dx1 = -dx1;
    }
    if(y1 + dy1 > canvas.height - player1radius || y1 + dy1 < player1radius) {
        dy1 = -dy1;
    }

    //player 2 collisions
    if(x2 + dx2 < canvas.width/2 + player2radius || x2 + dx2 > canvas.width - player2radius) {
        dx2 = -dx2;
    }
    if(y2 + dy2 > canvas.height - player2radius || y2 + dy2 < player2radius) {
        dy2 = -dy2;
    }

    //DRAW THE WAVES
    for (w = 0; w < waves.length; w++) {
        ctx.beginPath();
        ctx.arc(waves[w].x, waves[w].y, waves[w].power, 0, Math.PI*2);

        if (waves[w].player == 1) {
            ctx.fillStyle = "#1A19DD";
            ctx.save();
            ctx.shadowBlur = 40;
            ctx.shadowColor = "blue";
        } else {
            ctx.fillStyle = "#dd100f";
            ctx.save();
            ctx.shadowBlur = 40;
            ctx.shadowColor = "red";
        }
        ctx.fill();
        ctx.closePath();
        ctx.restore();

        waves[w].x = waves[w].x + waves[w].dx;
        waves[w].y = waves[w].y + waves[w].dy;
        ///////// wave collisions  with walls //////////////
        if(waves[w].x + waves[w].dx > canvas.width- waves[w].power || waves[w].x + waves[w].dx < waves[w].power) {
            waves[w].dx = -waves[w].dx; //reverse the dx
            if (waves[w].power < 3) {
                waves.splice(w, 1); //remove the wave from the array
            } else {
                waves[w].power = waves[w].power - 3;
                if (waves[w].player == 1) {
                    waves[w].player = 2;
                } else {
                    waves[w].player = 1;
                }
            }
        }
        if(waves[w].y + waves[w].dy > canvas.height- waves[w].power || waves[w].y + waves[w].dy < waves[w].power) {
            waves[w].dy = -waves[w].dy; //reverse the dy
            if (waves[w].power < 3) {
                waves.splice(w, 1); //remove the wave from the array
            } else {
                waves[w].power = waves[w].power - 3;
                if (waves[w].player == 1) {
                    waves[w].player = 2;
                } else {
                    waves[w].player = 1;
                }
            }
        }
        ////////////////end of wave collisions with walls /////////
    }




    //Sets player 1 charge up or down. TODO: THIS WILL HANDLE SHOOTING POWER?
    if(upPressed1) {
        if (player1charge < 40) {
            player1charge += 1;
        }
    }
    else if(downPressed1) {
        if (player1charge < 40) {
            player1charge += 1;
        }
    }
    //Moves Player 1 LEFT or RIGHT
    if(leftPressed1) {
        if (player1charge < 40) {
            player1charge += 1;
        }
    }
    else if(rightPressed1) {
        if (player1charge < 40) {
            player1charge += 1;
        }
    }

    //Moves Player 2 UP or DOWN
    if(upPressed2) {
        if (player2charge < 40) {
            player2charge += 1;
        }
    }
    else if(downPressed2) {
        if (player2charge < 40) {
            player2charge += 1;
        }
    }
    //Moves Player 2 LEFT or RIGHT
    if(leftPressed2) {
        if (player2charge < 40) {
            player2charge += 1;
        }
    }
    else if(rightPressed2) {
        if (player2charge < 40) {
            player2charge += 1;
        }
    }
}

//even listeners for key inputs
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//Key press listener
function keyDownHandler(e) {
    // key => W  --- PLAYER 1
    if(e.keyCode == 87) {
        upPressed1 = true;
    }
    // key => S  --- PLAYER 1
    else if(e.keyCode == 83) {
        downPressed1 = true;
    }
    // key => A  --- PLAYER 1
    else if(e.keyCode == 65) {
        leftPressed1 = true;
    }
    // key => D  --- PLAYER 1
    else if(e.keyCode == 68) {
        rightPressed1 = true;
    }
    // key => Up Arrow  --- PLAYER 2
    if(e.keyCode == 38) {
        upPressed2 = true;
    }
    // key => Down Arrow  --- PLAYER 2
    else if(e.keyCode == 40) {
        downPressed2 = true;
    }
    // key => Left Arrow  --- PLAYER 2
    else if(e.keyCode == 37) {
        leftPressed2 = true;
    }
    // key => Right Arrow  --- PLAYER 2
    else if(e.keyCode == 39) {
        rightPressed2 = true;
    }
}

//Key release listener
function keyUpHandler(e) {
    // key => W  --- PLAYER 1
    if(e.keyCode == 87) {
        upPressed1 = false;
        player1moveSpeedVertical = player1charge / 5;
        console.log("///////////////////////");
        console.log("Player 1 charge: " + player1charge);
        console.log("player 1 move sp Vertical: " + player1moveSpeedVertical);
        if (dy1 < 0) {
            dy1 = 0;
            dy1 = dy1 + player1moveSpeedVertical;
        } else {
            dy1 = dy1 + player1moveSpeedVertical;
        }
        //create a wave and push it into the waves array
        waves.push({
            x: x1,
            y: y1 - (player1radius*1.2) - player1charge,
            dx: 0,
            dy: -(player1charge/5),
            player: 1,
            power: player1charge / 2
        });
        player1radius -= player1charge/10;
        player1charge = 0;
    }
    // key => S  --- PLAYER 1
    else if(e.keyCode == 83) {
        downPressed1 = false;
        player1moveSpeedVertical = player1charge / 5;
        console.log("///////////////////////");
        console.log("Player 1 charge: " + player1charge);
        console.log("player 1 move speed: " + player1moveSpeedVertical);
        if (dy1 > 0) {
            dy1 = 0;
            dy1 = dy1 - player1moveSpeedVertical;
        } else {
            dy1 = dy1 - player1moveSpeedVertical;
        }
        //create a wave and push it into the waves array
        waves.push({
            x: x1,
            y: y1 + (player1radius*1.2) + player1charge,
            dx: 0,
            dy: (player1charge/5),
            player: 1,
            power: player1charge / 2
        });
        player1radius -= player1charge/10;
        player1charge = 0;
    }
    // key => A  --- PLAYER 1
    else if(e.keyCode == 65) {
        leftPressed1 = false;
        player1moveSpeedHorizontal = player1charge / 10;
        console.log("///////////////////////");
        console.log("Player 1 charge: " + player1charge);
        console.log("player 1 move sp Horizontal: " + player1moveSpeedHorizontal);
        if (dx1 < 0) {
            dx1 = 0;
            dx1 = dx1 + player1moveSpeedHorizontal;
        } else {
            dx1 = dx1 + player1moveSpeedHorizontal;
        }
        //create a wave and push it into the waves array
        waves.push({
            x: x1 - (player1radius*1.2) - player1charge,
            y: y1,
            dx: -(player1charge/5),
            dy: 0,
            player: 1,
            power: player1charge / 2
        });
        player1radius -= player1charge/10;
        player1charge = 0;
    }
    // key => D  --- PLAYER 1
    else if(e.keyCode == 68) {
        rightPressed1 = false;
        player1moveSpeedHorizontal = player1charge / 10;
        console.log("///////////////////////");
        console.log("Player 1 charge: " + player1charge);
        console.log("player 1 move sp Horizontal: " + player1moveSpeedHorizontal);
        if (dx1 > 0) {
            dx1 = 0;
            dx1 = dx1 - player1moveSpeedHorizontal;
        } else {
            dx1 = dx1 - player1moveSpeedHorizontal;
        }
        //create a wave and push it into the waves array
        waves.push({
            x: x1 + (player1radius*1.2) + player1charge,
            y: y1,
            dx: (player1charge/5),
            dy: 0,
            player: 1,
            power: player1charge / 2
        });
        player1radius -= player1charge/10;
        player1charge = 0;
    }
    // key => Up Arrow  --- PLAYER 2
    if(e.keyCode == 38) {
        upPressed2 = false;
        player2moveSpeedVertical = player2charge / 10;
        console.log("///////////////////////");
        console.log("Player 2 charge: " + player2charge);
        console.log("player 2 move sp Vertical: " + player2moveSpeedVertical);
        if (dy2 < 0) {
            dy2 = 0;
            dy2 = dy2 + player2moveSpeedVertical;
        } else {
            dy2 = dy2 + player2moveSpeedVertical;
        }
        //create a wave and push it into the waves array
        waves.push({
            x: x2,
            y: y2 - (player2radius*1.2) - player2charge,
            dx: 0,
            dy: -(player2charge/5),
            player: 2,
            power: player2charge / 2
        });
        player2radius -= player2charge/10;
        player2charge = 0;
    }
    // key => Down Arrow  --- PLAYER 2
    else if(e.keyCode == 40) {
        downPressed2 = false;
        player2moveSpeedVertical = player2charge / 10;
        console.log("///////////////////////");
        console.log("Player 2 charge: " + player2charge);
        console.log("player 2 move speed: " + player2moveSpeedVertical);
        if (dy2 > 0) {
            dy2 = 0;
            dy2 = dy2 - player2moveSpeedVertical;
        } else {
            dy2 = dy2 - player2moveSpeedVertical;
        }
        //create a wave and push it into the waves array
        waves.push({
            x: x2,
            y: y2 + (player2radius*1.2) + player2charge,
            dx: 0,
            dy: (player2charge/5),
            player: 2,
            power: player2charge / 2
        });
        player2radius -= player2charge/10;
        player2charge = 0;
    }
    // key => Left Arrow  --- PLAYER 2
    else if(e.keyCode == 37) {
        leftPressed2 = false;
        player2moveSpeedHorizontal = player2charge / 10;
        console.log("///////////////////////");
        console.log("Player 2 charge: " + player2charge);
        console.log("player 2 move sp Horizontal: " + player2moveSpeedHorizontal);
        if (dx2 < 0) {
            dx2 = 0;
            dx2 = dx2 + player2moveSpeedHorizontal;
        } else {
            dx2 = dx2 + player2moveSpeedHorizontal;
        }
        //create a wave and push it into the waves array
        waves.push({
            x: x2 - (player2radius*1.2) - player2charge,
            y: y2,
            dx: -(player2charge/5),
            dy: 0,
            player: 2,
            power: player2charge / 2
        });
        player2radius -= player2charge/10;
        player2charge = 0;
    }
    // key => Right Arrow  --- PLAYER 2
    else if(e.keyCode == 39) {
        rightPressed2 = false;
        player2moveSpeedHorizontal = player2charge / 10;
        console.log("///////////////////////");
        console.log("Player 2 charge: " + player2charge);
        console.log("player 2 move sp Horizontal: " + player2moveSpeedHorizontal);
        if (dx2 > 0) {
            dx2 = 0;
            dx2 = dx2 - player2moveSpeedHorizontal;
        } else {
            dx2 = dx2 - player2moveSpeedHorizontal;
        }
        //create a wave and push it into the waves array
        waves.push({
            x: x2 + (player2radius*1.2) - player2charge,
            y: y2,
            dx: (player2charge/5),
            dy: 0,
            player: 2,
            power: player2charge / 2
        });
        player2radius -= player2charge/10;
        player2charge = 0;
    }
}

function playerGrow(){
    player1radius += 1;
    if (player1radius > 40) {player1radius = 40;}
    player2radius += 1;
    if (player2radius > 40) {player2radius = 40;}
}


var gamePlay = setInterval(draw, 25); //call the draw() function every 1 ms
var player1grow = setInterval(playerGrow, 750);