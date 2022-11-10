import { Link, Outlet } from "react-router-dom";

function SalesBase(){
    return(
        <div className="p-5 d-flex flex-column" style = {{height:"40rem", overflowY:"auto"}}>
            <nav className="d-flex justify-content-md-start justify-content-center" style={{height:'5rem'}}>
                <Link to={"/sales"}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Sales History
                    </button>
                </Link>
                <Link to ={'add-sale'}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Add New Sale Record
                    </button>
                </Link>
            </nav>
            <div className="flex-fill pt-2">
                <Outlet/>
            </div>
        </div>
    );
}

export default SalesBase;
