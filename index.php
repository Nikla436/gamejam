<?php

?>

<!DOCTYPE html>
<html>
<head>
    <title>GGJ 2017 Game!</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="main.css">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:700" rel="stylesheet">
</head>
<body id="top">
<nav>
    <h1>Global Game Jam 2017 - Balls that Shoot Each Other Game</h1>
    <div class="navLink">
        <a href="#instructions">
            Instructions
        </a>
    </div>
    <div class="navLink">
        <a href="#about">
            About
        </a>
    </div>
</nav>
<div id="logoWrapper">
    <div id="leftLogo"></div>
    <div id="rightLogo"></div>
</div>
<!-- GAME CANVAS -->
<a href="#top">
    <div id="backToTop">
        <img src="up.png">
    </div>
</a>
<div id="canvasWrapper">
    <canvas id="gameCanvas" width="1000" height="600"></canvas>
</div>
<div id="spacer" style="width: 100%; height: 610px;">&nbsp;</div>
<section id="instructions">
    <h2>Game Instructions</h2>
    <div id="controlsContainer">
        <div id="player1">
            <h3>Player 1</h3>
            <hr>
            <h4>
                <div class="control">Fire Up:</div>
                <div class="key">&nbsp;&nbsp;W</div>
            </h4>
            <h4>
                <div class="control">Fire Down:</div>
                <div class="key">&nbsp;&nbsp;S</div>
            </h4><h4>
                <div class="control">Fire Left:</div>
                <div class="key">&nbsp;&nbsp;A</div>
            </h4><h4>
                <div class="control">Fire Right:</div>
                <div class="key">&nbsp;&nbsp;D</div>
            </h4>
        </div>
        <div id="player2">
            <h3>Player 2</h3>
            <hr>
            <h4>
                <div class="control">Fire Up:</div>
                <div class="key">&nbsp;&nbsp;Up-Arrow</div>
            </h4>
            <h4>
                <div class="control">Fire Down:</div>
                <div class="key">&nbsp;&nbsp;Down-Arrow</div>
            </h4><h4>
                <div class="control">Fire Left:</div>
                <div class="key">&nbsp;&nbsp;Left-Arrow</div>
            </h4><h4>
                <div class="control">Fire Right:</div>
                <div class="key">&nbsp;&nbsp;Right-Arrow</div>
            </h4>
        </div>
    </div>

</section>
<section id="about">
    <h2>About This Project</h2>
</section>



<!-- GAME SCRIPT -->
<script type="text/javascript" src="game.js"></script>
</body>

