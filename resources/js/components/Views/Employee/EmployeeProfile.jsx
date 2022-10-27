function Profile(){
    return(
        <section className="card bg-dark bg-opacity-75 text-light">
            <div className="card-body">
                <h1 className="text-center">Employee Profile</h1>
                <form className="row g-2 p-2" autoComplete="off">

                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "first_name"
                            placeholder="..."
                        />
                        <label className = "ms-2" htmlFor="first_name">First Name</label>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "last_name"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="last_name">Last Name</label>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "email"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="email">Email</label>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "password"
                            placeholder="..."
                            type={"password"}
                        />
                        <label className = "ms-2" htmlFor="password">Password</label>
                    </div>

                    <div className="col-12">
                        <button className="w-100 btn btn-dark jumpstart border border-dark">
                            Edit Profile
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Profile;
