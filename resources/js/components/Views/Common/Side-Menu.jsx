import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { hasAnyRole } from "../../Configurations/constants";

/**
 * Sidebar component for the application
 *
 * @param {reference, navigateTo, logout, user, permission} param0
 * @returns JSX.Element
 */
function Sidebar({reference, navigateTo, logout, user, permission}){

    const location = useLocation();
    const [currentLocation, setCurrentLocation] = useState();

    useEffect(()=>{

        if (location.pathname != "/"){
            location.pathname.replace("/", "");
            setCurrentLocation(location.pathname.replace("/", ""));
        }else{
            setCurrentLocation(location.pathname);
        }
    },[location]);

    useEffect( () => {
        if (currentLocation != null){
            const buttons = document.querySelectorAll('[data-side-url]')
            buttons.forEach(e => {
                if ((e.getAttribute('data-side-url')).indexOf(currentLocation) != -1){
                    e.classList.add('active');
                }else{
                    e.classList.remove('active');
                }
            });
        }
    }, [currentLocation]);

    const removePopUp = (e) => {
        if (window.innerWidth < 768){
            e.target.parentElement.parentElement.parentElement.classList.remove('active');
        }
        navigateTo(e.target.getAttribute('data-side-url'));
    }

    return(
        <aside className = "bg-light d-flex flex-column h-100 side-menu active" ref = {reference}>
            <div className="w-100 bg-dark bg-gradient" style={{overflowY: 'auto', overflowX: 'hidden', height:'85%'}}>
                {/* Dashboard */}
                {
                    hasAnyRole(permission, ['ROLE_ADMIN', 'ROLE_STORE_OWNER']) &&
                        <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                            <button
                                className="side-menu-button w-100 h-100"
                                onClick={removePopUp}
                                data-side-url = "/"
                            >
                                <span className="bi bi-speedometer2 me-2" style={{pointerEvents:"none"}}></span>
                                <span style={{pointerEvents:"none"}}>Dashboard</span>
                            </button>
                        </div>
                }

                {/* Category */}
                {
                    hasAnyRole(permission, ['ROLE_ADMIN']) &&
                        <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                            <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "category">
                                <span className="bi bi-tags-fill me-2" style={{pointerEvents:"none"}}></span>
                                <span style={{pointerEvents:"none"}}>Category</span>
                            </button>
                        </div>

                }

                {/* Products */}
                {
                    hasAnyRole(permission, ['ROLE_ADMIN']) &&
                        <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                            <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "products">
                                <span className="bi bi-bag-fill me-2" style={{pointerEvents:"none"}}></span>
                                <span style={{pointerEvents:"none"}}>Products</span>
                            </button>
                        </div>
                }

                {/* User */}
                {
                    hasAnyRole(permission, ['ROLE_ADMIN', 'ROLE_STORE_OWNER']) &&
                        <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                            <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "employee">
                                <span className="bi bi-people-fill me-2" style={{pointerEvents:"none"}}></span>
                                <span style={{pointerEvents:"none"}}>Employee</span>
                            </button>
                        </div>
                }

                {/* Suppliers */}
                {
                    hasAnyRole(permission, ['ROLE_ADMIN']) &&
                        <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                            <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "suppliers">
                                <span className="bi bi-truck me-2" style={{pointerEvents:"none"}}></span>
                                <span style={{pointerEvents:"none"}}>Suppliers</span>
                            </button>
                        </div>
                }

                {/* Sales */}
                {
                    hasAnyRole(permission, ['ROLE_STORE_OWNER','ROLE_EMPLOYEE']) &&
                        <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                            <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "sales">
                                <span className="bi bi-cart4 me-2" style={{pointerEvents:"none"}}></span>
                                <span style={{pointerEvents:"none"}}>Sales</span>
                            </button>
                        </div>
                }

                {/* Stores */}
                {
                    hasAnyRole(permission, ['ROLE_ADMIN']) &&
                        <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                            <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "stores">
                                <span className="bi bi-shop-window me-2" style={{pointerEvents:"none"}}></span>
                                <span style={{pointerEvents:"none"}}>Stores</span>
                            </button>
                        </div>
                }

                {/* Stocks */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "stocks">
                        <span className="bi bi-box-seam-fill me-2" style={{pointerEvents:"none"}}></span>
                        <span style={{pointerEvents:"none"}}>Stocks</span>
                    </button>
                </div>
            </div>

            <div className="overflow-hidden w-100 bg-dark bg-gradient flex-fill">
                <div className="w-100 d-flex justify-content-center" style={{height:"100%"}}>
                    <Link
                        className="btn btn-dark bg-gradient border border-0 rounded-0 d-flex flex-row align-items-center py-0"
                        style = {{width:'70%'}}
                        to ={"/profile"}
                    >
                        <span className="bi bi-person-circle display-6" style={{pointerEvents:"none"}}></span>
                        <div className="d-flex flex-column align-items-start ps-3 w-100" style={{pointerEvents:"none"}}>
                            <span className="side-menu-collapsible overflow-hidden h5" style={{pointerEvents:"none"}}>{ user != null && user.first_name + " " + user.last_name }</span>
                        </div>
                    </Link>
                    <button className="btn btn-dark bg-gradient bg-opacity-50 border border-0 rounded-0 py-0" style = {{width:'30%'}} onClick={logout}>
                        <span className="d-inline-block bi bi-box-arrow-right" style={{pointerEvents:"none"}}></span>
                        <span className="d-inline-block w-100" style={{pointerEvents:"none"}}>
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
