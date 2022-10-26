import { Route, Routes } from "react-router-dom";
import Anonymous from "./AnonymousRoute";
import Authorization from "./AuthorizationRoute";
import Authenticated from "./AuthenticatedRoute";
import Dashboard from "../../Views/Home";

function Routing(){
    return(
        <Routes>
            <Route element = {
                <Dashboard/>
            }
            index
            />
            <Route element = {
                 <Dashboard/>
            }
            path="/dashboard"
            />
            {/*

            <Route element = {

                }
                path=""
            />
            <Route element = {

                } path=""
            />
            <Route element = {
                }
                path=""
            />
            */}
        </Routes>
    );
}

export default Routing;
