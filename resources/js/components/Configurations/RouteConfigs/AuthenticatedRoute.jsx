function Authenticated({component, isAuth}){
    return isAuth ? component : <Navigate to = "/"/>;
}

export default Authenticated;
