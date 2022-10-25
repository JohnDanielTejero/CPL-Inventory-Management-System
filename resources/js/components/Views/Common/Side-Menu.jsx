function Sidebar({reference}){
    return(
        <aside className = "bg-light d-flex flex-column h-100 side-menu active" ref = {reference}>
            <div className="w-100 bg-dark bg-gradient" style={{height:'39rem', overflowY: 'auto', overflowX: 'hidden'}}>
                {/* Dashboard */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button active w-100 h-100">
                        <span className="bi bi-speedometer2 me-1"></span>
                        <span>Dashboard</span>
                    </button>
                </div>
                {/* Products */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100">
                        <span className="bi bi-bag-fill me-1"></span>
                        <span>Products</span>
                    </button>
                </div>
                {/* User */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100">
                        <span className="bi bi-people-fill me-1"></span>
                        <span>Employee</span>
                    </button>
                </div>
                {/* Suppliers */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100">
                        <span className="bi bi-truck me-1"></span>
                        <span>Suppliers</span>
                    </button>
                </div>
                {/* Sales */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100">
                        <span className="bi bi-cart4 me-1"></span>
                        <span>Sales</span>
                    </button>
                </div>
                {/* Stores */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100">
                        <span className="bi bi-shop-window me-1"></span>
                        <span>Stores</span>
                    </button>
                </div>
                {/* Stocks */}
                <div className="overflow-hidden w-100 d-flex justify-content-center align-items-center" style={{height:'5rem'}}>
                    <button className="side-menu-button w-100 h-100">
                        <span className="bi bi-bag-dash-fill me-1"></span>
                        <span>Stocks</span>
                    </button>
                </div>
            </div>

            <div className="overflow-hidden w-100 bg-dark bg-gradient flex-fill">
                <div className="w-100 h-100 d-flex justify-content-center">
                    <button className="btn btn-dark bg-gradient border border-0 rounded-0 flex-fill d-flex flex-row align-items-center">
                        <span className="bi bi-person-circle display-6"></span>
                        <div className="d-flex flex-column align-items-start ps-3 w-100">
                            <span className="side-menu-collapsible overflow-hidden h5">User name</span>
                            <span className="side-menu-collapsible overflow-hidden">Store affiliate</span>
                        </div>
                    </button>
                    <button className="btn btn-dark bg-gradient bg-opacity-50 border border-0 rounded-0" style = {{width:'5rem'}}>
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
