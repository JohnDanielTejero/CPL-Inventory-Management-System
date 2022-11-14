import ApiEndpoint from "./service-base";

class PurchaseService extends ApiEndpoint{

    readonly endpoint: string = this.baseEndpoint + "/sales";

    /**
     * Adds new sales record
     * @param body {
                    "items" : items,
                    'customer' : customer name,
                    'Payable' : total,
                    'store' : store id,
                 }
     * @returns Object as response
     */
    addNewSales(body:Object){
        return this.request({
            url : this.endpoint + '/add-sales',
            method :'POST',
            body : JSON.stringify(body),
        });
    }

    /**
     * Get sales history of particular store
     *
     * @param id targets the store Id
     * @returns Object response
     */
    getSalesHistory(id:number){
        return this.request({
            url : this.endpoint + "/sales-history/" + id,
            method : 'GET',
        });
    }

    /**
     * Deletes sales record
     *
     * @param purchaseid targets purchase Id
     * @param store {store : storeid}
     * @returns Object as response
     */
    deleteSales(purchaseid:number, store:Object){
        return this.request({
            url : this.endpoint + "/delete-sales/" + purchaseid,
            method: "DELETE",
            body : JSON.stringify(store),
        })
    }

    /**
     * Gets a particular record of sale
     *
     * @param id purchase
     * @returns Object as response
     */
    getParticularSales(id:number){
        return this.request({
            url : this.endpoint + "/purchase/" + id,
            method : "GET",
        })
    }
}

export default new PurchaseService();
