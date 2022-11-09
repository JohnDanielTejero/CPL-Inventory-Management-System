function EmployeeList(){
    return(
        <>
            <section className="d-flex justify-content-end mb-2">
                <div className="form-floating">
                    <input
                        className="form-control bg-input text-light border border-dark"
                        id = "search"
                        placeholder="..."
                        autoComplete="off"
                    />
                    <label htmlFor="search" className="text-light">Search</label>
                </div>
            </section>
            <section className="table-responsive w-100">
                <table className="table table-dark jumpstart-table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Email</th>
                            <th>Affiliated Store</th>
                            <th>Joined At</th>
                            <th>Modified At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{height:"5rem", overflow:"hidden"}}>
                            <td style={{width:"5rem"}}>Tite</td>
                            <td style={{width:"6rem"}}>10 pcs</td>
                            <td style={{width:"5rem"}}>$2000000</td>
                            <td style={{width:"5rem"}}>100%</td>
                            <td style={{width:"5rem"}}>100%</td>
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
            <div className="modal fade" id="selectStore" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-fullscreen-md-down">
                    <div className="modal-content bg-dark jumpstart text-light">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Change Store</h5>
                            <button type="button" className="btn btn-outline-light bi bi-x" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="row gy-2">
                                <div className="col-12">
                                    <label htmlFor="store">
                                        Store
                                    </label>
                                    <select
                                        className="form-select bg-input text-light border border-dark"
                                        id = "store"
                                    >
                                        <option>Hello</option>
                                    </select>
                                </div>
                                <input type={"hidden"} id = "employee-select"/>
                                <div className="col-12 d-flex justify-content-end">
                                    <button type="button" className="btn btn-dark jumpstart w-100">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EmployeeList;

