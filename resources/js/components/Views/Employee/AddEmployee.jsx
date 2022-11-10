import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import testCrud from "../../Configurations/ApiCalls/test-crud";
import userCrud from "../../Configurations/ApiCalls/user-crud";
import { cannotBeEmpty, removeError, setErrorWithMessage, setSuccess, validateEmail, validateName } from "../../Configurations/constants";

/**
 * Component for adding employees/register
 *
 * ONLY ADMIN SHOULD ACCESS
 *
 * @returns JSX.Element
 */
function RegisterEmployee(){

    const [stores, setStores] = useState([]);
    const [roles, setRoles] = useState([]);
    let navigate = useNavigate();

    useEffect(async () => {
        const dropdown = await Promise.all([userCrud.getRoles(), testCrud.getStores()]);
        setRoles(await dropdown[0]);
        setStores(await dropdown[1]);

    }, []);

    //events
    const handleFirstName = (e) => {
        if(cannotBeEmpty(e.target)){
            if(validateName(e.target.value.trim())){
                setSuccess(e.target);
            }else{
                setErrorWithMessage(e.target, "The first name field is in invalid format.");
            }
        }else{
            setErrorWithMessage(e.target, "The first name field is required.");
        }
    }

    const handleLastName = (e) => {
        if(cannotBeEmpty(e.target)){
            if(validateName(e.target.value.trim())){
                setSuccess(e.target);
            }else{
                setErrorWithMessage(e.target, "The first name field is in invalid format.");
            }
        }else{
            setErrorWithMessage(e.target, 'The last name field is required.');
        }
    }

    const handleEmail = (e) => {
        if(cannotBeEmpty(e.target)){
            if(validateEmail(e.target.value.trim())){
                setSuccess(e.target);
            }else{
                setErrorWithMessage(e.target, 'The email must be a valid email address.');
            }
        }else{
            setErrorWithMessage(e.target, 'The email field is required.');
        }
    }

    const handlePassword = (e) => {
        if(cannotBeEmpty(e.target)){
            setSuccess(e.target);
        }else{
            setErrorWithMessage(e.target, 'The password field is required');
        }
    }

    const handleStore = (e) => {
        if(cannotBeEmpty(e.target)){
            setSuccess(e.target);
        }else{
            setErrorWithMessage(e.target, 'The store field is required');
        }
    }

    const handleRole = (e) => {
        if(cannotBeEmpty(e.target)){
            setSuccess(e.target);
        }else{
            setErrorWithMessage(e.target, 'The role field is required');
        }
    }

    const handleRegister =  async (e) => {
        e.preventDefault();
        let validFirstName = false;
        let validLastName = false;
        let validEmail = false;
        let validPass = false;
        let validRole = false;
        let validStore = false;

        if(cannotBeEmpty(e.target[0])){
            if(validateName(e.target[0].value.trim())){
                setSuccess(e.target[0]);
                validFirstName = true;
            }else{
                setErrorWithMessage(e.target[0], "The first name field is in invalid format.");
            }
        }else{
            setErrorWithMessage(e.target[0], "The first name field is required.");
        }

        if(cannotBeEmpty(e.target[1])){
            if(validateName(e.target[1].value.trim())){
                setSuccess(e.target[1]);
                validLastName = true;
            }else{
                setErrorWithMessage(e.target[1], "The first name field is in invalid format.");
            }
        }else{
            setErrorWithMessage(e.target[1], 'The last name field is required.');
        }

        if(cannotBeEmpty(e.target[2])){
            if(validateEmail(e.target[2].value.trim())){
                setSuccess(e.target[2]);
                validEmail = true;
            }else{
                setErrorWithMessage(e.target[2], 'The email must be a valid email address.');
            }
        }else{
            setErrorWithMessage(e.target[2], 'The email field is required.');
        }

        if(cannotBeEmpty(e.target[3])){
            setSuccess(e.target[3]);
            validPass = true;
        }else{
            setErrorWithMessage(e.target[3], 'The password field is required');
        }

        if(cannotBeEmpty(e.target[4])){
            setSuccess(e.target[4]);
            validStore = true;
        }else{
            setErrorWithMessage(e.target[4], 'The store field is required');
        }

        if(cannotBeEmpty(e.target[5])){
            setSuccess(e.target[5]);
            validRole = true;
        }else{
            setErrorWithMessage(e.target[5], 'The role field is required');
        }

        if(validEmail && validFirstName && validLastName
            && validPass && validRole && validStore){
                const event = await userCrud.insertUser({
                    first_name : e.target[0].value,
                    last_name : e.target[1].value,
                    email : e.target[2].value,
                    password : e.target[3].value,
                    store: Number(e.target[4].value),
                    role : Number(e.target[5].value),
                });

                let response = await event;
                switch (response[0].status) {
                    case "created":
                        navigate('/employee');
                        break;
                    case "failed validation":
                        const errors = response[1];
                        for (const [key, value] of Object.entries(errors)){
                            setErrorWithMessage(document.querySelector("#" + key), value);
                        }
                        validFirstName = false;
                        validLastName = false;
                        validEmail = false;
                        validPass = false;
                        validRole = false;
                        validStore = false;
                        break;
                    case "missing entity":
                        const missingErrors = response[1];
                        for (const [key, value] of Object.entries(missingErrors)){
                            setErrorWithMessage(document.querySelector("#" + key), value);
                        }

                        validFirstName = false;
                        validLastName = false;
                        validEmail = false;
                        validPass = false;
                        validRole = false;
                        validStore = false;
                        break;

                    default:
                        return;
                }
        }
    }

    return (
        <div className="card bg-dark bg-opacity-75 text-light h-100">
            <div className="card-body">
                <form className="row g-2 p-2" autoComplete="off" onSubmit={handleRegister}>
                    <div className="col-12">
                        <h1 className="text-center">
                            Add Employee
                        </h1>
                    </div>

                    <div className="col-12 col-md-6 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "first_name"
                            placeholder="..."
                            onBlur={removeError}
                            onChange = {handleFirstName}
                            />
                        <label className = "ms-2" htmlFor="first_name">First Name</label>
                        <div className="invalid-feedback" id = "first_name-feedback"></div>
                    </div>
                    <div className="col-12 col-md-6 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "last_name"
                            placeholder="..."
                            onBlur={removeError}
                            onChange = {handleLastName}
                            />
                        <label className =  "ms-2" htmlFor="last_name">Last Name</label>
                        <div className="invalid-feedback" id = "last_name-feedback"></div>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "email"
                            placeholder="..."
                            onBlur={removeError}
                        onChange = {handleEmail}
                        />
                        <label className =  "ms-2" htmlFor="email">Email</label>
                        <div className="invalid-feedback" id = "email-feedback"></div>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "password"
                            placeholder="..."
                            type={"password"}
                            onBlur={removeError}
                            onChange = {handlePassword}
                            />
                        <label className = "ms-2" htmlFor="password">Password</label>
                        <div className="invalid-feedback" id = "password-feedback"></div>
                    </div>
                    <div className="col-12 form-floating">
                        <select
                            className="form-select bg-input text-light border border-dark"
                            id = "store"
                            defaultValue={""}
                            onBlur={removeError}
                            onChange = {handleStore}
                            >
                            <option value = "" disabled>Please Select</option>
                            {
                                stores.map((e) => {

                                    return(
                                        <option value = {e.stores_id} key = {e.Store_Address}>{ e.Store_Name }</option>
                                        )

                                    })
                                }

                        </select>
                        <label className =  "ms-2" htmlFor="role">Store</label>
                        <div className="invalid-feedback" id = "store-feedback"></div>
                    </div>
                    <div className="col-12 form-floating">
                        <select
                            className="form-select bg-input text-light border border-dark"
                            id = "role"
                            onBlur={removeError}
                            defaultValue={""}
                            onChange = {handleRole}
                            >
                                <option value = "" disabled>Please Select</option>
                                {
                                    roles.map((e) => {

                                        return(
                                            <option value = {e.roles_id} key = {e.Role_Desc}>{ e.Role_Name }</option>
                                            )

                                    })
                                }

                        </select>
                        <label className =  "ms-2" htmlFor="store">Role</label>
                        <div className="invalid-feedback" id = "role-feedback"></div>
                    </div>

                    <div className="col-12">
                        <button className="w-100 btn btn-dark jumpstart border border-dark">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterEmployee;
