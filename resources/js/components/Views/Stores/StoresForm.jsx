function StoresForm(){
    return(
        <div className="card bg-dark bg-opacity-75 text-light h-100">
            <div className="card-body">
                <form className="row g-2 p-2" autoComplete="off">
                    <div className="col-12">
                        <h1 className="text-center">
                            {
                                location.pathname === "/stores/add-store" ?  "Add Store" : "Edit Store"
                            }
                        </h1>
                    </div>

                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "store_name"
                            placeholder="..."
                        />
                        <label className = "ms-2" htmlFor="store_name">Store Name</label>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "store_address"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="store_address">Store Address</label>
                    </div>

                    {
                        location.pathname != "/stores/add-store" && <input type={"hidden"} value="" id = "supplier_id"/>
                    }
                    <div className="col-12">
                        <button className="w-100 btn btn-dark jumpstart border border-dark">
                            {
                                location.pathname === "/stores/add-store" ?  "Add Stores" : "Save Changes"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StoresForm;
