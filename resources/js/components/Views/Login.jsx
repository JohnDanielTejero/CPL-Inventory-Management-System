function Login(){
    return(
        <div className="row">
            <div className="col-0 col-md-3"></div>
            <div className="col-12 col-md-6">
                <div className="card bg-dark text-light">
                    <div className="card-body">
                        <form className="bg-dark row gy-2 text-light" autoComplete="off">
                            <h1 className="text-center">Sign In</h1>
                            <div className="col-12 form-floating">
                                <input className="form-control border-dark bg-input" id = "email" type={"email"} placeholder="..."/>
                                <label htmlFor="email" className="ms-2">
                                    Email Address
                                </label>
                            </div>
                            <div className="col-12 form-floating">
                                <input className="form-control border-dark bg-input" id = "password" type={"password"} placeholder="..."/>
                                <label htmlFor="password" className="ms-2">
                                    Password
                                </label>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-dark jumpstart w-100">
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-0 col-md-3"></div>
        </div>

    );
}
export default Login;
