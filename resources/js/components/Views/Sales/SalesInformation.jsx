import moment from 'moment/moment';
import {useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import purchaseCrud from '../../Configurations/ApiCalls/purchase-crud';

/**
 * Solely for displaying sales information
 *
 * @returns JSX.Element
 */
function SalesInformation(){

    const [currentItem, setCurrentItem] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(async () => {
        if (typeof id != "undefined"){
            try{
                const attempt = await purchaseCrud.getParticularSales(id);
                setCurrentItem(await attempt);
            }catch(e){
                navigate('/sales');
            }
        }

    }, [id]);

    return(
        <>
            {
                currentItem != null &&
                <div className="card bg-dark text-light">
                    <div className="card-body">
                        <h1 className="text-center">
                            Sales Information
                        </h1>
                        <section className="table-responsive w-100">
                            <table className="table table-dark jumpstart-table table-bordered table-hover">
                                <tbody>
                                    <tr style={{height:"5rem", overflow:"hidden"}}>
                                        <td style={{width:"10rem"}}>Purchase Id:</td>
                                        <td>{ currentItem.purchase_id }</td>
                                    </tr>
                                    <tr style={{height:"5rem", overflow:"hidden"}}>
                                        <td style={{width:"10rem"}}>Purchased By: </td>
                                        <td>{ currentItem.Purchase_By }</td>
                                    </tr>
                                    <tr style={{height:"5rem", overflow:"hidden"}}>
                                        <td style={{width:"10rem"}}>Purchased Date: </td>
                                        <td>{ moment(currentItem.Purchase_Date).format("MMM Do YY") }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className="table-responsive w-100">
                            <table className="table table-dark jumpstart-table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price per item</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentItem.stock.map(e => {
                                            return(
                                                <tr style={{height:"5rem", overflow:"hidden"}} key = {e.stock_id}>
                                                    <td className = "h-100" style={{width:"2rem"}}>{e.product.Product_Name}</td>
                                                    <td style={{width:"5rem"}}>{e.pivot.quantity}</td>
                                                    <td style={{width:"6rem"}}>{e.pivot.price}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            }
        </>
    );
}

export default SalesInformation;
