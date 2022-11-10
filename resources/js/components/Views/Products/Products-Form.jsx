import { useLocation } from "react-router-dom";

function ProductForm(){

    const location = useLocation();

    return (
        <div className="card bg-dark bg-opacity-75 text-light" style={{height:"40rem", overflowY:"auto"}}>
            <div className="card-body">
                <form className="row gy-2 p-2" autoComplete="off">
                    <div className="col-12">
                        <h1 className="text-center">
                            {
                               location.pathname === "/products/add-product" ? "Add Product" : "Edit Product"
                            }
                        </h1>
                    </div>

                    <div className="col-md-6 col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "product_name"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="product_name">Product Name</label>
                    </div>
                    <div className="col-12 col-md-6 form-floating">
                        <input
                            type={"number"}
                            min={0}
                            className="form-control bg-input text-light border border-dark"
                            id = "product_markup"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="product_markup">Product Markup</label>
                    </div>
                    <div className="col-12 form-floating">
                        <select
                            className="form-select bg-input text-light border border-dark"
                            id = "category"
                        >
                            <option>Hello</option>

                        </select>
                        <label className =  "ms-2" htmlFor="category">Category</label>
                    </div>
                    <div className="col-12 form-floating">
                        <select
                            className="form-select bg-input text-light border border-dark"
                            id = "supplier"
                        >
                            <option>Hello</option>

                        </select>
                        <label className =  "ms-2" htmlFor="supplier">Supplier</label>
                    </div>
                    <div className="col-12">
                        <label className = "ms-2" htmlFor="product_image">Product Image</label>
                        <input
                            type={"file"} accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                            className="form-control bg-input text-light border border-dark"
                            id = "product_image"
                            placeholder="PNG, JPG, GIF, SVG allowed"
                        />
                    </div>
                    <div className="col-12 form-floating">
                        <textarea
                            className="form-control bg-input text-light border border-dark"
                            id = "product_desc"
                            placeholder="..."
                            style={{height:"10rem"}}
                        />
                        <label className = "ms-2" htmlFor="product_desc">Product Description</label>
                    </div>
                    {
                        !location.pathname === "/products/add-product" && (<input type={"hidden"} value ="" id = "product-id"/>)
                    }
                    <div className="col-12">
                        <button className="w-100 btn btn-dark jumpstart border border-dark">
                            {
                               location.pathname === "/products/add-product" ? "Add Product" : "Edit Product"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductForm;
