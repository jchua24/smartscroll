import "./Examples.css";
import {Button} from '@material-ui/core';

function Examples() {
  return (
    
    <div className="App-content">
      <h1> Example Demo</h1> 


      <p> Welcome to a demo of the SmartScroll plugin! Here's everything you need to know to start using it. </p>

      <ul className="instructions-list">
        <li> To launch SmartScroll, click the button on the top left of the page or use the keyboard shortcut Ctrl-Shift-O </li> 
        <li> Navigate through the page using the following options:
          <ul>
            <li> Scroll through the main page the normal way (scroll wheel on mouse, or gesture on touchpad) </li>  
            <li> Click on any point in the canvas preview to scroll to that point  </li>  
            <li> Click and drag on the scroll overlay (light gray) on top of the preview canvas</li>  
          </ul> 
        </li> 
        <li>Change the orientation of SmartScroll using the following keyboard shortcuts: 
          <ul>
            <li> Ctrl-Shift-L to move the preview window to the left </li>  
            <li> Ctrl Shift-R to move the preview window to the right   </li>  
          </ul> 
        </li> 
        <li>Launch the settings popup at the top left of the preview window to modify colour themes or window orientation </li> 
        <li>Close SmartScroll by using the provided Close Button or the Ctrl-Shift-C keyboard shortcut.</li> 
      </ul> 
    
      <p>When you have scrolled to the bottom or the top of the current preview, the preview window will update and show your new location relative to the page contents. </p> 

      <div className="nav-area"> 
        <Button >
          <a target="_blank" href="examples.html" >Try SmartScroll</a>
        </Button>
      </div> 
      
    </div>

 

  );
}

export default Examples;
