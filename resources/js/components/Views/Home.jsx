import { hasAnyRole } from '../Configurations/constants';
import { useState, useEffect } from 'react';
import dashboardCrud from '../Configurations/ApiCalls/dashboard-crud';

/**
 * This is the dashboard component
 *
 * @param {permission} param0
 * @returns JSX.Element
 */
function Dashboard({permission}){

    const [dashboardContent, setDashboardContent] = useState(null);
    useEffect(async () => {
        if (hasAnyRole(permission, ['ROLE_ADMIN'])){
            const resp = await dashboardCrud.getAdminDashboardReport();
            setDashboardContent(resp[1]);
        }else if(hasAnyRole(permission, ['ROLE_STORE_OWNER'])){
            const resp = await dashboardCrud.getStoreOwnerDashboardReport();
            setDashboardContent(resp[1]);
        }
    },[]);

    return(
        <div style = {{height:"40rem", overflowY:"auto", overflowX:"hidden"}}>
            <section className="row g-3 p-3 justify-content-center">
                {/* this is where we add the dashboard*/}
                {
                    hasAnyRole(permission, ['ROLE_ADMIN']) && dashboardContent != null &&
                    <>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <div className="card bg-dark text-light p-2" style={{height:"100%"}}>
                                <img src={"http://localhost:8000/img/Dashboard/Employees.png"} className="w-100 h-100 jumpstart-logo"/>
                                <div className="card-img-overlay jumpstart-overlay">
                                    <div className="position-relative w-100 h-100">
                                        <h4 className="card-title h2 text-uppercase">Total Employees</h4>
                                        <div className="w-100 position-absolute bottom-0 d-flex justify-content-end h4">
                                            <span className="fw-bold me-1">Total: </span>
                                            <span className="fw-bold">{ dashboardContent.Employees }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <div className="card bg-dark text-light p-2" style={{height:"100%"}}>
                                <img src={"http://localhost:8000/img/Dashboard/Categories.png"} className="w-100 h-100 jumpstart-logo"/>
                                <div className="card-img-overlay jumpstart-overlay">
                                    <div className="position-relative w-100 h-100">
                                        <h4 className="card-title h2 text-uppercase">Total Categories</h4>
                                        <div className="w-100 position-absolute bottom-0 d-flex justify-content-end h4">
                                            <span className="fw-bold me-1">Total: </span>
                                            <span className="fw-bold">{ dashboardContent.Categories }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <div className="card bg-dark text-light p-2" style={{height:"100%"}}>
                                <img src={"http://localhost:8000/img/Dashboard/suppliers.png"} className="w-100 h-100 jumpstart-logo"/>
                                <div className="card-img-overlay jumpstart-overlay">
                                    <div className="position-relative w-100 h-100">
                                        <h4 className="card-title h2 text-uppercase">Total Suppliers</h4>
                                        <div className="w-100 position-absolute bottom-0 d-flex justify-content-end h4">
                                            <span className="fw-bold me-1">Total: </span>
                                            <span className="fw-bold">{ dashboardContent.Suppliers }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <div className="card bg-dark text-light p-2" style={{height:"100%"}}>
                                <img src={"http://localhost:8000/img/Dashboard/product to be paid.png"} className="w-100 h-100 jumpstart-logo"/>
                                <div className="card-img-overlay jumpstart-overlay">
                                    <div className="position-relative w-100 h-100">
                                        <h4 className="card-title h2 text-uppercase">Total Products to be Paid</h4>
                                        <div className="w-100 position-absolute bottom-0 d-flex justify-content-end h4">
                                            <span className="fw-bold me-1">Total: </span>
                                            <span className="fw-bold">{ dashboardContent.ProductsPayable }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <div className="card bg-dark text-light p-2" style={{height:"100%"}}>
                                <img src={"http://localhost:8000/img/Dashboard/product in inventory.png"} className="w-100 h-100 jumpstart-logo"/>
                                <div className="card-img-overlay jumpstart-overlay">
                                    <div className="position-relative w-100 h-100">
                                        <h4 className="card-title h2 text-uppercase">Total Products in Inventory</h4>
                                        <div className="w-100 position-absolute bottom-0 d-flex justify-content-end h4">
                                            <span className="fw-bold me-1">Total: </span>
                                            <span className="fw-bold">{ dashboardContent.ProductsPaid }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-lg-4">
                            <div className="card bg-dark text-light p-2" style={{height:"100%"}}>
                                <img src={"http://localhost:8000/img/Dashboard/store.png"} className="w-100 h-100 jumpstart-logo"/>
                                <div className="card-img-overlay jumpstart-overlay">
                                    <div className="position-relative w-100 h-100">
                                        <h4 className="card-title h2 text-uppercase">Total Branches</h4>
                                        <div className="w-100 position-absolute bottom-0 d-flex justify-content-end h4">
                                            <span className="fw-bold me-1">Total: </span>
                                            <span className="fw-bold">{ dashboardContent.Stores }</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {
                    hasAnyRole(permission, ['ROLE_STORE_OWNER']) && dashboardContent != null &&
                        <>
                            <div className="col-12 col-sm-6 col-lg-4">
                                <div className="card bg-dark text-light p-2" style={{height:"100%"}}>
                                    <img src={"http://localhost:8000/img/Dashboard/sales.png"} className="w-100 h-100 jumpstart-logo"/>
                                    <div className="card-img-overlay jumpstart-overlay">
                                        <div className="position-relative w-100 h-100">
                                            <h4 className="card-title h2 text-uppercase">Total Sales</h4>
                                            <div className="w-100 position-absolute bottom-0 d-flex justify-content-end h4">
                                                <span className="fw-bold me-1">Total: </span>
                                                <span className="fw-bold">{ dashboardContent.Sales }</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4">
                                <div className="card bg-dark text-light p-2" style={{height:"100%"}}>
                                    <img src={"http://localhost:8000/img/Dashboard/stocks.png"} className="w-100 h-100 jumpstart-logo"/>
                                    <div className="card-img-overlay jumpstart-overlay">
                                        <div className="position-relative w-100 h-100">
                                            <h4 className="card-title h2 text-uppercase">Available Stocks</h4>
                                            <div className="w-100 position-absolute bottom-0 d-flex justify-content-end h4">
                                                <span className="fw-bold me-1">Total: </span>
                                                <span className="fw-bold">{ dashboardContent.AvailableStocks }</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-4">
                                <div className="card bg-dark text-light p-2" style={{height:"100%"}}>
                                    <img src={"http://localhost:8000/img/Dashboard/Employees.png"} className="w-100 h-100 jumpstart-logo"/>
                                    <div className="card-img-overlay jumpstart-overlay">
                                        <div className="position-relative w-100 h-100">
                                            <h4 className="card-title h2 text-uppercase">Total Employees</h4>
                                            <div className="w-100 position-absolute bottom-0 d-flex justify-content-end h4">
                                                <span className="fw-bold me-1">Total: </span>
                                                <span className="fw-bold">{ dashboardContent.Employees }</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }
            </section>
        </div>
    );
}

export default Dashboard;
