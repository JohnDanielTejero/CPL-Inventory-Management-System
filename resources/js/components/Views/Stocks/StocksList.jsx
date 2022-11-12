import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalDialog } from "react-bootstrap";
import productCrud from "../../Configurations/ApiCalls/product-crud";
import stocksCrud from "../../Configurations/ApiCalls/stocks-crud";
import storeCrud from "../../Configurations/ApiCalls/store-crud";
import { hasAnyRole } from "../../Configurations/constants";

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
            setStore(await (await storeCrud.getStore(user.store_id)));
        }

        if(hasAnyRole(permission, ['ROLE_ADMIN'])){
            setStore(await (await storeCrud.getStore(document.querySelector('#select-store').value)));
        }

    }, []);

    useEffect(async () => {
        if(store != null){
            const resp = await stocksCrud.getStocks(store.stores_id);
            setStocks(await resp[1]);
        }else{
            setStocks(null);
        }
    }, [store]);

    const handleStoreChange = async e => {
        setStore(await (await storeCrud.getStore(e.target.value)));
    }

    //modal stuff
    const [addStockModal, enableStockModal] = useState(false);
    const [transferStockModal, enableTransferStockModal] = useState(false);
    const [targetProduct, setTargetProduct] = useState(null);

    function addStockModalClose(){
        enableStockModal(false);
    }

    function addStockModalOpen(){
        enableStockModal(true);
    }

    function transferStockModalOpen(e){
        setTargetProduct(e.target.getAttribute('data-product-target'));
        enableTransferStockModal(true);
    }

    function transferStockModalClose(){
        enableTransferStockModal(false);
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
                                {
                                    hasAnyRole(permission, ['ROLE_ADMIN']) &&
                                        <th>Action</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                <td style={{width:"20rem"}}>aaaa</td>
                                <td style={{width:"6rem"}}>10 pcs</td>
                                <td style={{width:"5rem"}}>Available</td>
                                        {
                                            hasAnyRole(permission, ['ROLE_ADMIN']) &&
                                            <td style={{width:"5rem"}} className="p-2">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button className="btn btn-outline-light bg-gradient ms-2" onClick={transferStockModalOpen} data-product-target = "1">
                                                        <i className="bi bi-person-workspace" style ={{pointerEvents:"none"}}></i>
                                                        <span className = "ms-1" style ={{pointerEvents:"none"}}>Transfer</span>
                                                    </button>
                                                    <button className="btn btn-dark jumpstart ms-2"style ={{pointerEvents:"none"}}>
                                                        <i className="bi bi-trash" style ={{pointerEvents:"none"}}></i>
                                                        <span className = "ms-1">Delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        }
                            </tr>
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
                    <form className="row g-2">
                        <div className="col-12 form-floating">
                            <select className = "form-select bg-input text-light border border-dark" id = "product" defaultValue={""}>
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
                        </div>
                        <div className="col-12 form-floating">
                            <input className = "form-control bg-input text-light border border-dark" id = "amount" placeholder="..." type={'number'}/>
                            <label htmlFor = "amount">Specify amount</label>
                        </div>
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
                    <form className="row g-2">
                        <div className="col-12 form-floating">
                            <input className = "form-control bg-input text-light border border-dark" id = "amount" placeholder="..." type={'number'}/>
                            <label htmlFor = "amount">Specify amount</label>
                        </div>
                        <input type={"hidden"} id = "product-select" value = {targetProduct}/>
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
