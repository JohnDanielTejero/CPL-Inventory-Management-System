import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect} from "react";
import storeCrud from "../../Configurations/ApiCalls/store-crud";
import { cannotBeEmpty, removeError, setErrorWithMessage, setSuccess } from "../../Configurations/constants";

/**
 * Component for adding and editing stores
 *
 * @returns JSX.Element
 */
function StoresForm(){

    const location = useLocation();
    const navigate = useNavigate();
    let { id } = useParams();

    const [store, setStore] = useState(null);

    useEffect(async () => {
        if (location.pathname !== "/stores/add-store"){
            const currentStore = await storeCrud.getStore(id);
            setStore(await currentStore);
        }else{
            setStore(null);
        }
    }, [location]);

    //events
    const handleStoreName = (e) => {
        if(cannotBeEmpty(e.target)){
            setSuccess(e.target);
        }else{
            setErrorWithMessage(e.target, 'Store name field is required.')
        }
    }

    const handleAddress = (e) => {
        if(cannotBeEmpty(e.target)){
            setSuccess(e.target);
        }else{
            setErrorWithMessage(e.target, 'Store name field is required.')
        }
    }

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        let storeValid = false;
        let addressValid = false;

        if(cannotBeEmpty(e.target[0])){
            setSuccess(e.target[0]);
            storeValid = true;
        }else{
            setErrorWithMessage(e.target[0], 'Store name field is required.')
        }

        if(cannotBeEmpty(e.target[1])){
            setSuccess(e.target[1]);
            addressValid = true;
        }else{
            setErrorWithMessage(e.target[1], 'Store name field is required.')
        }

        if(storeValid && addressValid){
            if (location.pathname == "/stores/add-store"){
                const attempt = await storeCrud.addStore({
                    Store_Name : e.target[0].value,
                    Store_Address : e.target[1].value,
                });

                const response = await attempt;
                console.log(response[1]);
                switch (response[0].status) {
                    case "bad request":
                        for (const [key, value] of Object.entries(response[1])){
                            setErrorWithMessage(document.querySelector("#" + key), value);
                        }

                        storeValid = false;
                        addressValid = false;

                        break;
                    case "resource created successfully":
                        console.log(response[0]);
                        navigate('/stores')
                        break;

                    default:
                        return;
                }

            }else{
                const attempt = await storeCrud.updateStore({
                    Store_Name : e.target[0].value,
                    Store_Address : e.target[1].value,
                }, id);

                const response = await attempt;
                console.log(response[1]);
                switch (response[0].status) {
                    case "bad request":
                        for (const [key, value] of Object.entries(response[1])){
                            setErrorWithMessage(document.querySelector("#" + key), value);
                        }

                        storeValid = false;
                        addressValid = false;
                        break;

                    case "resource not found":
                        console.log(response[0].status);
                        navigate('/stores');
                        storeValid = false;
                        addressValid = false;
                        break;

                    case "updated":
                        console.log(response[0]);
                        navigate('/stores')
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
                <form className="row g-2 p-2" autoComplete="off" onSubmit={handleFormSubmission}>
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
                            id = "Store_Name"
                            placeholder="..."
                            defaultValue={ store != null ? store.Store_Name : ""}
                            onChange = {handleStoreName}
                            onBlur = {removeError}
                            />
                        <label className = "ms-2" htmlFor="Store_Name">Store Name</label>
                        <div className="invalid-feedback" id="Store_Name-feedback"></div>
                    </div>
                    <div className="col-12 form-floating">
                        <input
                            className="form-control bg-input text-light border border-dark"
                            id = "Store_Address"
                            placeholder="..."
                            defaultValue={ store != null ? store.Store_Address : ""}
                            onChange = {handleAddress}
                            onBlur = {removeError}
                        />
                        <label className = "ms-2" htmlFor="Store_Address">Store Address</label>
                        <div className="invalid-feedback" id="Store_Address-feedback"></div>
                    </div>
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
