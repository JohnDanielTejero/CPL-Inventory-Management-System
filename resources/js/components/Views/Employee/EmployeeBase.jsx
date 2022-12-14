import { Link, Outlet } from "react-router-dom";

/**
 * Component layout for employees page
 *
 * @returns JSX.Element
 */
function EmployeeBase(){
    return(
        <div className="p-5 d-flex flex-column" style = {{height:"40rem", overflowY:"auto"}}>
            <nav className="d-flex justify-content-md-start justify-content-center" style={{height:'5rem'}}>
                <Link to={"/employee"}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Employee List
                    </button>
                </Link>
                <Link to ={'add-new-employee'}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Add Employee
                    </button>
                </Link>
            </nav>
            <div className="flex-fill pt-2">
                <Outlet/>
            </div>
        </div>
    );
}

export default EmployeeBase;
