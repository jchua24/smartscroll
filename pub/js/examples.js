

import SmartScroll from "./SmartScroll.js";

let scroll = null; 

window.initializeScroll = function() {
    scroll = SmartScroll(); 

    //ability to specify custom styles 
    const scrollStyles = {
        'background-color': 'red',
        'button-color': 'green', 
        'button-text-color': 'white'
    }

    scroll.initialize({}); 
}

window.openScroll = function() {
    scroll.open(); 
}

