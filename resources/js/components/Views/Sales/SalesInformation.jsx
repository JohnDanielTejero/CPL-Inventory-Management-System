function SalesInformation(){
    return(
        <div className="card bg-dark text-light">
            <div className="card-body">
                <h1 className="text-center">
                    Sales Information
                </h1>
                <section className="table-responsive w-100">
                    <table className="table table-dark jumpstart-table table-bordered table-hover">
                        <tbody>
                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                <td style={{width:"10rem"}}>Purchase Id: </td>
                                <td>Some ID</td>
                            </tr>
                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                <td style={{width:"10rem"}}>Purchased By: </td>
                                <td>Name</td>
                            </tr>
                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                <td style={{width:"10rem"}}>Purchased Date: </td>
                                <td>Date</td>
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
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{height:"5rem", overflow:"hidden"}}>
                                <td className = "h-100" style={{width:"2rem"}}>1</td>
                                <td style={{width:"5rem"}}>Tite</td>
                                <td style={{width:"6rem"}}>20 pcs</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
}

export default SalesInformation;
