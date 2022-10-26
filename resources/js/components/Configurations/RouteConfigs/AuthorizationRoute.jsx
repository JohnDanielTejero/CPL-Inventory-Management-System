import checkPermission from "../ApiCalls/get-user";

async function Authorization({component, permission}){
    const response = await checkPermission('someurl', permission);
    return (await response.json()) ? component: <Navigate to = "/"/>;
}

export default Authorization;
