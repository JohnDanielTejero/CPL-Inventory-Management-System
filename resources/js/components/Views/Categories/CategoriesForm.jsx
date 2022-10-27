function CategoryForm(){
    return(
        <div className="card bg-dark bg-opacity-75 text-light h-100">
            <div className="card-body">
                <form className="row g-2 p-2" autoComplete="off">
                    <div className="col-12">
                        <h1 className="text-center">
                            {
                                location.pathname === "/category/add-category" ?  "Add Category" : "Edit Category"
                            }
                        </h1>
                    </div>

                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "category"
                            placeholder="..."
                        />
                        <label className = "ms-2" htmlFor="category">Category Name</label>
                    </div>
                    <div className="col-12 form-floating">
                        <textarea
                            className="form-control bg-input text-light border border-dark"
                            id = "category-description"
                            placeholder="..."
                            style={{height:"20rem"}}
                        />
                        <label className =  "ms-2" htmlFor="category-description">Category Description</label>
                    </div>

                    {
                        location.pathname != "/category/add-category" && <input type={"hidden"} value="" id = "category_id"/>
                    }
                    <div className="col-12">
                        <button className="w-100 btn btn-dark jumpstart border border-dark">
                            {
                                location.pathname === "/category/add-category" ?  "Add Category" : "Edit Category"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CategoryForm;
