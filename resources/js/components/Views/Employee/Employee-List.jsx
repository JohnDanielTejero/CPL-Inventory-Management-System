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
        </>
    );
}

export default EmployeeList;

