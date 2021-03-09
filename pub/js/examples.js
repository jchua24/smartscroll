

import SmartScroll from "./SmartScroll.js";

let scroll = null; 

console.log("hello");

window.initializeScroll = function() {
    console.log("initialize");
    scroll = SmartScroll(); 
    scroll.initialize(); 
}

window.openScroll = function() {
    console.log("open!");
    scroll.open(); 
}

