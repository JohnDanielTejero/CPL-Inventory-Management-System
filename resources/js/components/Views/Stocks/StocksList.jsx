function Stocks(){
    return(
        <div style = {{height:"40rem", overflowY:"auto"}}>
            <div className="card bg-dark text-light">
                <div className="card-header bg-transparent">
                    <section className="table-responsive w-100">
                        <table className="table table-dark jumpstart-table table-bordered table-hover">
                            <tbody>
                                <tr style={{height:"5rem", overflow:"hidden"}}>
                                    <td>Store Name: </td>
                                    <td style={{width:"90%"}}>
                                        <select className="form-select bg-input border-dark text-light">
                                            <option>Store</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
                <div className="card-body">
                    <h1 className="text-center">
                        Current Stocks
                    </h1>
                    <section className="table-responsive w-100" style={{height:'30rem', overflowY:'auto'}}>
                    <table className="table table-dark jumpstart-table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity in Stock</th>
                                <th>Stock Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                <td style={{width:"20rem"}}>aaaa</td>
                                <td style={{width:"6rem"}}>10 pcs</td>
                                <td style={{width:"5rem"}}>Available</td>
                                <td style={{width:"5rem"}} className="p-2">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button className="btn btn-outline-light bg-gradient ms-2" data-bs-toggle = "modal" data-bs-target = "#selectStore">
                                            <i className="bi bi-person-workspace"></i>
                                            <span className = "ms-1">Transfer</span>
                                        </button>
                                        <button className="btn btn-dark jumpstart ms-2">
                                            <i className="bi bi-trash"></i>
                                            <span className = "ms-1">Delete</span>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                </div>
            </div>
            <div class="modal fade" id="selectStore" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-fullscreen-md-down">
                    <div class="modal-content bg-dark jumpstart text-light">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Select Amount</h5>
                            <button type="button" class="btn btn-outline-light bi bi-x" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form className="row gy-2">
                                <div className="col-12">
                                    <label htmlFor="amount">
                                        Amount
                                    </label>
                                    <select
                                        className="form-select bg-input text-light border border-dark"
                                        id = "amount"
                                    >
                                        <option>Hello</option>
                                    </select>
                                </div>
                                <input type={"hidden"} id = "employee-select"/>
                                <div className="col-12 d-flex justify-content-end">
                                    <button type="button" class="btn btn-dark jumpstart w-100">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Stocks;
