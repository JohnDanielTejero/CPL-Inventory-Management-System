import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userCrud from "../../Configurations/ApiCalls/user-crud";
import { cannotBeEmpty, removeError, setErrorWithMessage, setSuccess, validateName } from "../../Configurations/constants";

/**
 * Component for profile page
 *
 * @param {updateUser} param0 access hook of current user
 * @returns JSX.Element
 */
function Profile({updateUser}){
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    useEffect(async () => {
        setCurrentUser(await userCrud.getActiveUser());

        return(() => {
            setCurrentUser({});
        });

    }, []);

    const handleFirstName = (e) => {
        if (cannotBeEmpty(e.target)){
            if(validateName(e.target.value.trim())){
                setSuccess(e.target);
            }else{
                setErrorWithMessage(e.target, 'The first name field is in invalid format.');
            }
        }else{
            setErrorWithMessage(e.target, 'The first name field is required.');
        }
    }
    const handleLastName = (e) => {
        if (cannotBeEmpty(e.target)){
            if(validateName(e.target.value.trim())){
                setSuccess(e.target);
            }else{
                setErrorWithMessage(e.target, 'The last name field is in invalid format.');
            }
        }else{
            setErrorWithMessage(e.target, 'The last name field is required.');
        }
    }
    const handlePassword = (e) => {
        if (cannotBeEmpty(e.target)){
            setSuccess(e.target);
        }else{
            setErrorWithMessage(e.target, 'The password field is required.');
        }
    }

    const handleEditProfile = async (e) => {
        e.preventDefault();
        let firstNameValid = false;
        let lastNameValid = false;
        let passValid = false;

        if (cannotBeEmpty(e.target[0])){
            if(validateName(e.target[0].value.trim())){
                setSuccess(e.target[0]);
                firstNameValid = true;
            }else{
                setErrorWithMessage(e.target[0], 'The first name field is in invalid format.');
            }
        }else{
            setErrorWithMessage(e.target[0], 'The first name field is required.');
        }

        if (cannotBeEmpty(e.target[1])){
            if(validateName(e.target[1].value.trim())){
                setSuccess(e.target[1]);
                lastNameValid = true;
            }else{
                setErrorWithMessage(e.target[1], 'The last name field is in invalid format.');
            }
        }else{
            setErrorWithMessage(e.target[1], 'The last name field is required.');
        }

        if (cannotBeEmpty(e.target[2])){
            setSuccess(e.target[2]);
            passValid = true;
        }else{
            setErrorWithMessage(e.target[2], 'The password field is required.');
        }

        if (firstNameValid && lastNameValid && passValid){
            const attempt = await userCrud.editUser(
                {
                    'first_name' : e.target[0].value.trim(),
                    'last_name' : e.target[1].value.trim(),
                    'password' : e.target[2].value.trim(),
                }
            );

            const response = await attempt;

            switch (response[0].status) {
                case "failed validation":
                    for(const [key, value] of Object.entries(response[1])){
                        setErrorWithMessage(document.querySelector("#" + key), value);
                        firstNameValid = false;
                        lastNameValid = false;
                        passValid = false;
                    }

                    break;
                case "not found":
                    console.log(response[1]);
                    setErrorWithMessage(document.querySelector("#first_name"), "User does not exist");
                    setErrorWithMessage(document.querySelector("#last_name"), "User does not exist");
                    setErrorWithMessage(document.querySelector("#password"), "User does not exist");
                    firstNameValid = false;
                    lastNameValid = false;
                    passValid = false;
                    break;

                case "updated":
                    updateUser(response[1]);
                    navigate("/");
                    break;

                default:
                    return;
            }
        }
    }

    return(
        <section className="card bg-dark bg-opacity-75 text-light">
            <div className="card-body">
                <h1 className="text-center">Employee Profile</h1>
                <form className="row g-2 p-2" autoComplete="off" onSubmit={handleEditProfile}>
                    <div className="alert alert-dark bg-dark jumpstart text-light">
                        <h1 className="fw-bolder">NOTICE!</h1>
                        <p>To make changes, enter your current password or change the password.</p>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "first_name"
                            placeholder="..."
                            defaultValue={ currentUser.first_name }
                            onBlur={removeError}
                            onChange = {handleFirstName}
                        />
                        <label className = "ms-2" htmlFor="first_name">First Name</label>
                        <div className="invalid-feedback" id = "first_name-feedback"></div>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "last_name"
                            placeholder="..."
                            defaultValue={ currentUser.last_name }
                            onBlur={removeError}
                            onChange = {handleLastName}
                        />
                        <label className =  "ms-2" htmlFor="last_name">Last Name</label>
                        <div className="invalid-feedback" id = "last_name-feedback"></div>
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
