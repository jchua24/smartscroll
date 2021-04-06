
/* SmartScroll JS Library Example - Joshua Chua (CSC309) */

let scroll = new SmartScroll(); 

window.initializeScroll = function() {
   
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

