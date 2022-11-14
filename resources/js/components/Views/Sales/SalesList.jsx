import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import purchaseCrud from "../../Configurations/ApiCalls/purchase-crud";
import { dateToHumanReadable } from "../../Configurations/constants";

function SalesList({user}){

    const [records, setRecords] = useState(null);

    const navigate = useNavigate();
    const buttonNavigate = (e) => {
        navigate(e.target.getAttribute('data-route-target'));
    }

    useEffect(async () => {
        const currentRecords = await purchaseCrud.getSalesHistory(user.store_id);
        setRecords(await currentRecords[1]);
    }, []);

    const handleDelete = async e => {
        const attempt = await purchaseCrud.deleteSales(e.target.getAttribute('data-purchase-delete'),{'store' : user.store_id});
        const resp = await attempt;

        switch (resp[0].status) {
            case "success":
                setRecords(resp[1]);
                break;
            default:
                return;
        }
    }

    return(
        <>
            <section className="table-responsive w-100" style={{height:'30rem', overflowY:'auto'}}>
                <table className="table table-dark jumpstart-table table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Purchased By</th>
                            <th>Total Payable</th>
                            <th>Paid At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records != null &&
                                records.map(e => {
                                    return(
                                        <tr style={{height:"5rem", overflow:"hidden"}} key = {e.purchase_id}>
                                            <td style={{width:"5rem"}}>{ e.Purchase_By }</td>
                                            <td style={{width:"5rem"}}>P { e.Purchase_Payable }</td>
                                            <td style={{width:"6rem"}}>{ dateToHumanReadable(e.Purchase_Date) }</td>
                                            <td style={{width:"5rem"}} className="p-2">
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <button className="btn btn-dark ms-2" data-route-target = {"sale-information/" + e.purchase_id} onClick={buttonNavigate}>
                                                        <i className="bi bi-eye"style={{pointerEvents:'none'}}></i>
                                                        <span className = "ms-1"style={{pointerEvents:'none'}}>View</span>
                                                    </button>
                                                    <button className="btn btn-dark jumpstart ms-2" data-purchase-delete = {e.purchase_id} onClick={handleDelete}>
                                                        <i className="bi bi-trash" style={{pointerEvents:'none'}}></i>
                                                        <span className = "ms-1"style={{pointerEvents:'none'}}>Delete</span>
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

export default SalesList;
