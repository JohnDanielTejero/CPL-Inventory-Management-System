import { useNavigate } from "react-router-dom";

function StoresList(){
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
                            <th>Store Name</th>
                            <th>Store Address</th>
                            <th>Added At</th>
                            <th>Modified At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{height:"5rem", overflow:"hidden"}}>
                            <td style={{width:"5rem"}}>Tite</td>
                            <td style={{width:"6rem"}}>10 pcs</td>
                            <td style={{width:"5rem"}}>100%</td>
                            <td style={{width:"5rem"}}>100%</td>
                            <td style={{width:"5rem"}} className="p-2">
                                <div className="d-flex justify-content-center align-items-center">
                                    <button className="btn btn-outline-light bg-gradient" data-route-target = "edit-store/2" onClick={buttonNavigate}>
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

            <div class="modal fade" id="selectStore" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-fullscreen-md-down">
                    <div class="modal-content bg-dark jumpstart text-light">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Change Store</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
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
                                    <button type="button" class="btn btn-dark jumpstart w-100">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StoresList;
