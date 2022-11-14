import ApiEndpoint from "./service-base";

class PurchaseService extends ApiEndpoint{

    readonly endpoint: string = this.baseEndpoint + "/sales";

    addNewSales(body:Object){
        return this.request({
            url : this.endpoint + '/add-sales',
            method :'POST',
            body : JSON.stringify(body),
        });
    }

    getSalesHistory(id:number){
        return this.request({
            url : this.endpoint + "/sales-history/" + id,
            method : 'GET',
        });
    }
}

export default new PurchaseService();
