import { useEffect, useState } from "react";
import "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js";
import $ from 'jquery/dist/jquery';
import { useLocation } from "react-router-dom";

function SupplierForm(){
    const [selectedFlag, setSelectedFlag] = useState("");
    const location = useLocation();

    useEffect(()=>{

        const phoneInputField = document.querySelector("#phone");
        const phoneInput = window.intlTelInput(phoneInputField, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });

        $('.iti__flag-container').on('click', function() {
            setSelectedFlag($('.iti__selected-flag').attr('title').replace(/[^0-9]/g, ''));
        });

        return()=>{
            $('.iti__flag-container').off('click');
        }
    },[]);

    useEffect(()=>{
        document.querySelector("#phone").value = "";
        document.querySelector("#phone").value = "+" + selectedFlag + " "  + document.querySelector("#phone").value;
    },[selectedFlag]);

    return(
        <div className="card bg-dark bg-opacity-75 text-light h-100">
            <div className="card-body">
                <form className="row g-2 p-2" autoComplete="off">
                    <div className="col-12">
                        <h1 className="text-center">
                            {
                                location.pathname === "/suppliers/add-supplier" ?  "Add Supplier" : "Edit Supplier"
                            }
                        </h1>
                    </div>

                    <div className="col-12 col-md-6 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "first_name"
                            placeholder="..."
                        />
                        <label className = "ms-2" htmlFor="first_name">Supplier Name</label>
                    </div>
                    <div className="col-12 col-md-6 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "last_name"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="last_name">Contact No</label>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "email"
                            placeholder="..."
                        />
                        <label className =  "ms-2" htmlFor="email">Email</label>
                    </div>
                    <div className = "col-12 position-relative text-light">
                        <label htmlFor = "phone" className = "d-block fw-bold">
                            Contact Number
                        </label>
                        <input className ="form-control bg-input text-light border border-dark" type="tel" id="phone" name="contactNumber"/>
                        <span className = "invalid-feedback" id = "phone-feedback">
                        </span>
                    </div>
                    {
                        location.pathname != "/suppliers/add-supplier" && <input type={"hidden"} value="" id = "supplier_id"/>
                    }
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
