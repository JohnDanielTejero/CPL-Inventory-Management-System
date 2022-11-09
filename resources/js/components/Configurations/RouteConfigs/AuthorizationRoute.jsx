import userCrud from "../../Configurations/ApiCalls/user-crud";

async function Authorization({component, permission}){
    const response = await userCrud.hasAnyRole(permission);
    return (await response.json()) ? component: <Navigate to = "/login"/>;
}

export default Authorization;
