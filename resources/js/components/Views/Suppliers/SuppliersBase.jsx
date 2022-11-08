import { Link, Outlet } from "react-router-dom";

function SuppliersBase(){
    return(
        <div className="p-5 d-flex flex-column">
            <nav className="d-flex justify-content-md-start justify-content-center" style={{height:'5rem'}}>
                <Link to={"/suppliers"}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Suppliers List
                    </button>
                </Link>
                <Link to ={'add-supplier'}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Add Supplier
                    </button>
                </Link>
            </nav>
            <div className="flex-fill pt-2">
                <Outlet/>
            </div>
        </div>
    );
}

export default SuppliersBase;