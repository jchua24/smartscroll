/* SmartScroll JS Library Implementation - Joshua Chua (CSC309) */
"use strict";

//external library to handle dom-to-canvas screenshotting
import html2canvas from './html2canvas.esm.js'; 

(function(window, document) { 

	function SmartScroll() {

        //array to store the start/end points covered by the current preview
        this.range = []; 

        //store preview canvas height for calculations 
        this.previewHeight = 0; 

        //flag to determine if modal preview is being refreshed 
        this.updating = false; 

        //orientation is right side 
        this.right = true; 

        this.resizeTimeout = null; 

        //default stylings to be overridden if needed 
        this.styling = {
            'background-color': '#FEFEFE',
            'button-color': '#AAA', 
            'button-text-color': '#EFEFEF'
        } 
	}

    SmartScroll.prototype = {

        //initial calculations + data structures for time tracking 
        initialize: function(scrollStyles) { 
            console.log("initialize!");
            let smartscroll = this; 

            //create main modal 
            const mainModal = smartscroll.constructMainModal(); 

            //create settings modal 
            const settingsModal = smartscroll.constructSettingsModal(); 

            //apply custom styling 
            smartscroll.applyCustomStyling(scrollStyles); 

            //initialize preview canvas on modal
            smartscroll.updatePreviewCanvas(0, true); 

            //add modals to DOM (in html body) 
            const body = document.getElementsByTagName("BODY")[0];
            body.appendChild(mainModal); 
            body.appendChild(settingsModal); 

            //page scroll event handler 
            document.addEventListener('scroll', function(e) {

                console.log("window scroll point: " + window.scrollY); 
            
                if(!smartscroll.updating) { //update only when another update is not occurring
                    if(window.scrollY + window.innerHeight > smartscroll.range[1]) {
                        //update preview 
                        console.log("updating canvas preview!");
                        smartscroll.updatePreviewCanvas(window.scrollY, false); 
                    } else if (window.scrollY < smartscroll.range[0]) {
                        //update preview 
                        console.log("updating canvas preview!");
                        smartscroll.updatePreviewCanvas(window.scrollY, false); 
                    } else {
                        //update scroll canvas 
                        smartscroll.updateScrollCanvas(window.scrollY); 
                    }
                }
            });

            //window resize event handler - executes 100ms after the last resize event
            window.onresize = function () {
                clearTimeout(smartscroll.resizeTimeout); 
                smartscroll.resizeTimeout = setTimeout(smartscroll.updatePreviewCanvas(window.scrollY, false), 300);
            }

            //handle keyboard shortcuts
            document.onkeydown = function(e) {
                //CTRL + SHIFT + something
                if(e.ctrlKey && e.shiftKey){
                    switch(e.code){
                        case 'KeyO': //open
                            smartscroll.open(); 
                            break;
                        case 'KeyC': //close
                            smartscroll.close();
                            break;  
                        case 'KeyL': //left orientation
                            smartscroll.setModalOrientation("left");
                            break;  
                        case 'KeyR': //right orientation
                            smartscroll.setModalOrientation("right");
                            break;  
                    }
                }
              };

        }, 

        //this function constructs the main sidebar in the DOM and returns it as an object
        constructMainModal: function() {

            const mainModal = document.createElement("div"); 
            mainModal.className = "modal"; 
            mainModal.id = "SmartScroll"

            const modalContent = document.createElement("div"); 
            modalContent.className = "modal-content"; 
            modalContent.id = "SmartScroll-content"; 

            const settingsIcon = document.createElement("button"); 
            settingsIcon.innerHTML = "&#9881;"; 
            settingsIcon.className = "button settings"
            settingsIcon.onclick = this.settingsOpen;  

            const closeButton = document.createElement("button"); 
            closeButton.innerHTML = "Close";
            closeButton.className = "button close"; 
            closeButton.onclick = this.close;

            //set modal orientation
            if(this.right) {
                this.setModalOrientation("right"); 
            } else {
                this.setModalOrientation("left"); 
            }

            modalContent.appendChild(settingsIcon); 
            modalContent.appendChild(closeButton); 
            mainModal.appendChild(modalContent); 

            return mainModal; 
        }, 

        //this function constructs the settings window as a DOM object and returns it
        constructSettingsModal: function() {

            let smartscroll = this; 

            const settingsModal = document.createElement("div"); 
            settingsModal.className = "settings-modal"; 
            settingsModal.id = "SmartScroll-settings"

            const modalContent = document.createElement("div"); 
            modalContent.className = "settings-modal-content"; 
            modalContent.id = "SmartScroll-settings-content"; 

            const closeButton = document.createElement("button"); 
            closeButton.innerHTML = "Close Settings";
            closeButton.className = "button close"; 
            closeButton.onclick = smartscroll.settingsClose;
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
                    'name': 'Forest', 
                    'background-color': 'green',
                    'button-color': 'brown', 
                    'button-text-color': 'white'
                }, 
                {
                    'name': 'Lakers', 
                    'background-color': 'purple',
                    'button-color': 'yellow', 
                    'button-text-color': 'purple'
                }
            ]

            const themeOptions = document.createElement("div"); 


            const themesHeader = document.createElement("h1");
            themesHeader.innerHTML = "Pick a Colour Theme";
            themeOptions.appendChild(themesHeader); 

            //add sample themes to modal
            for(let i = 0; i < themes.length; i++) {
                let themeOption = document.createElement("input"); 
                let themeLabel = document.createElement("label");
                themeOption.type = "checkbox"; 
                themeOption.value = themes[i].name;
                themeLabel.appendChild(document.createTextNode(themes[i].name));
                themeOptions.appendChild(themeOption); 
                themeOptions.appendChild(themeLabel); 

                //event listener to handle a theme-change event 
                themeOption.addEventListener('change', (event) => {
                    if(event.currentTarget.checked) {
                        this.applyCustomStyling(themes[i]); 

                        //uncheck other boxes 
                        for(let i = 0; i < themeOptions.children.length; i++) {
                            if(themeOptions.children[i].type == "checkbox" && themeOptions.children[i].value != event.currentTarget.value) {
                                themeOptions.children[i].checked = false; 
                            }
                        }
                    }

                    let styleSelected = false; 

                    //uncheck other boxes 
                    for(let i = 0; i < themeOptions.children.length; i++) {
                        if(themeOptions.children[i].checked) {
                            styleSelected = true;
                        }
                    }
                    
                    //apply default styles if none selected 
                    if(!styleSelected) {
                        smartscroll.applyCustomStyling({'background-color': '#FEFEFE', 'button-color': '#AAA', 'button-text-color': '#EFEFEF'}); 
                    }
                })
            }

            //orientation settings
            const orientationOptions = document.createElement("div"); 

            const orientationHeader = document.createElement("h1");
            orientationHeader.innerHTML = "SmartScroll orientation";
            orientationOptions.appendChild(orientationHeader); 

            let leftAlignOption = document.createElement("input"); 
            leftAlignOption.type = "checkbox"; 
            leftAlignOption.id = "SmartScroll-align-left"; 
            let leftAlignLabel = document.createElement("label");
            leftAlignLabel.appendChild(document.createTextNode("Left"));
            orientationOptions.appendChild(leftAlignOption); 
            orientationOptions.appendChild(leftAlignLabel); 

            let rightAlignOption = document.createElement("input"); 
            rightAlignOption.type = "checkbox"; 
            rightAlignOption.id = "SmartScroll-align-right"; 
            let rightAlignLabel = document.createElement("label");
            rightAlignLabel.appendChild(document.createTextNode("Right"));
            orientationOptions.appendChild(rightAlignOption); 
            orientationOptions.appendChild(rightAlignLabel); 

            if(smartscroll.right) {
                leftAlignOption.checked = false; 
                rightAlignOption.checked = true; 
            } else {
                leftAlignOption.checked = true; 
                rightAlignOption.checked = false; 
            }

            //add orientation change event listeners
            leftAlignOption.addEventListener('change', (event) => {

                const right = document.getElementById("SmartScroll-align-right"); 

                if(event.currentTarget.checked) {
                    right.checked = false; 
                    smartscroll.setModalOrientation("left");
                } else {
                    right.checked = true; 
                    smartscroll.setModalOrientation("right");
                }
            })

            rightAlignOption.addEventListener('change', (event) => {

                const left = document.getElementById("SmartScroll-align-left"); 

                if(event.currentTarget.checked) {
                    left.checked = false; 
                    smartscroll.setModalOrientation("right");
                } else {
                    left.checked = true; 
                    smartscroll.setModalOrientation("left");
                }
            })

            //add main sections to modal 
            modalContent.appendChild(themeOptions);
            modalContent.appendChild(orientationOptions);
            settingsModal.appendChild(modalContent); 

            return settingsModal;
        }, 

        setModalOrientation : function(direction) {
            
            if(direction == "left") {
                document.documentElement.style.setProperty('--modal-left', "0%");
            } else {
                document.documentElement.style.setProperty('--modal-left', "87%");
            }

        }, 

        //changes the UI styling of the sidebar and any other DOM elements created
        applyCustomStyling: function(scrollStyles) {
            if('background-color' in scrollStyles) {
                document.documentElement.style.setProperty('--modal-background-color', scrollStyles['background-color']);
            } else {
                document.documentElement.style.setProperty('--modal-background-color', this.styling['background-color']);
            }

            if('button-text-color' in scrollStyles) {
                document.documentElement.style.setProperty('--modal-button-color', scrollStyles['button-text-color']);
            } else {
                document.documentElement.style.setProperty('--modal-button-color', this.styling['button-text-color']);
            }
            if('button-color' in scrollStyles) {
                document.documentElement.style.setProperty('--modal-button-bg-color', scrollStyles['button-color']);
            } else {
                document.documentElement.style.setProperty('--modal-button-bg-color', this.styling['button-color']);
            }
        }, 

        //generates new preview canvas to reflect the user's current position on the page
        updatePreviewCanvas:  function(yPosition, fixedStart) {

            let smartscroll = this; 

            //close settings menu
            smartscroll.settingsClose();
            
            //set update flag 
            smartscroll.updating = true;

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
                var currentRangeDiff = smartscroll.range[1] - smartscroll.range[0]; 
                var halfRange = currentRangeDiff / 2; 
                startPoint = Math.max(0, yPosition - halfRange); 
                endPoint = Math.min(previewArea.height, yPosition + halfRange); 

                if(endPoint - startPoint < currentRangeDiff && startPoint + currentRangeDiff <= previewArea.height) {
                    endPoint = startPoint + currentRangeDiff; 
                }
            }

            //update range
            smartscroll.range = [startPoint, endPoint]
            console.log("new range: " + smartscroll.range); 

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
                smartscroll.previewHeight = newHeight; 

                //create scroll canvas  
                smartscroll.scrollHeight =  (window.innerHeight / height) * (newHeight); 

                var scrollCanvas = document.createElement("canvas"); 
                scrollCanvas.id = "SmartScroll-scroll-canvas"; 
                scrollCanvas.style = "width: " + newWidth + "px; height: " + smartscroll.scrollHeight + "px; top: var(--scroll-canvas-top);";
                scrollCanvas.className = "scroll-canvas"; 
                scrollCanvas.draggable = "true";
                document.documentElement.style.setProperty('--scroll-canvas-opacity', 0.3);

                //add scroll canvas mouseover event 
                scrollCanvas.addEventListener('mouseover', function(e) {
                    document.documentElement.style.setProperty('--scroll-canvas-opacity', 0.5); //change opacity 
                })

                //add scroll canvas mouseout event 
                scrollCanvas.addEventListener('mouseout', function(e) {
                    document.documentElement.style.setProperty('--scroll-canvas-opacity', 0.3); //change opacity 
                })
           
                //add click event listener to canvas object 
                canvas.addEventListener('mousedown', function(e) {
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left; 
                    const y = e.clientY - rect.top; 

                    //convert Y position on canvas to Y position in current range
                    const proportion = (y / newHeight); 
                    const newPosition = startPoint + (endPoint - startPoint) * proportion; 
                    
                    //scroll to new Y position 
                    window.scrollTo({
                        top: newPosition, 
                        left: window.left, 
                        behaviour: 'smooth'
                    })

                    //move scroll canvas 
                    smartscroll.updateScrollCanvas(newPosition);
                    
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
                    smartscroll.updateScrollCanvas(0); 
                } else {
                    smartscroll.updateScrollCanvas(yPosition); 
                }

                //add canvases
                canvasContainer.appendChild(canvas); 
                canvasContainer.appendChild(scrollCanvas); 
                
                //append canvas div
                contentDiv.appendChild(canvasContainer); 

                //add scroll canvas drag/scroll functionality after it has been added to DOM
                $('#SmartScroll-scroll-canvas').draggable(
                    {
                        axis:'y', 
                        containment: canvasContainer,
                        drag: function(event, ui) {
                            smartscroll.dragToScroll(ui.position.top);
                            console.log("drag event: " + ui.position.top);  
                        }
                    }
                );
 
                smartscroll.updating = false; 
            });
        }, 

        //takes current y position of page, and moves the scroll canvas depending on proportion to current range
        updateScrollCanvas: function(yPosition) {
            var proportion = (yPosition - this.range[0]) / (this.range[1] - this.range[0]); 
            var scrollCanvasPosition = proportion * this.previewHeight; 

            var scrollCanvas = document.getElementById("SmartScroll-scroll-canvas"); 
            if(scrollCanvas != null) {
                scrollCanvas.style.setProperty('top', "var(--scroll-canvas-top)");  
            }

            document.documentElement.style.setProperty('--scroll-canvas-top', scrollCanvasPosition + "px", "important");
        }, 

        //upon a drag event on the scroll canvas, takes new scroll canvas position and adjusts page scroll accordingly
        dragToScroll: function(scrollCanvasPosition) {

            var proportion = scrollCanvasPosition / this.previewHeight; 
            var newYPosition = proportion * (this.range[1] - this.range[0]) + this.range[0]; 

            document.documentElement.scrollTop = newYPosition; 
        },

        //open smartscroll 
        open: function() { 
            const modalDiv = document.getElementById("SmartScroll"); 
            modalDiv.style.display = "block";
        }, 

        //close smartscroll
        close: function () { 
            //close settings modal first
            const settingsModal = document.getElementById("SmartScroll-settings"); 
            if(settingsModal) {
                settingsModal.style.display = "none";
            }

            //close main modal
            const modalDiv = document.getElementById("SmartScroll"); 
            if(modalDiv) {
                modalDiv.style.display = "none";
            }``
        }, 

        //open smartscroll settings
        settingsOpen:  function() { 
            const modalDiv = document.getElementById("SmartScroll-settings"); 
            modalDiv.style.display = "block";
        }, 

        //close smartscroll settings
        settingsClose: function() { 
            const modalDiv = document.getElementById("SmartScroll-settings"); 
            
            if(modalDiv) {
                modalDiv.style.display = "none";
            }
        }
    }

	//after setup: add the SmartScroll function to the window object if it doesn't already exist
	window.SmartScroll = window.SmartScroll || SmartScroll;

})(window, window.document); // pass the global window and document objects to the anonymous function (they will now be locally scoped inside of the function)






















