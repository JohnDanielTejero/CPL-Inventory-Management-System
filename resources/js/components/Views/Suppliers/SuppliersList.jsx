import { useNavigate } from "react-router-dom";

function SuppliersList(){
    const navigate = useNavigate();
    const buttonNavigate = (e) => {
        navigate(e.target.getAttribute('data-route-target'));
    }
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
                                <th>Supplier ID</th>
                                <th>Supplier Name</th>
                                <th>Contact No</th>
                                <th>Email</th>
                                <th>Added At</th>
                                <th>Modified At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                <td style={{width:"5rem"}}>Tite</td>
                                <td style={{width:"6rem"}}>20 pcs</td>
                                <td style={{width:"6rem"}}>10 pcs</td>
                                <td style={{width:"5rem"}}>$2000000</td>
                                <td style={{width:"5rem"}}>100%</td>
                                <td style={{width:"5rem"}}>100%</td>
                                <td style={{width:"5rem"}} className="p-2">
                                    <div className="d-flex justify-content-center align-items-center">
                                        <button className="btn btn-outline-light bg-gradient" data-route-target = "edit-product/2" onClick={buttonNavigate}>
                                            <i className="bi bi-pen"></i>
                                            <span className = "ms-1">Edit</span>
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
        </>
    );
}

export default SuppliersList;
