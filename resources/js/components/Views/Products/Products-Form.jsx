import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import categoryCrud from "../../Configurations/ApiCalls/category-crud";
import productCrud from "../../Configurations/ApiCalls/product-crud";
import supplierCrud from "../../Configurations/ApiCalls/supplier-crud";
import { removeError, setErrorWithMessage } from "../../Configurations/constants";

/**
 * Component for adding and editing product information
 *
 * @returns JSX.Element
 */
function ProductForm(){

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [product, setProduct] = useState(null);

    const location = useLocation();
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        const dropdown = await Promise.all([categoryCrud.getCategories(''), supplierCrud.getSuppliers('')]);
        setCategories(dropdown[0]);
        setSuppliers(dropdown[1]);

        if (typeof id != "undefined"){
            const resp = await productCrud.getProduct(id);
            setProduct(await resp[1]);
        }else{
            setProduct(null);
        }

        return(()=>{
            setProduct(null);
        });
    }, [id]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (e.target[5].value != null){
            if (new Date(e.target[5].value).getTime() <= new Date().getTime()){
                setErrorWithMessage(e.target[5], 'expiry date cannot be less than or equal to current date');
                return;
            }
        }

        if(typeof id == "undefined"){

            try{
                await productCrud.addProduct({
                    Product_Name : e.target[0].value,
                    Product_Price : e.target[1].value,
                    Product_Markup : e.target[2].value,
                    category : e.target[3].value,
                    supplier : e.target[4].value,
                    Product_Expiry : e.target[5].value,
                    Product_Image : e.target[6].files[0],
                    Product_Desc : e.target[7].value,
                });
                navigate('/products');
            }catch(e){
                let resp = e.response.data;
                console.log(resp);
                switch (resp[0].status) {
                    case "bad request":
                        for (const [key, value] of Object.entries(resp[1])){
                            setErrorWithMessage(document.querySelector('#' + key), value);
                        }
                        break;
                    default:
                        return;
                }
            }

        }else{
            try{
                await productCrud.updateProduct({
                    Product_Name : e.target[0].value,
                    Product_Price : e.target[1].value,
                    Product_Markup : e.target[2].value,
                    category : e.target[3].value,
                    supplier : e.target[4].value,
                    Product_Expiry : e.target[5].value,
                    Product_Image : e.target[6].files[0],
                    Product_Desc : e.target[7].value,
                }, id);
                navigate('/products');
            }catch(e){
                let resp = e.response.data;
                console.log(resp);
                switch (resp[0].status) {
                    case "bad request":
                        for (const [key, value] of Object.entries(resp[1])){
                            setErrorWithMessage(document.querySelector('#' + key), value);
                        }
                        break;
                    default:
                        return;
                }
            }
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
                            onBlur = {removeError}
                            defaultValue = { product == null ? "" : product.Product_Name }
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
                            onBlur = {removeError}
                            defaultValue = { product == null ? "" : product.Product_Price }
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
                            onBlur = {removeError}
                            defaultValue = { product == null ? "" : product.Product_Markup }
                        />
                        <label className =  "ms-2" htmlFor="Product_Markup">Product Markup</label>
                        <div className="invalid-feedback" id = "Product_Markup-feedback"></div>
                    </div>
                    <div className="col-md-6 col-12 form-floating">
                        <select
                            className="form-select bg-input text-light border border-dark"
                            id = "category"
                            onBlur = {removeError}
                            defaultValue={ product == null ? "" : product.Category_Id }
                        >
                            <option disabled value ={""}>Please Select</option>
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
                            defaultValue={product == null ? '' : product.Supplier_Id }
                            onBlur = {removeError}
                            >
                            <option disabled value ={''}>Please Select</option>
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
                            onBlur = {removeError}
                            />
                        <label className =  "ms-2" htmlFor="Product_Expiry">Product Expiry</label>
                        <div className="invalid-feedback" id = "Product_Expiry-feedback"></div>
                    </div>
                    <div className="col-12">
                        <label className = "ms-2" htmlFor="Product_Image">Product Image</label>
                        <input
                            type="file" accept="image/png, image/gif, image/jpeg, image/jpg, image/svg"
                            className="form-control bg-input text-light border border-dark"
                            id = "Product_Image"
                            placeholder="PNG, JPG, GIF, SVG allowed"
                            onBlur = {removeError}
                            />
                        <div className="invalid-feedback" id = "Product_Image-feedback"></div>
                    </div>
                    <div className="col-12 form-floating">
                        <textarea
                            className="form-control bg-input text-light border border-dark"
                            id = "Product_Desc"
                            placeholder="..."
                            style={{height:"10rem"}}
                            onBlur = {removeError}
                            defaultValue ={product == null ? "" : product.Product_Desc}
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
