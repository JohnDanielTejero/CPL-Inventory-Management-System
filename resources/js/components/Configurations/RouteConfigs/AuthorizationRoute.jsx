import { Navigate } from "react-router-dom";
import { hasAnyRole } from "../constants";

function Authorization({component:component, permission, allowedroles}){
    return (hasAnyRole(permission, allowedroles)) ? component : <Navigate to = "/profile"/>;
}

export default Authorization;
