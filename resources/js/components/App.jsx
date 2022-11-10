import { useRef, useState, useEffect } from "react";
import Routing from "./Configurations/RouteConfigs/Routing-setup";
import Mainlayout from "./Layout/base";
import Header from "./Views/Common/Header";
import Sidebar from "./Views/Common/Side-Menu";
import { useNavigate } from "react-router-dom";
import userCrud from "./Configurations/ApiCalls/user-crud";
import { cannotBeEmpty, deleteCookie, getCookie, setCookie, setErrorWithMessage, setSuccess, validateEmail } from "./Configurations/constants";

/**
 * Application Component of the React Application Bootstrapped by index.jsx
 *
 * @returns JSX.Element
 */
function App() {

    const [isAuth, setIsAuth] = useState(false);
    let navigate = useNavigate();
    const sideMenu = useRef();

    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);

    const setCurrentRoles = (currentroles) => {
        if (typeof currentroles === "undefined") return;
        setRoles(
            currentroles.map((e) => {
                return e.Role_Name;
            })
        )
   }

    useEffect(async () => {
        if(getCookie('token')){
            const currentuser = await userCrud.getActiveUser();
            setUser(await currentuser);
            setCurrentRoles(currentuser.user__roles);
        }
    }, []);


    useEffect(async () => {
        if(getCookie('token')){
            setIsAuth(true);
        }

        return (()=>{
            setIsAuth(false);
            setRoles([]);
        });

    },[isAuth]);

    const login = async (e) => {
        e.preventDefault();

        let emailValid = false;
        let passValid = false;

        if(cannotBeEmpty(e.target[0])){
            if(validateEmail(e.target[0].value.trim())){
                setSuccess(e.target[0]);
                emailValid = true;
            }else{
                setErrorWithMessage(e.target[0], "Email format is incorrect!");
            }
        }else{
            setErrorWithMessage(e.target[0], "Email is required!");
        }

        if(cannotBeEmpty(e.target[1])){
            setSuccess(e.target[1]);
            passValid = true;
        }else{
            setErrorWithMessage(e.target[1], "Password is required");
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
               if(getCookie('token')){
                    const currentuser = await userCrud.getActiveUser();
                    setUser(await currentuser);
                    setCurrentRoles(await currentuser.user__roles);
                    setIsAuth(true);
                }

               navigate("/");
           }else{
                setErrorWithMessage(e.target[0], "email or password may be incorrect");
                setErrorWithMessage(e.target[1], "");
               emailValid = false;
               passValid = false;
           }
       }
    }

    const logout = async () => {

        await userCrud.logout();
        deleteCookie('token');
        setIsAuth(false);
        setUser(null);
        navigate('/login')
    }

    return (
            <Mainlayout>
                <div className="d-flex flex-column w-100 h-100">
                    <Header sidemenu={sideMenu} isAuth = {isAuth}/>
                    <div className="d-flex flex-row w-100 h-100 position-relative">
                        {
                            isAuth && <Sidebar reference = {sideMenu} navigateTo = {navigate} logout = {logout} user = {user} permission = {roles}/>
                        }

                        <main className= "d-flex flex-column main-panel">
                            {
                                isAuth && <div className="side-backdrop w-100 h-100"></div>
                            }
                            <div className="p-3" style={{height:"100%", overflowY:'auto', overflowX:"hidden"}}>
                                <Routing isAuth={ isAuth } login = {login} updateUser = {setUser} permission = {roles}/>
                            </div>
                        </main>
                    </div>
                </div>
            </Mainlayout>
    );
}

export default App;
