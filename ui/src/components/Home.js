import logo from '../logo-transparent-white.png';
import '../App.css';
import {Button, ButtonGroup} from '@material-ui/core';
import {Link} from "react-router-dom";
import Typing from 'react-typing-animation';
  
function Home() {

    const openDownload = () => {
        window.open('https://github.com/csc309-winter-2021/js-library-chuajos2');
    }

    return (
        <div className="App-content">
            <img className="main-logo" src={logo} alt="logo" />

            <Typing speed={30}>
                <span className="slogan-text">A tool that makes it easier to navigate and browse through long webpages.</span>
            </Typing>

            <div className="nav-area">  

                <ButtonGroup color="black" aria-label="outlined primary button group">
                    <Button component={Link} to="/Example">
                        Example
                    </Button>


                    <Button component={Link} to="/Documentation">
                        Documentation
                    </Button>

                    <Button onClick={openDownload}>
                        <a>Download</a>
                    </Button>
                </ButtonGroup>

            </div> 




        </div>
    );
  }
  
  export default Home;
  