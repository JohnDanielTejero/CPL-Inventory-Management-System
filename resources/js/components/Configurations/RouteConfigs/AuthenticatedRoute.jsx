import { Navigate } from "react-router-dom";

function Authenticated({component, isAuth}){
    return isAuth ? component : <Navigate to = "/login"/>;
}

export default Authenticated;
