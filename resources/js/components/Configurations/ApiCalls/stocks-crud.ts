import ApiEndpoint from './service-base';

class StocksService extends ApiEndpoint{

    readonly endpoint: string = this.baseEndpoint + '/stocks';

    getStocks(store:number){
        return this.request({
            url: this.endpoint + '/all-stocks/' + store,
            method: 'GET',
        })
    }

    deleteStocks(store:Object, stock:number){
        return this.request({
            url: this.endpoint + '/delete-stock/' + stock,
            method : 'DELETE',
            body : JSON.stringify(store),
        });
    }

    addStocks(body:Object){
        return this.request({
            url: this.endpoint + '/add-stocks',
            method : 'POST',
            body : JSON.stringify(body),
        });
    }

    transferStocks(body:Object, id:number){
        return this.request({
            url: this.endpoint + '/transfer-stocks/' + id,
            method : 'PUT',
            body : JSON.stringify(body),
        });
    }
}

export default new StocksService();
