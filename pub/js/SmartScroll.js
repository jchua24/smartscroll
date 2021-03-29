/* SmartScroll JS Library Implementation - Joshua Chua (CSC309) */
"use strict";
import html2canvas from './html2canvas.esm.js'; 

const SmartScroll = function() {

	const _self = {}

    //array to store the start/end points covered by the current preview
    _self.range = []; 

    //store preview canvas height for calculations 
    _self.preview_height = 0; 

    //flag to determine if modal preview is being refreshed 
    _self.updating = false; 

    //default stylings to be overridden if needed 
    _self.styling = {
        'background-color': '#FEFEFE',
        'button-color': '#AAA', 
        'button-text-color': '#EFEFEF'
    } 

    //initial calculations + data structures for time tracking 
	_self.initialize = function(scrollStyles) { 
        console.log("initialize!");

        //create main modal 
        const mainModal = _self.constructMainModal(); 

        //create settings modal 
        const settingsModal = _self.constructSettingsModal(); 

        //apply custom styling 
        _self.applyCustomStyling(scrollStyles); 

        //initialize preview canvas on modal
        _self.updatePreviewCanvas(0, true); 

        //add modals to DOM (in html body) 
        const body = document.getElementsByTagName("BODY")[0];
        body.appendChild(mainModal); 
        body.appendChild(settingsModal); 

        //page scroll event handler 
        document.addEventListener('scroll', function(e) {

            console.log("window scroll point: " + window.scrollY); 
          
            if(!_self.updating) { //update only when another update is not occurring
                if(window.scrollY + window.innerHeight > _self.range[1]) {
                    //update preview 
                    console.log("updating canvas preview!");
                    _self.updatePreviewCanvas(window.scrollY, false); 
                } else if (window.scrollY < _self.range[0]) {
                    //update preview 
                    console.log("updating canvas preview!");
                    _self.updatePreviewCanvas(window.scrollY, false); 
                } else {
                    //update scroll canvas 
                    _self.updateScrollCanvas(window.scrollY); 
                }
            }
        });

	}

    //this function constructs the main sidebar in the DOM and returns it as an object
    _self.constructMainModal = function() {

        const mainModal = document.createElement("div"); 
        mainModal.className = "modal"; 
        mainModal.id = "SmartScroll"

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
        mainModal.appendChild(modalContent); 

        return mainModal; 
    }

    //this function constructs the settings window as a DOM object and returns it
    _self.constructSettingsModal = function() {
    
        const settingsModal = document.createElement("div"); 
        settingsModal.className = "settings-modal"; 
        settingsModal.id = "SmartScroll-settings"

        const modalContent = document.createElement("div"); 
        modalContent.className = "settings-modal-content"; 
        modalContent.id = "SmartScroll-settings-content"; 

        const closeButton = document.createElement("button"); 
        closeButton.innerHTML = "Close Settings";
        closeButton.className = "button close"; 
        closeButton.onclick = _self.settingsClose;

        modalContent.appendChild(closeButton); 

        //sample colour themes 
        const themes = [
            {
                'name': 'holiday', 
                'background-color': 'red',
                'button-color': 'green', 
                'button-text-color': 'white'
            }, 
            {
                'name': 'USA', 
                'background-color': 'blue',
                'button-color': 'red', 
                'button-text-color': 'white'
            }, 
            {
                'name': 'OVO', 
                'background-color': 'gold',
                'button-color': 'black', 
                'button-text-color': 'gold'
            }, 
            {
                'name': 'greys', 
                'background-color': 'dark grey',
                'button-color': 'light grey', 
                'button-text-color': 'grey'
            }, 
            {
                'name': 'Lakers', 
                'background-color': 'purple',
                'button-color': 'yellow', 
                'button-text-color': 'purple'
            }
        ]

        const themesHeader = document.createElement("h1");
        themesHeader.innerHTML = "Pick a Colour Theme";
        modalContent.appendChild(themesHeader); 

        //add sample themes to modal
        for(let i = 0; i < themes.length; i++) {
            let themeOption = document.createElement("input"); 
            let themeLabel = document.createElement("label");
            themeOption.type = "checkbox"; 
            themeOption.value = themes[i].name;
            modalContent.appendChild(themeOption); 
            modalContent.appendChild(themeLabel); 
            themeLabel.appendChild(document.createTextNode(themes[i].name));

            //event listener to handle a theme-change event 
            themeOption.addEventListener('change', (event) => {
                if(event.currentTarget.checked) {
                    _self.applyCustomStyling(themes[i]); 

                    //uncheck other boxes 
                    for(let i = 0; i < modalContent.children.length; i++) {
                        if(modalContent.children[i].type == "checkbox" && modalContent.children[i].value != event.currentTarget.value) {
                            modalContent.children[i].checked = false; 
                        }
                    }
                }

                let styleSelected = false; 

                 //uncheck other boxes 
                 for(let i = 0; i < modalContent.children.length; i++) {
                    if(modalContent.children[i].checked) {
                        styleSelected = true;
                    }
                }
                
                //apply default styles if none selected 
                if(!styleSelected) {
                    _self.applyCustomStyling({'background-color': '#FEFEFE', 'button-color': '#AAA', 'button-text-color': '#EFEFEF'}); 
                }
            })
        }

        settingsModal.appendChild(modalContent); 
        return settingsModal;
    }

    //changes the UI styling of the sidebar and any other DOM elements created
    _self.applyCustomStyling = function(scrollStyles) {
        if('background-color' in scrollStyles) {
            document.documentElement.style.setProperty('--modal-background-color', scrollStyles['background-color']);
        } else {
            document.documentElement.style.setProperty('--modal-background-color', _self.styling['background-color']);
        }

        if('button-text-color' in scrollStyles) {
            document.documentElement.style.setProperty('--modal-button-color', scrollStyles['button-text-color']);
        } else {
            document.documentElement.style.setProperty('--modal-button-color', _self.styling['button-text-color']);
        }
        if('button-color' in scrollStyles) {
            document.documentElement.style.setProperty('--modal-button-bg-color', scrollStyles['button-color']);
        } else {
            document.documentElement.style.setProperty('--modal-button-bg-color', _self.styling['button-color']);
        }
    }

    //generates new preview canvas to reflect the user's current position on the page
    _self.updatePreviewCanvas = function(yPosition, fixedStart) {
        
        //set update flag 
        _self.updating = true;

        //get dimensions of main body element
        var previewArea = document.body.getBoundingClientRect(); 
        var width =  Math.min(3000, previewArea.width); 
        var height = Math.min(9000, previewArea.height); 

        var startPoint; 
        var endPoint; 

        //calculate new start/end points for vertical range to be displayed 
        if(fixedStart) { //starting point fixed 
            startPoint = yPosition; 
            endPoint = Math.min(previewArea.height, yPosition + 9000); 
        } else { //starting point for range calculated based on given y position 
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

            //modify dimensions of preview canvas
            var newHeight = (0.92 * window.innerHeight); 
            var newWidth = (0.12 * window.innerWidth); 
            canvas.style="width: " + newWidth + "px; height: " + newHeight + "px;";
            canvas.id = "SmartScroll-preview-canvas"; 
            canvas.className = "preview-canvas";

            //record canvas height
            _self.preview_height = newHeight; 

            //create scroll canvas  
            _self.scroll_height =  (window.innerHeight / height) * (newHeight); 

            var scrollCanvas = document.createElement("canvas"); 
            scrollCanvas.id = "SmartScroll-scroll-canvas"; 
            scrollCanvas.style = "width: " + newWidth + "px; height: " + _self.scroll_height + "px;";
            scrollCanvas.className = "scroll-canvas"; 
            
            //add click event listener to canvas object 
            canvas.addEventListener('mousedown', function(e) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left; 
                const y = e.clientY - rect.top; 

                console.log("x: " + x + " y: " + y)

                //convert Y position on canvas to Y position in current range
                const proportion = (y / newHeight); 
                const newPosition = startPoint + (endPoint - startPoint) * proportion; 

                console.log("proportion: " + proportion);
                
                //scroll to new Y position 
                window.scrollTo({
                    top: newPosition, 
                    left: window.left, 
                    behaviour: 'smooth'
                })

                //move scroll canvas 
                _self.updateScrollCanvas(newPosition);
                
            })

            //remove existing canvas div if exists
            var existingCanvasDiv = document.getElementById("SmartScroll-canvas-div"); 
            if(existingCanvasDiv !== null) {
                console.log("found and removing existing canvas!");
                existingCanvasDiv.parentNode.removeChild(existingCanvasDiv);
            }

            //create new div to store preview canvas and scroll canvas (has same dimensions as preview canvas)
            var canvasContainer = document.createElement("div"); 
            canvasContainer.id = "SmartScroll-canvas-div";
            canvasContainer.style="width: " + newWidth + "px; height: " + newHeight + "px;"
            canvasContainer.className = "canvas-container";

            if(fixedStart) {
                _self.updateScrollCanvas(0); 
            } else {
                _self.updateScrollCanvas(yPosition); 
            }

            //add canvases
            canvasContainer.appendChild(canvas); 
            canvasContainer.appendChild(scrollCanvas); 
            
            //append canvas div
            contentDiv.appendChild(canvasContainer); 

            _self.updating = false; 
        });
    }

    _self.updateScrollCanvas = function(yPosition) {
        //takes y position of page, and moves the scroll canvas depending on proportion to current range

        var proportion = (yPosition - _self.range[0]) / (_self.range[1] - _self.range[0]); 
        var new_canvas_y = proportion * _self.preview_height; 

        document.documentElement.style.setProperty('--scroll-canvas-top', new_canvas_y + "px");
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

    //open smartscroll settings
    _self.settingsOpen = function() { 
        console.log("open settings!");
        const modalDiv = document.getElementById("SmartScroll-settings"); 
        modalDiv.style.display = "block";
    }

    //close smartscroll settings
    _self.settingsClose = function() { 
        console.log("close settings!");
        const modalDiv = document.getElementById("SmartScroll-settings"); 
        modalDiv.style.display = "none";
    }

	return _self
}

export default SmartScroll; 


