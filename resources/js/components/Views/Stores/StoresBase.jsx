import { Link, Outlet } from "react-router-dom";

/**
 * Base layout for stores component
 *
 * @returns JSX.Element
 */
function StoresBase(){
    return(
        <div className="p-5 d-flex flex-column" style = {{height:"50rem", overflowY:"auto"}}>
            <nav className="d-flex justify-content-md-start justify-content-center" style={{height:'5rem'}}>
                <Link to={"/stores"}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Stores List
                    </button>
                </Link>
                <Link to ={'add-store'}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Add Stores
                    </button>
                </Link>
            </nav>
            <div className="flex-fill pt-2">
                <Outlet/>
            </div>
        </div>
    );
}

export default StoresBase;
