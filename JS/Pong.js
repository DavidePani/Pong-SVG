/*
* Copyright (C) 2013 Davide Pani (info@davidepani.com)
* This file is part of Pong-SVG
* 
* Pong-SVG is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or 
* any later version.
* 
* Pong-SVG is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License
* along with Pong-SVG.  If not, see <http://www.gnu.org/licenses/>.
*/

function Pong(){
}

Pong.game = function() {
    if (Pong.ball.getMinX()<Pong.court.minX) {
        /****************************************
        * Goal playerB
        ****************************************/
        Pong.setScorePlayerB(parseInt(document.getElementById("resultPlayerB").innerHTML) + 1);
        Pong.positionsReset();
        Pong.ball.move(Pong.externalForce(Pong.ballStep, parseInt(Pong.ballStep/4)), Pong.externalForce(Pong.ballStep, parseInt(Pong.ballStep/20)), Pong.court.maxX, Pong.court.maxY);
    }
    if (Pong.ball.getMaxX()>Pong.court.maxX) {
        /****************************************
        * Goal playerA
        ****************************************/
        Pong.setScorePlayerA(parseInt(document.getElementById("resultPlayerA").innerHTML) + 1);
        Pong.positionsReset();
        Pong.ball.move(Pong.externalForce(Pong.ballStep, parseInt(Pong.ballStep/4)), Pong.externalForce(Pong.ballStep, parseInt(Pong.ballStep/20)), Pong.court.maxX, Pong.court.maxY);
    }
    if (Pong.ball.getMinY()<Pong.court.minY) {
        /****************************************
        * Up bounce
        ****************************************/
        Pong.ball.move(0, Pong.ball.forceY*-2, Pong.court.maxX, Pong.court.maxY);
    }
    if (Pong.ball.getMaxY()>Pong.court.maxY) {
        /****************************************
        * Down bounce
        ****************************************/
        Pong.ball.move(0, Pong.ball.forceY*-2, Pong.court.maxX, Pong.court.maxY);
    }
    if (Pong.ball.getMinX()<=Pong.court.minX+Pong.playerA.width && Pong.ball.getMinY()<Pong.playerA.getMaxY() && Pong.ball.getMaxY()>Pong.playerA.y ) {
        /****************************************
        * PlayerA bounce
        ****************************************/
        Pong.forceY = 0;
        if (Pong.ball.y<Pong.playerA.y + (Pong.playerA.height/3)){
            Pong.forceY = parseInt(-Pong.ballStep/2);
        }
        if (Pong.ball.y>Pong.playerA.y + (2*Pong.playerA.height/3)){
            Pong.forceY = parseInt(Pong.ballStep/2);
        }
        Pong.ball.move(Pong.ball.forceX*-2, Pong.forceY, Pong.court.maxX, Pong.court.maxY);
    }
    if (Pong.ball.getMaxX()>=Pong.court.maxX-Pong.playerB.width && Pong.ball.getMinY()<Pong.playerB.getMaxY() && Pong.ball.getMaxY()>Pong.playerB.y ) {
        /****************************************
        * PlayerB bounce
        ****************************************/
        Pong.forceY = 0;
        if (Pong.ball.y<Pong.playerB.y + (Pong.playerB.height/3)){
            Pong.forceY = parseInt(-Pong.ballStep/2);
        }
        if (Pong.ball.y>Pong.playerB.y + (2*Pong.playerB.height/3)){
            Pong.forceY = parseInt(Pong.ballStep/2);
        }
        Pong.ball.move(Pong.ball.forceX*-2, Pong.forceY, Pong.court.maxX, Pong.court.maxY);
    }

    Pong.draw();

    Pong.ball.move(0, 0, Pong.court.maxX,  Pong.court.maxY);
    if (Pong.ball.forceX>0) { // Il computer si muove solo se la palla si sposta verso la sua parte
        if (Pong.ball.y<Pong.playerB.getMaxY()-parseInt(Pong.playerB.height/2)) {
            Pong.playerB.move(1, Pong.court.minY, Pong.court.maxY);
        }
        if (Pong.ball.y>Pong.playerB.getMaxY()-parseInt(Pong.playerB.height/2)) {
            Pong.playerB.move(0, Pong.court.minY, Pong.court.maxY);
        }   
    }

    Pong.playerA.moveY(Pong.mousePosition-Pong.court.absoluteYPosition, Pong.court.minY, Pong.court.maxY);
};

