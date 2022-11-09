import { useRef, useState, useEffect } from "react";
import Routing from "./Configurations/RouteConfigs/Routing-setup";
import Mainlayout from "./Layout/base";
import Header from "./Views/Common/Header";
import Sidebar from "./Views/Common/Side-Menu";
import { useNavigate } from "react-router-dom";
import userCrud from "./Configurations/ApiCalls/user-crud";
import { cannotBeEmpty, deleteCookie, getCookie, setCookie, validateEmail } from "./Configurations/constants";

/**
 * Application Component of the React Application Bootstrapped by index.jsx
 *
 * @returns JSX.Element
 */
function App() {

    const [isAuth, setIsAuth] = useState(false);
    let navigate = useNavigate();
    const sideMenu = useRef();

    useEffect(async () => {
        if(getCookie('token')){
            setIsAuth(true);
        }

        return (()=>{
            setIsAuth(false);
        });

    },[isAuth]);

    const login = async (e) => {
        e.preventDefault();

        let emailValid = false;
        let passValid = false;

        if(cannotBeEmpty(e.target[0])){
            if(validateEmail(e.target[0].value.trim())){
                e.target[0].classList.add('is-valid');
                e.target[0].classList.remove('is-invalid');
                emailValid = true;
            }else{
                e.target[0].classList.remove('is-valid');
                e.target[0].classList.add('is-invalid');
                document.querySelector("#" + e.target[0].getAttribute("id") + "-feedback").innerHTML = "Email format is incorrect!";
            }
        }else{
            e.target[0].classList.add('is-invalid');
            e.target[0].classList.remove('is-valid');
            document.querySelector("#" + e.target[0].getAttribute("id") + "-feedback").innerHTML = "Email is required!";
        }

        if(cannotBeEmpty(e.target[1])){
            e.target[1].classList.remove('is-invalid');
            e.target[1].classList.add('is-valid');
            document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "";
            passValid = true;
        }else{
            e.target[1].classList.remove('is-valid');
            e.target[1].classList.add('is-invalid');
            document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "Password is required!";
       }

       if (emailValid && passValid){

           const attempt = await userCrud.login(
               {
                   "email" : e.target[0].value,
                   "password" : e.target[1].value
               }
           );

           const resp = await attempt;
           if(resp.status == 'success'){
               setCookie('token', await attempt.authorisation.token);
               setIsAuth(true);
               navigate("/");
           }else{
               e.target[0].classList.add('is-invalid');
               e.target[0].classList.remove('is-valid');
               e.target[1].classList.add('is-invalid');
               e.target[1].classList.remove('is-valid');
               document.querySelector("#" + e.target[0].getAttribute("id") + "-feedback").innerHTML = "email or password may be incorrect";
               document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "";

               emailValid = false;
               passValid = false;
           }
       }

    }

    const logout = async () => {

        await userCrud.logout();
        deleteCookie('token');
        setIsAuth(false);
        navigate('/login')
    }

    return (
            <Mainlayout>
                <div className="d-flex flex-column w-100 h-100">
                    <Header sidemenu={sideMenu} isAuth = {isAuth}/>
                    <div className="d-flex flex-row w-100 h-100 position-relative">
                        {
                            isAuth && <Sidebar reference = {sideMenu} navigateTo = {navigate} logout = {logout}/>
                        }

                        <main className= "d-flex flex-column main-panel">
                            {
                                isAuth && <div className="side-backdrop w-100 h-100"></div>
                            }
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
