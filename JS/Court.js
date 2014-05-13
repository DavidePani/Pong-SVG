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

function Court(htmlID){
    this.minX = 0;
    this.minY = 0;
    this.maxX = 0;
    this.maxY = 0;
    this.centerX = 0;
    this.centerY = 0;
    this.absoluteYPosition = 0;
    this.object = document.getElementById(htmlID);

    this.setSize = function(minX, minY, maxX, maxY){
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;

        this.centerX = parseInt((this.maxX-this.minX)/2);
        this.centerY = parseInt((this.maxY-this.minY)/2);
    };

    this.setPosition = function(){
        var ob = this.object.parentNode;

        while (ob && ob.offsetTop) {
            if (parseInt(ob.parentNode.offsetTop)>0){
                this.absoluteYPosition += parseInt(ob.offsetTop);
            }

            ob = ob.parentNode;
        }
    };
}