import { useEffect, useState } from "react";
import "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
import $ from 'jquery/dist/jquery';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import supplierCrud from "../../Configurations/ApiCalls/supplier-crud";
import { cannotBeEmpty, removeError, setErrorWithMessage, setSuccess, validateEmail, validateName, validateNumber } from "../../Configurations/constants";

/**
 * Supplier form for adding and editing supplier information
 *
 * @returns JSX.Element
 */
function SupplierForm(){

    const [selectedFlag, setSelectedFlag] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    let { id } = useParams();

    const [supplier, setSupplier] = useState(null);

    useEffect(async () => {
        if (location.pathname != "/suppliers/add-supplier"){
            const supp = await supplierCrud.getSupplier(id);
            setSupplier(await supp);
        }else{
            setSupplier(null);
        }

        return (() => {
            setSupplier(null);
            setSelectedFlag('');
        });

    }, [location]);

    useEffect(() => {

        const phoneInputField = document.querySelector("#Supp_ContactNo");
        const phoneInput = window.intlTelInput(phoneInputField, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });

        $('.iti__flag-container').on('click', function() {
            setSelectedFlag($('.iti__selected-flag').attr('title').replace(/[^0-9]/g, ''));
        });

        return() => {
            $('.iti__flag-container').off('click');
        }

    },[]);

    useEffect(() => {
        document.querySelector("#Supp_ContactNo").value = "";
        document.querySelector("#Supp_ContactNo").value = "+" + selectedFlag + " "  + document.querySelector("#Supp_ContactNo").value;

        return (() => {
            setSupplier(null);
            setSelectedFlag('');
        });

    },[selectedFlag]);

    //events
    const handleName = e => {
        if(cannotBeEmpty(e.target)){
            if(validateName(e.target.value.trim())){
                setSuccess(e.target);
            }else{
                setErrorWithMessage(e.target, "The supplier name field is in invalid format.");
            }
        }else{
            setErrorWithMessage(e.target, 'The last supplier field is required.');
        }
    }

    const handleEmail = e => {
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

    const handleContactNo = e => {
        if(cannotBeEmpty(e.target)){
            if(validateNumber(e.target.value.trim())){
                setSuccess(e.target);
            }else{
                setErrorWithMessage(e.target, "The contact number field is in invalid format.");
            }
        }else{
            setErrorWithMessage(e.target, 'The contact number field is required.');
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();

        let nameValid = false;
        let emailValid = false;
        let numberValid = false;

        if(cannotBeEmpty(e.target[0])){
            if(validateName(e.target[0].value.trim())){
                setSuccess(e.target);
                nameValid = true;
            }else{
                setErrorWithMessage(e.target[0], "The supplier name field is in invalid format.");
            }
        }else{
            setErrorWithMessage(e.target[0], 'The last supplier field is required.');
        }

        if(cannotBeEmpty(e.target[1])){
            if(validateEmail(e.target[1].value.trim())){
                setSuccess(e.target[1]);
                emailValid = true;
            }else{
                setErrorWithMessage(e.target[1], 'The email must be a valid email address.');
            }
        }else{
            setErrorWithMessage(e.target[1], 'The email field is required.');
        }

        if(cannotBeEmpty(e.target[2])){
            if(validateNumber(e.target[2].value.trim())){
                setSuccess(e.target[2]);
                numberValid = true;
            }else{
                setErrorWithMessage(e.target[2], "The contact number field is in invalid format.");
            }
        }else{
            setErrorWithMessage(e.target[2], 'The contact number field is required.');
        }

        if(nameValid && emailValid && numberValid){
            if (typeof id == "undefined"){
                const attempt = await supplierCrud.addSupplier({
                    Supp_Name : e.target[0].value,
                    Supp_Email : e.target[1].value,
                    Supp_ContactNo : e.target[2].value,
                });

                const response = await attempt;
                console.log(response[1]);
                switch (response[0].status) {
                    case "bad request":
                        for (const [key, value] of Object.entries(response[1])){
                            setErrorWithMessage(document.querySelector("#" + key), value);
                        }

                        nameValid = false;
                        emailValid = false;
                        numberValid = false;

                        break;
                    case "resource created successfully":
                        console.log(response[0]);
                        navigate('/suppliers')
                        break;

                    default:
                        return;
                }

            }else{
                const attempt = await supplierCrud.updateSupplier({
                    Supp_Name : e.target[0].value,
                    Supp_Email : e.target[1].value,
                    Supp_ContactNo : e.target[2].value,
                }, id);

                const response = await attempt;
                console.log(response[1]);
                switch (response[0].status) {
                    case "bad request":
                        for (const [key, value] of Object.entries(response[1])){
                            setErrorWithMessage(document.querySelector("#" + key), value);
                        }
                        nameValid = false;
                        emailValid = false;
                        numberValid = false;
                        break;

                    case "resource not found":
                        console.log(response[0].status);
                        navigate('/suppliers');
                        nameValid = false;
                        emailValid = false;
                        numberValid = false;
                        break;

                    case "updated":
                        console.log(response[0]);
                        navigate('/suppliers')
                        break;

                    default:
                        return;
                }
            }
        }

    }

    return(
        <div className="card bg-dark bg-opacity-75 text-light h-100">
            <div className="card-body">
                <form className="row g-2 p-2" autoComplete="off" onSubmit={handleSubmit}>
                    {
                        supplier != null &&
                            <div className="alert alert-dark bg-dark jumpstart text-light">
                                <h1 className="fw-bolder">NOTICE!</h1>
                                <p>For safety purposes, you are prompted to update the contact number however not required.
                                    your previous contact number is:
                                </p>
                                <strong>{ supplier.Supp_ContactNo }</strong>
                            </div>
                    }
                    <div className="col-12">
                        <h1 className="text-center">
                            {
                                location.pathname === "/suppliers/add-supplier" ?  "Add Supplier" : "Edit Supplier"
                            }
                        </h1>
                    </div>

                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "Supp_Name"
                            placeholder="..."
                            defaultValue = { supplier != null ? supplier.Supp_Name: "" }
                            onBlur = {removeError}
                            onChange = {handleName}
                            />
                        <label className = "ms-2" htmlFor="Supp_Name">Supplier Name</label>
                        <div className = "invalid-feedback" id = "Supp_Name-feedback">
                        </div>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "Supp_Email"
                            placeholder="..."
                            defaultValue={ supplier != null ? supplier.Supp_Email: "" }
                            onBlur = {removeError}
                            onChange = {handleEmail}
                            />
                        <label className =  "ms-2" htmlFor="Supp_Email">Email</label>
                        <div className = "invalid-feedback" id = "Supp_Email-feedback">
                        </div>
                    </div>

                    <div className = "col-12 position-relative text-light">
                        <label htmlFor = "Supp_ContactNo" className = "d-block fw-bold">
                            Contact Number
                        </label>
                        <input
                            className ="form-control bg-input text-light border border-dark"
                            type="tel"
                            id = "Supp_ContactNo"
                            name = "contactNumber"
                            defaultValue={ supplier != null ? supplier.Supp_ContactNo: "" }
                            onBlur = {removeError}
                            onChange = {handleContactNo}
                            />
                        <div className = "invalid-feedback" id = "Supp_ContactNo-feedback">
                        </div>
                    </div>

                    <div className="col-12">
                        <button className="w-100 btn btn-dark jumpstart border border-dark">
                            {
                                location.pathname === "/suppliers/add-supplier" ?  "Add Supplier" : "Save Changes"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default SupplierForm;
