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
            <div className="d-flex flex-row w-100 h-100">
                <Sidebar  reference = {sideMenu} />
                <main className= "bg-warning flex-fill h-100" style={{overflowY:'auto'}}>

                </main>
            </div>
        </div>
       </Mainlayout>
    );
}

export default App;