Pong.draw = function() {
    Pong.playerA.object.setAttribute("y", Pong.playerA.y);
    Pong.playerB.object.setAttribute("y", Pong.playerB.y);
    Pong.playerB.object.setAttribute("x", Pong.playerB.x);
    Pong.ball.object.setAttribute('cx', Pong.ball.x);
    Pong.ball.object.setAttribute('cy', Pong.ball.y);
};

Pong.externalForce = function(step, minimum) {
    force = 0;
    do{
        force = parseInt(Math.random()*step);
        if (Math.random()*100<50) {
            force = force * -1;
        }
    } while (minimum !== null && Math.abs(force)<minimum);

    return force;
};

Pong.startGame = function() {
    Pong.positionsReset();
    Pong.setScorePlayerA(0);
    Pong.setScorePlayerB(0);
    Pong.ball.move(Pong.externalForce(Pong.ballStep, parseInt(Pong.ballStep/4)), Pong.externalForce(Pong.ballStep, parseInt(Pong.ballStep/20)), Pong.court.maxX, Pong.court.maxY);
};

Pong.stopGame = function() {
    Pong.positionsReset();
    Pong.stopTime();
};	

Pong.setScorePlayerA = function(value) {
    document.getElementById("resultPlayerA").innerHTML = value;
};

Pong.setScorePlayerB = function(value) {
    document.getElementById("resultPlayerB").innerHTML = value;
};

Pong.positionsReset = function(){
    Pong.ball.reset(Pong.court.centerX, Pong.court.centerY);
    Pong.playerA.reset(0, Pong.court.centerY-parseInt(Pong.playerA.height/2));
    Pong.playerB.reset(Pong.court.maxX-Pong.playerB.width, Pong.court.centerY-parseInt(Pong.playerB.height/2));
    Pong.draw();
};

Pong.start = function(){
    if (Pong.gameInterval == null) {
        Pong.gameInterval = setInterval(Pong.game,10);
    }
};

Pong.stop = function(){
    if (Pong.gameInterval != null) {
        clearInterval(Pong.gameInterval);
        Pong.gameInterval = null;
    }
};


Pong.mouseMove = function(e){
    if(window.event){
        Pong.mousePosition = window.event.clientY - parseInt(Pong.playerA.height/2);
    } else {
        Pong.mousePosition = e.pageY - parseInt(Pong.playerA.height/2);
    }
};    

Pong.init = function(){

    Pong.court = new Court('court');
    Pong.court.setSize(0,0, parseInt(Pong.court.object.getAttribute("width")), parseInt(Pong.court.object.getAttribute("height")));
    Pong.court.setPosition();
    Pong.ball = new Ball('ball', parseInt(document.getElementById("ball").getAttribute("r")));

    Pong.playerA = new Player('playerA', parseInt(document.getElementById("playerA").getAttribute("width")), parseInt(document.getElementById("playerA").getAttribute("height")), Pong.playerStep);
    Pong.playerB = new Player('playerB', parseInt(document.getElementById("playerB").getAttribute("width")), parseInt(document.getElementById("playerA").getAttribute("height")), Pong.playerStep);

    Pong.positionsReset();
    Pong.startGame();
}

Pong.playerStep = 10;
Pong.ballStep = 10;
Pong.court = null;
Pong.ball = null;
Pong.playerA = null;
Pong.playerB = null;
Pong.mousePosition = null;
Pong.gameInterval = null;