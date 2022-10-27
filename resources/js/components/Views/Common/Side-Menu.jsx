import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({reference, navigateTo}){

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

    useEffect(()=>{
        if (currentLocation != null){
            const buttons = document.querySelectorAll('[data-side-url]')
            buttons.forEach(e => {
                if (currentLocation.includes(e.getAttribute('data-side-url'))){
                    e.classList.add('active');
                }else{
                    e.classList.remove('active');
                }
            });
        }
    },[currentLocation]);


    const removePopUp = (e) => {
        if (window.innerWidth < 768){
            e.target.parentElement.parentElement.parentElement.classList.remove('active');
        }
        navigateTo(e.target.getAttribute('data-side-url'));
    }

    return(
        <aside className = "bg-light d-flex flex-column h-100 side-menu active" ref = {reference}>
            <div className="w-100 bg-dark bg-gradient flex-fill" style={{overflowY: 'auto', overflowX: 'hidden'}}>
                {/* Dashboard */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button
                        className="side-menu-button w-100 h-100"
                        onClick={removePopUp}
                        data-side-url = "/"
                    >
                        <span className="bi bi-speedometer2 me-2"></span>
                        <span>Dashboard</span>
                    </button>
                </div>

                {/* Category */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "categories">
                        <span className="bi bi-tags-fill me-2"></span>
                        <span>Category</span>
                    </button>
                </div>

                {/* Products */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "products">
                        <span className="bi bi-bag-fill me-2"></span>
                        <span>Products</span>
                    </button>
                </div>

                {/* User */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "employee">
                        <span className="bi bi-people-fill me-2"></span>
                        <span>Employee</span>
                    </button>
                </div>

                {/* Suppliers */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "suppliers">
                        <span className="bi bi-truck me-2"></span>
                        <span>Suppliers</span>
                    </button>
                </div>
                {/* Sales */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "sales">
                        <span className="bi bi-cart4 me-2"></span>
                        <span>Sales</span>
                    </button>
                </div>

                {/* Stores */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "stores">
                        <span className="bi bi-shop-window me-2"></span>
                        <span>Stores</span>
                    </button>
                </div>

                {/* Stocks */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100" onClick={removePopUp} data-side-url= "stocks">
                        <span className="bi bi-box-seam-fill me-2"></span>
                        <span>Stocks</span>
                    </button>
                </div>
            </div>

            <div className="overflow-hidden w-100 bg-dark bg-gradient"  style={{height:'5rem'}}>
                <div className="w-100 h-100 d-flex justify-content-center">
                    <Link
                        className="btn btn-dark bg-gradient border border-0 rounded-0 d-flex flex-row align-items-center"
                        style = {{width:'70%'}}
                        to ={"/profile"}
                    >
                        <span className="bi bi-person-circle display-6"></span>
                        <div className="d-flex flex-column align-items-start ps-3 w-100">
                            <span className="side-menu-collapsible overflow-hidden h5">User name</span>
                            <span className="side-menu-collapsible overflow-hidden">Store affiliate</span>
                        </div>
                    </Link>
                    <button className="btn btn-dark bg-gradient bg-opacity-50 border border-0 rounded-0" style = {{width:'30%'}}>
                        <span className="d-inline-block bi bi-box-arrow-right"></span>
                        <span className="d-inline-block w-100">
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
