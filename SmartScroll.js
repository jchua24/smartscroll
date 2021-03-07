/* SmartScroll JS Library Implementation - Joshua Chua (CSC309) */
"use strict";


function SmartScroll() {

	const _self = {}

    //initial calculations + data structures for time tracking 
	_self.initialize = function() { 
        console.log("initialize!");

        //create modal 
        const modalDiv = document.createElement("div"); 
        modalDiv.className = "modal"; 
        modalDiv.id = "SmartScroll"

        const modalContent = document.createElement("div"); 
        modalContent.className = "modal-content"; 

        const placeholder = document.createElement("p"); 
        placeholder.innerHTML = "To-Do!"; 

        const closeButton = document.createElement("button"); 
        closeButton.className = "close"; 
        closeButton.innerHTML = "Close";
        closeButton.onclick = _self.close;


        modalContent.appendChild(closeButton); 
        modalContent.appendChild(placeholder); 
        modalDiv.appendChild(modalContent); 

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

	return _self
}


