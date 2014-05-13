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

function Player(htmlID, width, height, playerStep){
    this.step = playerStep;
    this.height = height;
    this.width = width;
    this.x = 0;
    this.y = 0;

    this.id = htmlID;
    this.object = document.getElementById(htmlID);
    
    this.reset = function(x, y){
        this.x = x;
        this.y = y;
    };

    this.move = function(direction, minHeight, maxHeight){
        if (direction == 1) { //UP
            if (this.y-this.step>minHeight) {
                this.y -= this.step;
            } else {
                this.y = minHeight;
            }
        } else {
            if (this.getMaxY()+this.step<=maxHeight) {
                this.y += this.step;
            } else {
                this.y = maxHeight-this.height;
            }                
        }
    };

    this.moveY = function(y, minHeight, maxHeight){
        if (y>minHeight) {
            this.y = y;

            if (this.getMaxY()>maxHeight) {
                this.y = maxHeight-this.height;
            }

        } else {
            this.y = minHeight;
        }


    };

    this.getMaxY = function(){
        return this.y+this.height;
    };
}