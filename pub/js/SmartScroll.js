/* SmartScroll JS Library Implementation - Joshua Chua (CSC309) */
"use strict";


import html2canvas from './html2canvas.esm.js'; 

const SmartScroll = function() {

	const _self = {}

    //array to store the start/end points covered by the current preview
    _self.range = []; 

    _self.updating = false; 

    //initial calculations + data structures for time tracking 
	_self.initialize = function() { 
        console.log("initialize!");

        //create modal 
        const modalDiv = document.createElement("div"); 
        modalDiv.className = "modal"; 
        modalDiv.id = "SmartScroll"

        const modalContent = document.createElement("div"); 
        modalContent.className = "modal-content"; 
        modalContent.id = "SmartScroll-content"; 

        const settingsIcon = document.createElement("button"); 
        settingsIcon.innerHTML = "&#9881;"; 
        settingsIcon.className = "button settings"
        settingsIcon.onclick = _self.settingsOpen;  

        const closeButton = document.createElement("button"); 
        closeButton.innerHTML = "Close";
        closeButton.className = "button close"; 
        closeButton.onclick = _self.close;

        modalContent.appendChild(settingsIcon); 
        modalContent.appendChild(closeButton); 

        modalDiv.appendChild(modalContent); 

        //TO-DO: initialize time tracker canvas

        //add modal to DOM (in html body) 
        const body = document.getElementsByTagName("BODY")[0];
        body.appendChild(modalDiv); 

        //initialize preview canvas 
        _self.updatePreviewCanvas(0, true); 

        //add event listeners for scroll and window resize 
        document.addEventListener('scroll', function(e) {

            console.log("window scroll point: " + window.scrollY); 
          
            if(!_self.updating) {
                if(window.scrollY + window.innerHeight > _self.range[1]) {
                    //update preview 
                    console.log("updating canvas preview!");
                    _self.updatePreviewCanvas(window.scrollY, false); 
                } else if (window.scrollY < _self.range[0]) {
                    //update preview 
                    console.log("updating canvas preview!");
                    _self.updatePreviewCanvas(window.scrollY, false); 
                }
            }
        });
	}

    _self.updatePreviewCanvas = function(yPosition, fixedStart) {
        
        //set update flag 
        _self.updating = true; 
    
        //remove existing canvas if exists 
        var existingCanvas = document.getElementById("SmartScroll-canvas"); 
        if(existingCanvas !== null) {
            console.log("found and removing existing canvas!");
            existingCanvas.parentNode.removeChild(existingCanvas);
        }

        var previewArea = document.body.getBoundingClientRect(); 
        var width =  Math.min(3000, previewArea.width); 
        var height = Math.min(20000, previewArea.height); 

        var startPoint; 
        var endPoint; 

        if(fixedStart) {
            startPoint = yPosition; 
            endPoint = Math.min(previewArea.height, yPosition + 20000); 
        } else {
            var halfRange = (_self.range[1] - _self.range[0]) / 2; 
            startPoint = Math.max(0, yPosition - halfRange); 
            endPoint = Math.min(previewArea.height, yPosition + halfRange); 
        }

        //update range
        _self.range = [startPoint, endPoint]
        console.log("new range: " + _self.range); 

        //add new canvas
        html2canvas(document.body, {y: startPoint, height: height, width: width}).then(function(canvas) {

            var contentDiv = document.getElementById("SmartScroll-content");
            var newHeight = (0.9 * window.innerHeight); 
            var newWidth = (0.1 * window.innerWidth); 

            canvas.style="width: " + newWidth + "px; height: " + newHeight + "px;"
            canvas.id = "SmartScroll-canvas"; 
            contentDiv.appendChild(canvas); 

            _self.updating = false; 
        });
    }

    //open smartscroll 
    _self.open = function() { 
        console.log("open!");
        const modalDiv = document.getElementById("SmartScroll"); 
        modalDiv.style.display = "block";
    }
    
    //close smartscroll
    _self.close = function () { 
        console.log("close!");
        const modalDiv = document.getElementById("SmartScroll"); 
        modalDiv.style.display = "none";
    }

    //open smartscroll 
    _self.settingsOpen = function() { 
        console.log("open settings!");
    }

    //open smartscroll 
    _self.settingsClose = function() { 
        console.log("close settings!");
    }

	return _self
}

export default SmartScroll; 


