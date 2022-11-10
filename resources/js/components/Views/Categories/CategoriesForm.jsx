import { validateName, removeError, cannotBeEmpty, setSuccess, setErrorWithMessage } from "../../Configurations/constants";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import categoryCrud from "../../Configurations/ApiCalls/category-crud";

/**
 * Form for updating and adding new category.
 * @returns JSX.Element
 */
function CategoryForm(){

    //location utilities
    const navigate = useNavigate();
    let { id } = useParams();
    const location = useLocation();

    //current active category state
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(async () => {
        if(id != undefined){
            setActiveCategory(await categoryCrud.getCategory(id));
        }else{
            setActiveCategory(null);
        }
    }, [id]);

    //events
    const handleCategoryName = (e) => {
       if(cannotBeEmpty(e.target)){
            if(validateName(e.target.value.trim())){
                setSuccess(e.target);
            }else{
               setErrorWithMessage(e.target, "Category name is invalid!");
            }
        }else{
            setErrorWithMessage(e.target, 'Category name is required!');
       }
    }

    const handleCategoryDesc = (e) => {
        if(cannotBeEmpty(e.target)){
            setSuccess(e.target);
        }else{
            setErrorWithMessage(e.target, "Category description is required!");
       }
    }

    const submitEventHandler = async e => {
        e.preventDefault();

        let nameValid = false;
        let descValid = false;

        if(cannotBeEmpty(e.target[0])){
            if(validateName(e.target[0].value.trim())){
                setSuccess(e.target[0])
                nameValid = true;
            }else{
                setErrorWithMessage(e.target[0],"Category name is invalid!");
            }
        }else{
            setErrorWithMessage(e.target[0], "Category name is required");
        }

        if(cannotBeEmpty(e.target[1])){
            setSuccess(e.target[1]);
            descValid = true;
        }else{
            setErrorWithMessage(e.target[1], 'Category description is required!');
       }

       if(nameValid && descValid){
            if (location.pathname == '/category/add-category'){
                const response = await categoryCrud.addCategory(
                    {
                        'Category_Name' : e.target[0].value.trim(),
                        'Category_Desc' : e.target[1].value.trim(),
                    }
                );

                if (response.errors != null){

                    for (const [key, value] of Object.entries(response.errors)){
                        console.log(key + value[0]);
                        if (key == "Category_Name"){
                            e.target[0].classList.add('is-invalid');
                            e.target[0].classList.remove('is-valid');
                            nameValid = false;

                            if (value[0].includes('field is required')){
                                document.querySelector("#" + e.target[0].getAttribute("id") + "-feedback").innerHTML = "Category name is required";
                            }

                        }else if (key == "Category_Desc"){
                            e.target[1].classList.add('is-invalid');
                            e.target[1].classList.remove('is-valid');
                            descValid = false;

                            if (value[0].includes('field is required')){
                                document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "Category description is required";
                            }
                        }
                    }
                    return;
                }

            }else{
                const response = await categoryCrud.updateCategory(
                    {
                        'Category_Name' : e.target[0].value.trim(),
                        'Category_Desc' : e.target[1].value.trim(),
                    },
                    id
                );

                if (response.errors != null){

                    for (const [key, value] of Object.entries(response.errors)){
                        console.log(key + value[0]);
                        if (key == "Category_Name"){
                            e.target[0].classList.add('is-invalid');
                            e.target[0].classList.remove('is-valid');
                            nameValid = false;

                            if (value[0].includes('field is required')){
                                document.querySelector("#" + e.target[0].getAttribute("id") + "-feedback").innerHTML = "Category name is required";
                            }
                        }else if (key == "Category_Desc"){
                            e.target[1].classList.add('is-invalid');
                            e.target[1].classList.remove('is-valid');
                            descValid = false;

                            if (value[0].includes('field is required')){
                                document.querySelector("#" + e.target[1].getAttribute("id") + "-feedback").innerHTML = "Category description is required";
                            }
                        }
                    }
                    return;
                }

            }
            navigate("/category");
        }
    }

    return(
        <div className="card bg-dark bg-opacity-75 text-light h-100">
            <div className="card-body">
                <form className="row g-2 p-2" autoComplete="off" onSubmit={submitEventHandler}>
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
                            onChange={handleCategoryName}
                            onBlur = {removeError}
                            defaultValue = {activeCategory != null ? activeCategory.Category_Name : ''}
                        />
                        <label className = "ms-2" htmlFor="category">Category Name</label>
                        <div className="invalid-feedback" id = "category-feedback">
                        </div>
                    </div>
                    <div className="col-12 form-floating">
                        <textarea
                            className="form-control bg-input text-light border border-dark"
                            id = "category-description"
                            placeholder="..."
                            style={{height:"20rem"}}
                            onChange = {handleCategoryDesc}
                            onBlur = {removeError}
                            defaultValue = {activeCategory != null ? activeCategory.Category_Desc : ''}
                        />
                        <label className =  "ms-2" htmlFor="category-description">Category Description</label>
                        <div className="invalid-feedback" id = "category-description-feedback">
                        </div>
                    </div>
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
