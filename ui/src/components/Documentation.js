import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function Documentation() {
  return (
    <div className="App">

      <div className="App-content">
        <h1> Documentation </h1> 

        <p>To get started with Smartscroll, you will need to include the necessary JS and jQuery files in the head tag of your HTML file. As well, the SmartScroll library depends on the html2canvas JS library, which has been included in the Github repository. </p> 

        <SyntaxHighlighter language="html" style={docco}>
          {"<head>\n\n<!-- css and js imports-->\n<link rel='stylesheet' type='text/css' href='css/SmartScroll.css'> \n<script type='module' src='js/SmartScroll.js'></script> \n<link rel='stylesheet' type='text/css' href='css/examples.css'> \n<script type='module' src='js/examples.js'></script> \n\n<!-- jqueryUI import-->\n <link rel='stylesheet' href='../jquery-ui-1.12.1/jquery-ui.min.css'> \n<script src='../jquery-ui-1.12.1/external/jquery/jquery.js'></script> \n<script src='../jquery-ui-1.12.1/jquery-ui.min.js'></script>\n\n</head>"}
        </SyntaxHighlighter>

        <p>As well, there is an initalization function that needs to be run upon the loading of the page body.</p> 

        <SyntaxHighlighter language="html" style={docco}>
          {"<body onload='initializeScroll()'"}
        </SyntaxHighlighter>

        <SyntaxHighlighter language="javascript" style={docco}>
              {"let scroll = new SmartScroll(); //defined at top of file \n ... \n window.initializeScroll = () =>  {scroll.initialize({}); }"}
        </SyntaxHighlighter>


        <p>And just like that, Smartscroll is ready to be used! However, there are a few more ways to interact with the library programatically: </p> 

        <ol> 
          <li> 
            Trigger the open event through a button click: 

            <SyntaxHighlighter language="html" style={docco}>
              {"<button type='button' onclick='openScroll()'>SmartScroll! </button>"}
            </SyntaxHighlighter>

            <SyntaxHighlighter language="javascript" style={docco}>
              {"window.initializeScroll = () =>  { scroll.open(); }"}
            </SyntaxHighlighter>

          
          </li>   
          <li> 
            Specify custom styles to be used upon initialization: 

            <SyntaxHighlighter language="javascript" style={docco}>
              {"window.initializeScroll = function() { \n const scrollStyles = { \n  'background-color': 'red', \n 'button-color': 'green', \n   'button-text-color': 'white' \n } \n\n  scroll.initialize(scrollStyles); \n } "}
            </SyntaxHighlighter>

            This will set the background color of the preview/settings windows, the button colours, and the text colour. 
          </li> 
        </ol> 

      </div>
    </div>
  );
}

export default Documentation;
