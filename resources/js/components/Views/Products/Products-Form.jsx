import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import categoryCrud from "../../Configurations/ApiCalls/category-crud";
import productCrud from "../../Configurations/ApiCalls/product-crud";
import supplierCrud from "../../Configurations/ApiCalls/supplier-crud";

function ProductForm(){

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [product, setProduct] = useState(null);

    const location = useLocation();
    let { id } = useParams();

    useEffect(async () => {
        const dropdown = await Promise.all([categoryCrud.getCategories(''), supplierCrud.getSuppliers('')]);
        setCategories(dropdown[0]);
        setSuppliers(dropdown[1]);

        if (typeof id != "undefined"){
            const resp = await productCrud.getProduct(id);
            setProduct(await resp);
        }

    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        if(typeof id == "undefined"){

            const attempt = await productCrud.addProduct({
                Product_Name : e.target[0].value,
                Product_Price : e.target[1].value,
                Product_Markup : e.target[2].value,
                category : Number(e.target[3].value),
                supplier : Number(e.target[4].value),
                Product_Image : e.target[5].value,
                Product_Desc : e.target[6].value,
            });

            const resp = await attempt;
            console.log(resp);
        }else{

        }
    }

    return (
        <div className="card bg-dark bg-opacity-75 text-light" style={{height:"40rem", overflowY:"auto"}}>
            <div className="card-body">
                <form className="row gy-2 gx-2 p-2" autoComplete="off" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <h1 className="text-center">
                            {
                               location.pathname === "/products/add-product" ? "Add Product" : "Edit Product"
                            }
                        </h1>
                    </div>

                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "Product_Name"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="Product_Name">Product Name</label>
                        <div className="invalid-feedback" id = "Product_Name-feedback"></div>
                    </div>
                    <div className="col-12 col-md-6 form-floating">
                        <input
                            type={"number"}
                            min={0}
                            className="form-control bg-input text-light border border-dark"
                            id = "Product_Price"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="Product_Price">Product Price</label>
                        <div className="invalid-feedback" id = "Product_Price-feedback"></div>
                    </div>
                    <div className="col-12 col-md-6 form-floating">
                        <input
                            type={"number"}
                            min={0}
                            className="form-control bg-input text-light border border-dark"
                            id = "Product_Markup"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="Product_Markup">Product Markup</label>
                        <div className="invalid-feedback" id = "Product_Markup-feedback"></div>
                    </div>
                    <div className="col-md-6 col-12 form-floating">
                        <select
                            className="form-select bg-input text-light border border-dark"
                            id = "category"
                        >
                            <option value={''}>Please Select</option>
                            {
                                categories.map(e => {
                                    return <option value = { e.category_id } key = { e.category_id }>{ e.Category_Name }</option>
                                })
                            }
                        </select>
                        <label className =  "ms-2" htmlFor="category">Category</label>
                        <div className="invalid-feedback" id = "category-feedback"></div>
                    </div>
                    <div className="col-md-6 col-12 form-floating">
                        <select
                            className="form-select bg-input text-light border border-dark"
                            id = "supplier"
                        >
                            <option value={''}>Please Select</option>
                            {
                                suppliers.map( e => {
                                    return <option value = { e.supp_id } key = { e.supp_id }>{ e.Supp_Name }</option>
                                })
                            }
                        </select>
                        <label className = "ms-2" htmlFor="supplier">Supplier</label>
                        <div className="invalid-feedback" id = "supplier-feedback"></div>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            type={"date"}
                            min={0}
                            className="form-control bg-input text-light border border-dark"
                            id = "Product_Expiry"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="Product_Expiry">Product Expiry</label>
                        <div className="invalid-feedback" id = "Product_Expiry-feedback"></div>
                    </div>
                    <div className="col-12">
                        <label className = "ms-2" htmlFor="Product_Image">Product Image</label>
                        <input
                            type={"file"} accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                            className="form-control bg-input text-light border border-dark"
                            id = "Product_Image"
                            placeholder="PNG, JPG, GIF, SVG allowed"
                        />
                        <div className="invalid-feedback" id = "Product_Image-feedback"></div>
                    </div>
                    <div className="col-12 form-floating">
                        <textarea
                            className="form-control bg-input text-light border border-dark"
                            id = "Product_Desc"
                            placeholder="..."
                            style={{height:"10rem"}}
                        />
                        <div className="invalid-feedback" id = "Product_Desc-feedback"></div>
                        <label className = "ms-2" htmlFor="Product_Desc">Product Description</label>
                    </div>
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
