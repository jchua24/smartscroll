/* SmartScroll JS Library Implementation - Joshua Chua (CSC309) */
"use strict";


//import html2canvas from './html2canvas.esm.js'; 

const SmartScroll = function() {

	const _self = {}

    //initial calculations + data structures for time tracking 
	_self.initialize = function() { 
        console.log("initialize!");

        //TO-DO: perform calculations 

        //create modal 
        const modalDiv = document.createElement("div"); 
        modalDiv.className = "modal"; 
        modalDiv.id = "SmartScroll"

        const modalContent = document.createElement("div"); 
        modalContent.className = "modal-content"; 

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

        //TO-DO: initialize preview canvas 
        // html2canvas(document.body).then(function(canvas) {
        //     document.body.appendChild(canvas);
        // });


        //TO-DO: initialize time tracker canvas

        //add modal to DOM (in html body) 
        const body = document.getElementsByTagName("BODY")[0];
        body.appendChild(modalDiv); 
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


