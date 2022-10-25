import { useRef } from "react";
import Mainlayout from "./Layout/base";
import Header from "./Views/Common/Header";
import Sidebar from "./Views/Common/Side-Menu";

function App() {

    const sideMenu = useRef();

    return (
       <Mainlayout>
        <div className="d-flex flex-column w-100 h-100">
            <Header sidemenu={sideMenu}/>
            <div className="d-flex flex-row w-100 h-100 position-relative">
                <Sidebar reference = {sideMenu} />
                <main className= "main-bg flex-fill h-100" style={{overflowY:'auto'}}>
                    <div className="side-backdrop w-100 h-100"></div>
                </main>
            </div>
        </div>
       </Mainlayout>
    );
}

export default App;
