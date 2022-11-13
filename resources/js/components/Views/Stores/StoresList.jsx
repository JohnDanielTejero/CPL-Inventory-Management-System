import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import storeCrud from "../../Configurations/ApiCalls/store-crud";
import debounce, { dateToHumanReadable } from "../../Configurations/constants";
function StoresList(){

    const [search, setSearch] = useState('');
    const [stores, setStores] = useState([]);

    useEffect(async () => {
        setStores(await storeCrud.getStores(''));

        return(() => {
            setStores(null);
        });

    },[]);

    useEffect(async () =>{
        setStores(await storeCrud.getStores(search));

        return(() => {
            setStores(null);
        });

    },[search]);

    const navigate = useNavigate();
    const buttonNavigate = (e) => {
        navigate(e.target.getAttribute('data-route-target'));
    }

    const handleSearch = e => {
        debounce(setSearch(e.target.value));
    }

    const handleDelete = async (e) => {
        const response = await storeCrud.deleteStore(e.target.getAttribute('data-delete-target'));
        setStores(await response);
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
            <section className="table-responsive w-100" style={{height:'30rem', overflowY:'auto'}}>
                <table className="table table-dark jumpstart-table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Store Name</th>
                            <th>Store Address</th>
                            <th>Added At</th>
                            <th>Modified At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stores.map(e => {
                                return (
                                    <tr style={{height:"5rem", overflow:"hidden"}} key={e.stores_id}>
                                        <td style={{width:"5rem"}}>{ e.Store_Name }</td>
                                        <td style={{width:"6rem"}}>{ e.Store_Address }</td>
                                        <td style={{width:"5rem"}}>{ dateToHumanReadable(e.created_at) }</td>
                                        <td style={{width:"5rem"}}>{ dateToHumanReadable(e.updated_at) }</td>
                                        <td style={{width:"5rem"}} className="p-2">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <button className="btn btn-outline-light bg-gradient" data-route-target = {"edit-store/" + e.stores_id} onClick={buttonNavigate}>
                                                    <i className="bi bi-pen" style={{pointerEvents:'none'}}></i>
                                                    <span className = "ms-1" style={{pointerEvents:'none'}}>Edit</span>
                                                </button>
                                                <button className="btn btn-dark jumpstart ms-2" onClick = {handleDelete} data-delete-target = {e.stores_id}>
                                                    <i className="bi bi-trash" style={{pointerEvents:'none'}}></i>
                                                    <span className = "ms-1" style={{pointerEvents:'none'}}>Delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </section>
        </>
    );
}

export default StoresList;
