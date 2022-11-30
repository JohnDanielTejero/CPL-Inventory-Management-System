import moment from "moment";
import { useEffect, useState } from "react";
import { Modal, ModalBody } from "react-bootstrap";
import productCrud from "../../Configurations/ApiCalls/product-crud";
import stocksCrud from "../../Configurations/ApiCalls/stocks-crud";
import storeCrud from "../../Configurations/ApiCalls/store-crud";
import { hasAnyRole, removeError, setErrorWithMessage } from "../../Configurations/constants";

/**
 * Component for stocks lists
 *
 * Admin can add stocks or transfer stocks.
 *
 * @param {user, permission}
 * @returns JSX.Element
 */
function Stocks({user, permission}){

    const [products, setProducts] = useState(null);
    const [stores, setStores] = useState(null);
    const [store, setStore] = useState(null);
    const [stocks, setStocks] = useState(null);

    useEffect(async () => {
        if (hasAnyRole(permission, ['ROLE_ADMIN'])){
            const resp = await Promise.all([storeCrud.getStores(""), productCrud.getAllProducts("")]);
            setStores(await resp[0]);
            setProducts(await resp[1]);
        }else{
            setProducts(null);
            setStores(null);
            const currentstore = await storeCrud.getStore(user.store_id);
            setStore(await currentstore);
            const stockresp = await stocksCrud.getStocks(currentstore.stores_id);
            setStocks(await stockresp[1]);
        }

        if(hasAnyRole(permission, ['ROLE_ADMIN'])){
            const attempt = await storeCrud.getStore(document.querySelector('#select-store').value);
            const currentstore = await attempt;
            setStore(currentstore);
            const stockresp = await stocksCrud.getStocks(currentstore.stores_id);
            setStocks(await stockresp[1]);
        }

        return (() => {
            setStore(null);
            setStocks(null);
        })
    }, []);

    useEffect(async () => {
        if(store != null){
            const resp = await stocksCrud.getStocks(store.stores_id);
            setStocks(await resp[1]);
        }else{
            setStocks(null);
        }
        return(() => {
            setStocks(null);
        })
    }, [store]);

    const handleStoreChange = async e => {
        setStore(await (await storeCrud.getStore(e.target.value)));
    }

    //modal stuff
    const [addStockModal, enableStockModal] = useState(false);
    const [transferStockModal, enableTransferStockModal] = useState(false);
    const [targetStock, setTargetStock] = useState(null);
    const [targetProduct, setTargetProduct] = useState(null);

    function addStockModalClose(){
        enableStockModal(false);
    }

    function addStockModalOpen(){
        enableStockModal(true);
    }

    async function transferStockModalOpen(e){
        setTargetStock(e.target.getAttribute('data-stock-target'));
        const resp = await productCrud.getProduct(e.target.getAttribute('data-product-target'));
        setTargetProduct(await resp[1]);
        enableTransferStockModal(true);
    }

    function transferStockModalClose(){
        enableTransferStockModal(false);
    }

    const handleDeleteStock = async e => {
        try{
            let resp = await stocksCrud.deleteStocks(
                {'store' : store.stores_id},
                e.target.getAttribute('data-stocks-delete')
            )
            setStocks(resp[1]);
        }catch(e){
            console.log(e);
        }
    }

    const addStockSubmit = async e => {
        e.preventDefault();
        if (e.target[0].value == ""){
            setErrorWithMessage(e.target[0], 'select a product first');
            return;
        }

        try{
            const attempt = await stocksCrud.addStocks({
                'product' : e.target[0].value,
                'amount' : e.target[1].value,
                'store' : e.target[2].value,
            });

            const resp = await attempt;
            if (resp[0].status == 'success'){
                setStocks(resp[1]);
                setTargetProduct(null);
                enableStockModal(false);
            }else{
                setErrorWithMessage(e.target[1], resp[1].amount);
            }
        }catch(error){
            setErrorWithMessage(e.target[0], "this product is already in the store's stock, please select another product.");
        }

    }

    const transferStockSubmit = async e => {
        e.preventDefault();
        try{
            const attempt = await stocksCrud.transferStocks({
                'store' : e.target[2].value,
                'amount' : e.target[0].value,
            }, e.target[1].value);

            const resp = await attempt;
            if (resp[0].status == 'success'){
                setStocks(resp[1]);
                setTargetProduct(null);
                enableTransferStockModal(false);
            }else{
                console.log(resp[1]);
                setErrorWithMessage(e.target[0], resp[1].amount);
            }
        }catch(error){
            console.log(e);
        }

    }

    const limitAmount = e => {
        if (targetProduct != null){
            if (e.target.value > targetProduct.Product_Paid){
                e.target.value = targetProduct.Product_Paid;
            }
        }
    }

    const handleProductChange = async e => {
        const resp = await productCrud.getProduct(e.target.value);
        setTargetProduct(await resp[1]);
    }

    return(
        <div style = {{height:"40rem", overflowY:"auto"}}>
            <div className="card bg-dark text-light">
                {
                    hasAnyRole(permission, ['ROLE_ADMIN']) &&
                        <div className="card-header bg-transparent">
                            <section className="table-responsive w-100">
                                <table className="table table-dark jumpstart-table table-bordered table-hover">
                                    <tbody>
                                        <tr style={{height:"5rem", overflow:"hidden"}}>
                                            <td>Store Name: </td>
                                            <td style={{width:"90%"}}>
                                                <select className="form-select bg-input border-dark text-light" onChange={handleStoreChange} id= "select-store">
                                                    {
                                                        stores != null &&
                                                        stores.map(e => {
                                                            return (
                                                                <option value={e.stores_id} key = {e.stores_id}>{ e.Store_Name }</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </section>
                        </div>
                }
                <div className="card-body">
                    <h1 className="text-center">
                        Current Stocks
                    </h1>
                    {
                        hasAnyRole(permission, ['ROLE_ADMIN']) &&
                            <section className="mb-3">
                                <button className="btn btn-dark jumpstart" onClick={addStockModalOpen}>Add new stock</button>
                            </section>
                    }
                    <section className="table-responsive w-100" style={{height:'30rem', overflowY:'auto'}}>
                    <table className="table table-dark jumpstart-table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity in Stock</th>
                                <th>Stock Status</th>
                                <th>Category</th>
                                <th>Expiration</th>
                                <th>Markup</th>
                                {
                                    hasAnyRole(permission, ['ROLE_ADMIN']) &&
                                        <th>Action</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stocks != null &&
                                    stocks.map(e => {
                                        return(
                                            <tr style={{height:"5rem", overflow:"hidden"}} key = {e.stock_id}>
                                                <td style={{width:"20rem"}}>{ (e.product).Product_Name }</td>
                                                <td style={{width:"6rem"}}>{ e.Stock_Quantity }</td>
                                                <td style={{width:"5rem"}}>{ e.Stock_Status }</td>
                                                <td style={{width:"5rem"}}>{ e.Category_Name }</td>
                                                <td style={{width:"5rem"}}>{ e.product.Product_Expiry != null ? moment(e.product.Product_Expiry).format("MMM Do YY") : 'no expiration' } </td>
                                                <td style={{width:"5rem"}}>{ e.product.Product_Markup }</td>
                                                        {
                                                            hasAnyRole(permission, ['ROLE_ADMIN']) &&
                                                            <td style={{width:"5rem"}} className="p-2">
                                                                <div className="d-flex justify-content-center align-items-center">
                                                                    <button className="btn btn-outline-light bg-gradient ms-2" onClick={transferStockModalOpen} data-stock-target = {e.stock_id} data-product-target = {e.product.product_id}>
                                                                        <i className="bi bi-person-workspace" style ={{pointerEvents:"none"}}></i>
                                                                        <span className = "ms-1" style ={{pointerEvents:"none"}}>Transfer</span>
                                                                    </button>
                                                                    <button className="btn btn-dark jumpstart ms-2" data-stocks-delete={e.stock_id} onClick={handleDeleteStock}>
                                                                        <i className="bi bi-trash" style ={{pointerEvents:"none"}}></i>
                                                                        <span className = "ms-1" style ={{pointerEvents:"none"}}>Delete</span>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        }
                                            </tr>
                                        )
                                    })

                            }
                        </tbody>
                    </table>
                </section>
                </div>
            </div>

            <Modal show = {addStockModal} onHide = {addStockModalClose} backdrop="static" keyboard ={false}>
                <Modal.Header className="bg-dark jumpstart text-light">
                    <Modal.Title>Add Stocks</Modal.Title>
                    <button type="button" className = "btn btn-outline-light bi bi-x" data-bs-dismiss="modal" aria-label="Close" onClick={addStockModalClose}></button>
                </Modal.Header>
                <ModalBody className="bg-dark jumpstart text-light">
                    <div className="d-flex mb-3">
                        <span className="fw-bold">Current in inventory: </span>
                        <span className="ms-1">{ targetProduct != null ? targetProduct.Product_Paid : "" }</span>
                    </div>
                    <form className="row g-2" onSubmit={addStockSubmit}>
                        <div className="col-12 form-floating">
                            <select className = "form-select bg-input text-light border border-dark" id = "product" defaultValue={""} onChange={handleProductChange} onBlur={removeError}>
                                <option disabled value = "">Please select</option>
                                {
                                    products != null &&
                                    products.map(e => {
                                        return(
                                            <option value={e.product_id} key = {e.product_id}>{e.Product_Name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label htmlFor = "product">Select Product</label>
                            <div className="invalid-feedback" id = "product-feedback"></div>
                        </div>
                        <div className="col-12 form-floating">
                            <input className = "form-control bg-input text-light border border-dark" id = "amount" placeholder="..." type={'number'} onChange={limitAmount} onBlur={removeError}/>
                            <label htmlFor = "amount">Specify amount</label>
                            <div className="invalid-feedback" id="amount-feedback"></div>
                        </div>
                            <input className id = "store" placeholder="..." type={'hidden'} value = {store != null ? store.stores_id : ""}/>
                        <div className="col-12">
                            <button className="w-100 btn btn-dark jumpstart">
                                Submit
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>

            <Modal show = {transferStockModal} onHide = {transferStockModalClose} backdrop="static" keyboard ={false}>
                <Modal.Header className="bg-dark jumpstart text-light">
                    <Modal.Title>Select Amount</Modal.Title>
                    <button type="button" className = "btn btn-outline-light bi bi-x" data-bs-dismiss="modal" aria-label="Close" onClick={transferStockModalClose}></button>
                </Modal.Header>
                <ModalBody className="bg-dark jumpstart text-light">
                    <div className="d-flex mb-3">
                        <span className="fw-bold">Current in inventory: </span>
                        <span className="ms-1">{ targetProduct != null ? targetProduct.Product_Paid : "" }</span>
                    </div>
                    <form className="row g-2" onSubmit={transferStockSubmit}>
                        <div className="col-12 form-floating">
                            <input className = "form-control bg-input text-light border border-dark" id = "amount" placeholder="..." type={'number'} onChange={limitAmount}/>
                            <label htmlFor = "amount">Specify amount</label>
                            <div className="invalid-feedback" id = "amount-feedback"></div>
                        </div>
                        <input type={"hidden"} id = "stock" value = {targetStock}/>
                        <input type={"hidden"} id = "store" value = {store != null ? store.stores_id : ""}/>
                        <div className="col-12">
                            <button className="w-100 btn btn-dark jumpstart">
                                Submit
                            </button>
                        </div>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default Stocks;
