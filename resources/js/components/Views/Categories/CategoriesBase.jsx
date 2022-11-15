import { Link, Outlet } from "react-router-dom";

/**
 * Base template component for category page.
 *
 * @returns JSX.Element
 */
function CategoriesBase(){
    return(
        <div className="p-5 d-flex flex-column" style = {{height:"50rem", overflowY:"auto"}}>
            <nav className="d-flex justify-content-md-start justify-content-center" style={{height:'5rem'}}>
                <Link to={"/category"}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Categories List
                    </button>
                </Link>
                <Link to ={'add-category'}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Add Category
                    </button>
                </Link>
            </nav>
            <div className="flex-fill pt-2">
                <Outlet/>
            </div>
        </div>
    );
}

export default CategoriesBase;
