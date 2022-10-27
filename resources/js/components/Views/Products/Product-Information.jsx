function ProductDetails(){
    return(
        <div className="row text-light">
            <section className="col-md-6 col-12">
                <div className="card bg-dark bg-opacity-75 text-light">
                    <div className="card-header p-0 bg-transparent border-0 overflow-hidden d-flex justify-content-center" style={{height:"20rem"}}>
                        <img
                            src="https://www.volusion.com/blog/content/images/2021/07/Product-Photos.jpg"
                            style={{minHeight:"20rem", minWidth:"20rem"}}
                        />
                    </div>
                    <div className="card-body">
                        <h1 className="text-center">Product Information</h1>
                        <div>
                            <table className="table table-dark jumpstart-table table-bordered table-hover">
                                <tbody>
                                    <tr style={{height:"5rem", overflow:"hidden"}}>
                                        <td style={{width:"10rem"}}>Product Id: </td>
                                        <td>Product ID </td>
                                    </tr>
                                    <tr style={{height:"5rem", overflow:"hidden"}}>
                                        <td style={{width:"10rem"}}>Product Name: </td>
                                        <td>Some Product Name </td>
                                    </tr>
                                    <tr style={{height:"5rem", overflow:"hidden"}}>
                                        <td style={{width:"10rem"}}>Supplier: </td>
                                        <td>Some Supplier Name </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <section className="col-md-6 col-12">
                <div className="card bg-dark bg-opacity-75 text-light">
                    <div className="card-body">
                        <table className="table table-dark jumpstart-table table-bordered table-hover">
                            <tbody>
                                <tr style={{height:"5rem", overflow:"hidden"}}>
                                    <td style={{width:"30%"}}>Product to be Received: </td>
                                    <td>Amount of product payable</td>
                                </tr>
                                <tr style={{height:"5rem", overflow:"hidden"}}>
                                    <td style={{width:"30%"}}>Product in Inventory: </td>
                                    <td>Amount of product paid </td>
                                </tr>
                                <tr style={{height:"5rem", overflow:"hidden"}}>
                                    <td style={{width:"30%"}}>Total Amount to Pay: </td>
                                    <td>Amount of payable product </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ProductDetails;
