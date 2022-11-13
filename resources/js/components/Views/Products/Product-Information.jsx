import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productCrud from "../../Configurations/ApiCalls/product-crud";
import { removeError, setErrorWithMessage } from "../../Configurations/constants";

/**
 * for showing product details
 * where you can add payables and paid amount
 *
 * @returns JSX.Element
 */
function ProductDetails(){
    const [product, setProduct] = useState(null);
    let { id } = useParams();

    useEffect(async () => {
        const resp = await productCrud.getProduct(id);
        setProduct(await resp[1]);
    },[id]);

    const handlePaidAmount = e => {
        if (e.target.value > product.Product_Payable){
            e.target.value = product.Product_Payable;
        }
    }
    const handlePayableSubmit = async e => {
        e.preventDefault();
        const attempt = await productCrud.addPayable({
            add_payable : e.target[0].value,
        }, id);

    const resp = await attempt;
    switch(resp[0].status){
        case "invalid request":
            for(const [key, value] of Object.entries(resp[1])){
                setErrorWithMessage(document.querySelector('#' + key), value);
            }
            break;
        case "success":
            setProduct(resp[1]);
            e.target[0].value = 0;
            break;
            default:
                return;
            }
        }

    const handlePaidSubmit = async e => {
        e.preventDefault();
        console.log(e.target[0].value);
        const attempt = await productCrud.addPaid({
            add_paid : e.target[0].value,
        }, id);

        const resp = await attempt;
        console.log(resp);
        switch(resp[0].status){
            case "invalid request":
                for(const [key, value] of Object.entries(resp[1])){
                    setErrorWithMessage(document.querySelector('#' + key), value);
                }
                break;
            case 'success':
                setProduct(resp[1]);
                e.target[0].value = 0;
                break;
            default:
                return;
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
                                                <td>Product Name</td>
                                                <td style={{width:"10rem"}}>{ product.Product_Name }</td>
                                            </tr>
                                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                                <td>Supplier: </td>
                                                <td style={{width:"10rem"}}>{ product.supplier.Supp_Name }</td>
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
                                    <form className="row gy-2" onSubmit={handlePayableSubmit}>
                                        <div className="col-12">
                                            <label htmlFor="amount">
                                                Amount
                                            </label>
                                            <input className="form-control bg-input text-light border border-dark" type="number" id = "add_payable" onBlur={removeError}/>
                                            <div className="invalid-feedback" id = "add_payable-feedback"></div>
                                        </div>
                                        <div className="col-12 d-flex justify-content-end">
                                            <button className="btn btn-dark jumpstart w-100">Submit</button>
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
                                    <form className="row gy-2" onSubmit={handlePaidSubmit}>
                                        <div className="col-12">
                                            <label htmlFor="amount">
                                                Amount
                                            </label>
                                            <input className="form-control bg-input text-light border border-dark" id = "add_paid" type="number" max={ product.Product_Payable } onChange ={handlePaidAmount} onBlur={removeError}/>
                                            <div className="invalid-feedback" id = "add_paid-feedback"></div>
                                        </div>
                                        <div className="col-12 d-flex justify-content-end">
                                            <button className="btn btn-dark jumpstart w-100">Submit</button>
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
