function SalesForm(){
    return(
        <div className="card bg-dark bg-opacity-75 text-light h-100">
            <div className="card-body">
                <form className="row g-2 p-2" autoComplete="off">
                    <div className="col-12">
                        <h1 className="text-center">
                            Add New Transaction
                        </h1>
                    </div>

                    <div className="col-12">
                        {/*user information here*/}
                        <div className="row g-2">
                            <div className="col-12 form-floating">
                                <input
                                    className="form-control bg-input text-light border border-dark"
                                    id = "customer_name"
                                    placeholder="..."
                                />
                                <label className = "ms-2" htmlFor="customer_name">Customer Name</label>
                            </div>
                            <div className="col-12">
                                <div className="card bg-dark text-light" style={{height:"20rem", overflowX:"hidden", overflowY:"auto"}}>
                                    <div className="card-body">
                                        <section className="table-responsive w-100">
                                            <table className="table table-dark jumpstart-table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Quantity</th>
                                                        <th>Price</th>
                                                        <th className="text-center">
                                                            <button className="btn btn-outline-light">
                                                                <i className="bi bi-plus"></i>
                                                            </button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{height:"5rem", overflow:"hidden"}}>
                                                        <td className = "h-100" style={{width:"20rem"}}>
                                                            <select className="form-control bg-input text-light border border-dark">
                                                                <option>Hello</option>
                                                            </select>
                                                        </td>
                                                        <td style={{width:"10rem"}}>
                                                            <input className="form-control bg-input text-light border border-dark" type={"number"}/>
                                                        </td>
                                                        <td style={{width:"6rem"}}>20 pcs</td>
                                                        <td style={{width:"5rem"}} className="text-center">
                                                            <button className="btn btn-outline-light">
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <table className="table table-dark jumpstart-table table-bordered table-hover">
                                    <tbody>
                                        <tr style={{height:"5rem", overflow:"hidden"}}>
                                            <td className = "h-100" style={{width:"20rem"}}>
                                                Total Amount:
                                            </td>
                                            <td>
                                                <input className="form-control bg-input text-light border border-dark" type={"number"} disabled/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="w-100 btn btn-dark jumpstart border border-dark">
                            Add New Sales
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}


export default SalesForm;
