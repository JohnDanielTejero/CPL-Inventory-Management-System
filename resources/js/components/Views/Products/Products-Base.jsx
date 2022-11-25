import { Link, Outlet } from "react-router-dom";

/**
 * Base template for products component
 *
 * @returns JSX.Element
 */
function ProductsBase(){
    return(
        <div className="p-5 d-flex flex-column" style = {{height:"40rem", overflowY:"auto"}}>
            <nav className="d-flex justify-content-md-start justify-content-center" style={{height:'5rem'}}>
                <Link to={"/products"}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Products List
                    </button>
                </Link>
                <Link to ={'add-product'}>
                    <button className="btn btn-dark jumpstart h-100 me-2">
                        Add Product
                    </button>
                </Link>
            </nav>
            <div className="flex-fill pt-2">
                <Outlet/>
            </div>
        </div>
    );
}

export default ProductsBase;
