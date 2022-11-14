import { useEffect, useRef, useState } from "react";
import stocksCrud from "../../Configurations/ApiCalls/stocks-crud";
import { removeError, setErrorWithMessage } from "../../Configurations/constants";

/**
 * Adding new sales form component
 *
 * @param {user} from user object the parent
 * @returns JSX.Element
 */
function SalesForm({user}){

    const container = useRef();
    const [items, setItems] = useState([]);
    const [stocks, setStocks] = useState(null);
    const [total, setTotal] = useState(0);

    useEffect(async () => {
        const attempt = await stocksCrud.getStocks(user.store_id);
        const resp = await attempt;
        setStocks(resp[1]);
    }, []);

    useEffect(() => {
        let currentTotal = 0;
        if (items.length != 0){
            for(let item of items){
                let totalProductPrice = Number(item.price) * Number(item.quantity);
                console.log(totalProductPrice);
                currentTotal += totalProductPrice;
            }
            setTotal(currentTotal);
        }
    },[items]);

    const addElement = e => {
        e.preventDefault();
        setItems(items => [...items, {
            "stock" : null,
            "quantity" : null,
            "price" : null,
        }]);
    }

    const removeElement = (e) => {
        let currentItems = [...items];
        currentItems.splice(e, 1);
        setItems(currentItems);
    }

    /**
     * Solution for markup
     *
     * Markup% = profit/cost * 100%
     *
     * DERIVATION OF FORMULA FOR REVENUE
     * profit/(cost * 100%) = markup%
     *
     * profit = markup% * (cost * 100%);
     *
     * note: profit is not the final price, therefore we add it to the original price
     * final price = profit + cost
     *
     * soulution referred to: https://www.omnicalculator.com/finance/markup
     */
    const handleProductChange = (e, index) => {
        let currentItems = [...items];
        if (currentItems.length == 1){
            currentItems[index].stock = e.target.value;
            let activeStock = stocks.filter(s => s.stock_id == e.target.value);
            let markup = Number(activeStock[0].product.Product_Markup)/100;
            currentItems[index].price = Math.round(((( markup * (Number(activeStock[0].product.Product_Price) * 1)) + Number(activeStock[0].product.Product_Price)) + Number.EPSILON) * 100) / 100;
            setItems(currentItems);
        }else{
            for (const [i, item] of Object.entries(currentItems)){
                if (i != index){
                    if (e.target.value != null && item.stock == e.target.value){
                        setErrorWithMessage(e.target, "Duplicated product, cannot be selected");
                        e.target.value = "";

                        break;
                    }else{
                        currentItems[index].stock = e.target.value;
                        let activeStock = stocks.filter(s => s.stock_id == e.target.value);
                        let markup = Number(activeStock[0].product.Product_Markup)/100;
                        currentItems[index].price = Math.round(((( markup * (Number(activeStock[0].product.Product_Price) * 1)) + Number(activeStock[0].product.Product_Price)) + Number.EPSILON) * 100) / 100;
                        setItems(currentItems);
                        break;
                    }
                }
            }
        }
    }

    const handleQuantityChange = (e, index) => {
        let currentItems = [...items];
        if (currentItems[index].stock != null){
            if (e.target.value.trim().length == 0){
                e.target.value = 0;
            }
            let activeStock = stocks.filter(s => s.stock_id == currentItems[index].stock);
            if(e.target.value > activeStock[0].product.Product_Paid){
                e.target.value = activeStock[0].product.Product_Paid;
            }
            currentItems[index].quantity = e.target.value;
            setItems(currentItems);
        }else{
            setErrorWithMessage(e.target, "Select a product first!");
            e.target.value = 0;
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

    };

    return(
        <div className="card bg-dark bg-opacity-75 text-light h-100">
            <div className="card-body">
                <form className="row g-2 p-2" autoComplete="off" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <h1 className="text-center">
                            Add New Transaction
                        </h1>
                    </div>

                    <div className="col-12">
                        {/*user information here*/}
                        <div className="row g-2">
                            <div className="col-12 form-floating">
                                <input
                                    className="form-control bg-input text-light border border-dark"
                                    id = "customer_name"
                                    placeholder="..."
                                />
                                <label className = "ms-2" htmlFor="customer_name">Customer Name</label>
                            </div>
                            <div className="col-12">
                                <div className="card bg-dark text-light" style={{height:"20rem", overflowX:"hidden", overflowY:"auto"}}>
                                    <div className="card-body">
                                        <section className="table-responsive w-100">
                                            <table className="table table-dark jumpstart-table table-bordered table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Product Name</th>
                                                        <th>Quantity</th>
                                                        <th>Price per item</th>
                                                        <th className="text-center">
                                                            <button className="btn btn-outline-light" onClick={addElement}>
                                                                <i className="bi bi-plus"></i>
                                                            </button>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody ref={container}>
                                                    {
                                                        items.length != 0 &&
                                                        items.map((e, index) => {
                                                            return(
                                                                <tr style={{height:"5rem", overflow:"hidden"}} key = {index} id = {index}>
                                                                    <td className = "h-100" style={{width:"20rem"}}>
                                                                        <select
                                                                            className="form-control bg-input text-light border border-dark"
                                                                            id = {"product-select-" + index}
                                                                            defaultValue={ e.stock != null ? e.stock : "" }
                                                                            onChange = {(e)=>{handleProductChange(e, index)}}
                                                                            onBlur={removeError}
                                                                            >
                                                                            <option value = "" disabled>Please Select</option>
                                                                            {
                                                                                stocks.map(s => {
                                                                                    return(
                                                                                        <option value = {s.stock_id} key = {"stock-" + s.stock_id}>{s.product.Product_Name}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                        </select>
                                                                        <div className="invalid-feedback" id = {'product-select-' + index + "-feedback"}></div>
                                                                    </td>
                                                                    <td style={{width:"10rem"}}>
                                                                        <input
                                                                            className="form-control bg-input text-light border border-dark"
                                                                            type={"number"}
                                                                            defaultValue ={ e.quantity != null ? e.quantity : 0 }
                                                                            id = {"amount-select-" + index}
                                                                            onBlur={removeError}
                                                                            onChange = {e => {handleQuantityChange(e, index)}}
                                                                        />
                                                                        <div className="invalid-feedback" id = {'amount-select-' + index + "-feedback"}></div>
                                                                    </td>
                                                                    <td style={{width:"6rem"}}>{ e.stock != null ? e.price : 0 }</td>
                                                                    <td style={{width:"5rem"}} className="text-center">
                                                                        <button className="btn btn-outline-light" type = "button" onClick={() => {removeElement(index)}}>
                                                                            <i className="bi bi-x-lg" style={{pointerEvents:"none"}}></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <table className="table table-dark jumpstart-table table-bordered table-hover">
                                    <tbody>
                                        <tr style={{height:"5rem", overflow:"hidden"}}>
                                            <td className = "h-100" style={{width:"20rem"}}>
                                                Total Price:
                                            </td>
                                            <td>
                                                <input className="form-control bg-input text-light border border-dark" type={"number"} disabled value={total}/>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <button className="w-100 btn btn-dark jumpstart border border-dark">
                            Add New Sales
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}


export default SalesForm;
