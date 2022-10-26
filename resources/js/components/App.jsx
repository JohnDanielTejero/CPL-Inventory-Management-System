import { useRef } from "react";
import Routing from "./Configurations/RouteConfigs/Routing-setup";
import Mainlayout from "./Layout/base";
import Header from "./Views/Common/Header";
import Sidebar from "./Views/Common/Side-Menu";
import { useNavigate } from "react-router-dom";

function App() {

    let navigate = useNavigate();
    const sideMenu = useRef();

    return (
            <Mainlayout>
                <div className="d-flex flex-column w-100 h-100">
                    <Header sidemenu={sideMenu}/>
                    <div className="d-flex flex-row w-100 h-100 position-relative">
                        <Sidebar reference = {sideMenu} navigateTo = {navigate}/>
                        <main className= "flex-fill h-100" style={{overflowY:'auto'}}>
                            <div className="side-backdrop w-100 h-100"></div>
                            <Routing/>
                        </main>
                    </div>
                </div>
            </Mainlayout>

    );
}

export default App;
