import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";

import categoryCrud from "../../Configurations/ApiCalls/category-crud";
import debounce from "../../Configurations/constants";

/**
 * Category component to display list of categories
 *
 * @returns JSX.Element
 */
function Categories(){

    const [search, setSearch] = useState('');
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    const buttonNavigate = (e) => {
        navigate(e.target.getAttribute('data-route-target'));
    }

    useEffect(async () => {
        setCategories(await categoryCrud.getCategories());
        //categoryCrud.getCategories().then(res => setCategories(res));
    },[]);

    useEffect(async () => {
        setCategories(await categoryCrud.getCategories(search.trim()));
        //categoryCrud.getCategories(search.trim()).then(res => setCategories(res));
    },[search]);

    //events
    const handleSearch = (e) => {
        debounce(setSearch(e.target.value));
    }

    const handleDelete = (e) => {
        categoryCrud.deleteCategory(e.target.getAttribute('data-categ-target'))
            .then(res => setCategories(res));
        }

    return(
        <>
            <section className="d-flex justify-content-end mb-2">
                <div className="form-floating">
                    <input
                        className="form-control bg-input text-light border border-dark"
                        id = "search"
                        placeholder="..."
                        autoComplete="off"
                        onChange={handleSearch}
                    />
                    <label htmlFor="search" className="text-light">Search</label>
                </div>
            </section>
            <section className="table-responsive w-100">
                <table className="table table-dark jumpstart-table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Category ID</th>
                            <th>Category</th>
                            <th>Category Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map((value) => {
                                return(
                                    <tr style={{height:"5rem", overflow:"hidden"}} key={value.id}>
                                        <td style={{width:"5rem"}}>{ value.id }</td>
                                        <td style={{width:"5rem"}}>{value.Category_Name }</td>
                                        <td style={{width:"15rem"}}>{ value.Category_Desc } </td>
                                        <td style={{width:"5rem"}} className="p-2">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button className="btn btn-outline-light bg-gradient" data-route-target = {"edit-category/" + value.id} onClick={buttonNavigate}>
                                                    <i className="bi bi-pen"></i>
                                                    <span className = "ms-1">Edit</span>
                                                </button>
                                                <button className="btn btn-dark jumpstart ms-2" data-categ-target={value.id} onClick={handleDelete}>
                                                    <i className="bi bi-trash"style={{pointerEvents:"none"}}></i>
                                                    <span className = "ms-1" style={{pointerEvents:"none"}}>Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default Categories;
