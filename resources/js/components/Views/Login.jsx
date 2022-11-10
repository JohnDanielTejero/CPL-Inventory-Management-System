import { cannotBeEmpty, removeError, validateEmail } from "../Configurations/constants";

/**
 * Login component to log to the page
 * @param {*} param0 the first method is reference to login function from app
 * @returns JSX.Element
 */
function Login({method}){

    const handleEmailChange = (e) => {

        if(cannotBeEmpty(e.target)){
            if(validateEmail(e.target.value.trim())){
                e.target.classList.add('is-valid');
                e.target.classList.remove('is-invalid');
            }else{
                e.target.classList.remove('is-valid');
                e.target.classList.add('is-invalid');
                document.querySelector("#" + e.target.getAttribute("id") + "-feedback").innerHTML = "Email format is incorrect!";

            }
        }else{
            e.target.classList.add('is-invalid');
            e.target.classList.remove('is-valid');
            document.querySelector("#" + e.target.getAttribute("id") + "-feedback").innerHTML = "Email is required!";
        }
    }

    const handlePassChange = (e) => {
        if(cannotBeEmpty(e.target)){
            e.target.classList.add('is-valid');
            e.target.classList.remove('is-invalid');
        }else{
            e.target.classList.add('is-invalid');
            e.target.classList.remove('is-valid');
            document.querySelector("#" + e.target.getAttribute("id") + "-feedback").innerHTML = "Password is required!";
        }
    }

    return(
        <div className="row">
            <div className="col-0 col-md-3"></div>
            <div className="col-12 col-md-6">
                <div className="card bg-dark text-light">
                    <div className="card-body">
                        <form className="bg-dark row gy-2 text-light" autoComplete="off" onSubmit={method}>
                            <h1 className="text-center">Sign In</h1>
                            <div className="col-12 form-floating">
                                <input className="form-control border-dark text-light bg-input" id = "email" type={"email"} placeholder="..." onBlur = {removeError} onChange = {handleEmailChange}/>
                                <label htmlFor="email" className="ms-2">
                                    Email Address
                                </label>
                                <div className = "invalid-feedback" id = "email-feedback">

                                </div>
                            </div>
                            <div className="col-12 form-floating">
                                <input className="form-control border-dark text-light bg-input" onChange={handlePassChange} id = "password" type={"password"} placeholder="..." onBlur = {removeError}/>
                                <label htmlFor="password" className="ms-2">
                                    Password
                                </label>
                                <div className = "invalid-feedback" id = "password-feedback">

                                </div>
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
