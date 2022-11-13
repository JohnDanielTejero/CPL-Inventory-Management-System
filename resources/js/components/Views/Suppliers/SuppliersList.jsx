import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supplierCrud from "../../Configurations/ApiCalls/supplier-crud";
import debounce from "../../Configurations/constants";

/**
 * Component to for suppliers table
 *
 * @returns JSX.Element
 */
function SuppliersList(){

    const navigate = useNavigate();
    const buttonNavigate = (e) => {
        navigate(e.target.getAttribute('data-route-target'));
    }

    const [search, setSearch] =useState("");
    const [suppliers, setSuppliers] = useState([]);

    useEffect(async () => {
        const collection = supplierCrud.getSuppliers('');
        setSuppliers(await collection);

        return(() => {
            setSuppliers([]);
            setSearch('');
        });

    }, []);

    useEffect(async () => {
        const collection = supplierCrud.getSuppliers(search);
        setSuppliers(await collection);

        return(() => {
            setSuppliers([]);
            setSearch('');
        });

    }, [search]);

    const handleSearch = e => {
        debounce(setSearch(e));
    }

    const handleDelete = async e => {
        const response = await supplierCrud.deleteSupplier(e.target.getAttribute('data-delete-supplier'));
        setSuppliers(await response);
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
                                <th>Supplier Name</th>
                                <th>Contact No</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                suppliers.map( e => {
                                    return (
                                        <tr style={{height:"5rem", overflow:"hidden"}} key = {e.supp_id}>
                                            <td style={{width:"6rem"}}>{ e.Supp_Name }</td>
                                            <td style={{width:"6rem"}}>{ e.Supp_ContactNo }</td>
                                            <td style={{width:"5rem"}}>{ e.Supp_Email }</td>
                                            <td style={{width:"5rem"}} className="p-2">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button className="btn btn-outline-light bg-gradient" data-route-target = {"edit-supplier/" + e.supp_id } onClick={buttonNavigate}>
                                                        <i className="bi bi-pen"></i>
                                                        <span className = "ms-1">Edit</span>
                                                    </button>
                                                    <button className="btn btn-dark jumpstart ms-2" onClick={handleDelete} data-delete-supplier = {e.supp_id}>
                                                        <i className="bi bi-trash" style={{pointerEvents:"none"}}></i>
                                                        <span className = "ms-1" style={{pointerEvents:"none"}}>Delete</span>
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

export default SuppliersList;
