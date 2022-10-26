import { Navigate } from "react-router-dom";

function Anonymous({component, isAuth}){
    return !isAuth ? component : <Navigate to = "/"/>;
}

export default Anonymous;
