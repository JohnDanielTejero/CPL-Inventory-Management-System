import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productCrud from "../../Configurations/ApiCalls/product-crud";
import debounce from "../../Configurations/constants";

/**
 * Component for showing all products
 *
 * @returns JSX.Element
 */
function Products(){
    const navigate = useNavigate();
    const buttonNavigate = (e) => {
        navigate(e.target.getAttribute('data-route-target'));
    }

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(async () => {
        const resp = productCrud.getAllProducts('');
        setProducts(await resp);

        return(()=>{
            setProducts([]);
        });
    },[]);

    useEffect(async () => {
        const resp = productCrud.getAllProducts(search);
        setProducts(await resp);
        return (()=>{
            setSearch('');
        })
    }, [search]);

    const handleSearch = e => {
        debounce(setSearch(e.target.value));
    }

    const handleDelete = async e => {
        const resp = productCrud.deleteProduct(e.target.getAttribute('data-delete-product'));
        setProducts(await resp);
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
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Payable</th>
                            <th>Paid</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Expiration</th>
                            <th>Markup %</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products != null &&
                                products.map((e) => {
                                    return(
                                        <tr style={{height:"5rem", overflow:"hidden"}} key = { e.product_id }>
                                            <td className = "h-100" style={{width:"2rem"}}>{ e.product_id }</td>
                                            <td style={{width:"5rem"}}> { e.Product_Name } </td>
                                            <td style={{width:"6rem"}}> { e.Product_Payable } </td>
                                            <td style={{width:"5rem"}}> { e.Product_Paid } </td>
                                            <td style={{width:"6rem"}}> P { e.Product_Price } </td>
                                            <td style={{width:"6rem"}}> { e.category.Category_Name } </td>
                                            <td style={{width:"5rem"}}> { e.Product_Expiry != null ? moment(e.Product_Expiry).format("MMM Do YY") : 'no expiration' } </td>
                                            <td style={{width:"5rem"}}> { e.Product_Markup + "%"} </td>
                                            <td style={{width:"5rem"}} className="p-2">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button className="btn btn-outline-light bg-gradient" data-route-target = {"edit-product/" + e.product_id} onClick={buttonNavigate}>
                                                        <i className="bi bi-pen" style = {{pointerEvents:'none'}}></i>
                                                        <span className = "ms-1" style = {{pointerEvents:'none'}}>Edit</span>
                                                    </button>
                                                    <button className="btn btn-dark ms-2" data-route-target = {"product-information/" + e.product_id} onClick={buttonNavigate}>
                                                        <i className="bi bi-eye" style = {{pointerEvents:'none'}}></i>
                                                        <span className = "ms-1" style = {{pointerEvents:'none'}}>View</span>
                                                    </button>
                                                    <button className="btn btn-dark jumpstart ms-2" data-delete-product = {e.product_id} onClick={handleDelete}>
                                                        <i className="bi bi-trash" style = {{pointerEvents:'none'}}></i>
                                                        <span className = "ms-1" style = {{pointerEvents:'none'}}>Delete</span>
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

export default Products;

