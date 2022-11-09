import { useRef, useState } from "react";
import Routing from "./Configurations/RouteConfigs/Routing-setup";
import Mainlayout from "./Layout/base";
import Header from "./Views/Common/Header";
import Sidebar from "./Views/Common/Side-Menu";
import { useNavigate } from "react-router-dom";
import userCrud from "./Configurations/ApiCalls/user-crud";
import { setCookie } from "./Configurations/constants";

/**
 * Application Component of the React Application Bootstrapped by index.jsx
 *
 * @returns JSX.Element
 */
function App() {

    const [isAuth, setIsAuth] = useState(false);
    let navigate = useNavigate();
    const sideMenu = useRef();

    const login = async (e) => {
        e.preventDefault();
        const attempt = await userCrud.login(
            {
                "email" : e.target[0].value,
                "password" : e.target[1].value
            }
        );
        setCookie('token', await attempt.authorisation.token);
    }

    return (
            <Mainlayout>
                <div className="d-flex flex-column w-100 h-100">
                    <Header sidemenu={sideMenu}/>
                    <div className="d-flex flex-row w-100 h-100 position-relative">
                        <Sidebar reference = {sideMenu} navigateTo = {navigate}/>
                        <main className= "d-flex flex-column main-panel">
                            <div className="side-backdrop w-100 h-100"></div>
                            <div className="p-3" style={{height:"80%", overflowY:'auto', overflowX:"hidden"}}>
                                <Routing isAuth={ isAuth } login = {login}/>
                            </div>
                        </main>
                    </div>
                </div>
            </Mainlayout>
    );
}

export default App;
