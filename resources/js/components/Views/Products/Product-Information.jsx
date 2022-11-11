import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import productCrud from "../../Configurations/ApiCalls/product-crud";

function ProductDetails(){
    const [product, setProduct] = useState(null);
    let { id } = useParams();
    useEffect(async () => {
        const resp = await productCrud.getProduct(id);
        setProduct(await resp);
    },[id]);

    const handlePaidAmount = e => {
        if (e.target.value > product.Product_Payable){
            e.target.value = product.Product_Payable;
        }
    }

    return(
        <>
            {
                product != null &&
                <div className="row text-light">
                    <section className="col-md-6 col-12">
                        <div className="card bg-dark bg-opacity-75 text-light">
                            <div className="card-header p-0 bg-transparent border-0 overflow-hidden d-flex justify-content-center" style={{height:"20rem"}}>
                                <img
                                    src={product.Product_Image}
                                    style={{minHeight:"20rem", minWidth:"20rem"}}
                                />
                            </div>
                            <div className="card-body">
                                <h1 className="text-center">Product Information</h1>
                                <div>
                                    <table className="table table-dark jumpstart-table table-bordered table-hover">
                                        <tbody>
                                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                                <td>Product ID </td>
                                                <td style={{width:"10rem"}}>{ product.product_id }</td>
                                            </tr>
                                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                                <td style={{width:"10rem"}}>{ product.Product_Name }</td>
                                                <td>Some Product Name </td>
                                            </tr>
                                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                                <td style={{width:"10rem"}}>{ product.supplier.Supp_Name }</td>
                                                <td>Some Supplier Name </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="col-md-6 col-12">
                        <div className="card bg-dark bg-opacity-75 text-light mb-2">
                            <div className="card-body">
                                <table className="table table-dark jumpstart-table table-bordered table-hover">
                                    <tbody>
                                        <tr style={{height:"5rem", overflow:"hidden"}}>
                                            <td style={{width:"30%"}}>Product to be Received: </td>
                                            <td>{ product.Product_Payable }</td>
                                        </tr>
                                        <tr style={{height:"5rem", overflow:"hidden"}}>
                                            <td style={{width:"30%"}}>Product in Inventory: </td>
                                            <td>{ product.Product_Paid }</td>
                                        </tr>
                                        <tr style={{height:"5rem", overflow:"hidden"}}>
                                            <td style={{width:"30%"}}>Total Amount to Pay: </td>
                                            <td>P { Number(product.Product_Price) * product.Product_Payable } </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <button className = "btn btn-dark jumpstart mx-1" data-bs-toggle = "modal" data-bs-target="#addPayable">
                                Add Payable
                            </button>
                            <button className = "btn btn-dark jumpstart mx-1"data-bs-toggle = "modal" data-bs-target="#addPaid">
                                Add Paid
                            </button>
                        </div>
                    </section>
                    <div className="modal fade" id="addPayable" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-scrollable modal-dialog-fullscreen-md-down">
                            <div className="modal-content bg-dark jumpstart text-light">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Add Payable Amount</h5>
                                    <button type="button" className="btn btn-outline-light bi bi-x" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className="row gy-2">
                                        <div className="col-12">
                                            <label htmlFor="amount">
                                                Amount
                                            </label>
                                            <input className="form-control bg-input text-light border border-dark" type="number"/>
                                        </div>
                                        <div className="col-12 d-flex justify-content-end">
                                            <button type="button" className="btn btn-dark jumpstart w-100">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="addPaid" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-scrollable modal-dialog-fullscreen-md-down">
                            <div className="modal-content bg-dark jumpstart text-light">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="staticBackdropLabel">Add Paid Amount</h5>
                                    <button type="button" className="btn btn-outline-light bi bi-x" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form className="row gy-2">
                                        <div className="col-12">
                                            <label htmlFor="amount">
                                                Amount
                                            </label>
                                            <input className="form-control bg-input text-light border border-dark" type="number" max={ product.Product_Paid } onChange ={handlePaidAmount}/>
                                        </div>
                                        <div className="col-12 d-flex justify-content-end">
                                            <button type="button" className="btn btn-dark jumpstart w-100">Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}

export default ProductDetails;
