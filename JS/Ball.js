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

function Ball(htmlID, radius){
    this.y = 0;
    this.x = 0;
    this.radius = radius;
    this.forceX = 0;
    this.forceY = 0;
    this.id = htmlID;
    this.object = document.getElementById(htmlID);
    
    this.reset = function(x, y){
        this.x = x;
        this.y = y;
        this.forceX = 0;
        this.forceY = 0;
    };

    this.move = function(newForceX, newForceY, maxWidth, maxHeight){
        this.forceX += newForceX;
        this.forceY += newForceY;

        this.x += this.forceX;
        this.y += this.forceY;
    };

    this.getMinX = function(){
        return this.x-this.radius;
    };
    this.getMinY = function(){
        return this.y-this.radius;
    };
    this.getMaxX = function(){
        return this.x+this.radius;
    };
    this.getMaxY = function(){
        return this.y+this.radius;
    };
}