import ApiEndpoint from './service-base';

class StocksService extends ApiEndpoint{

    readonly endpoint: string = this.baseEndpoint + '/stocks';

    getStocks(store:number){
        return this.request({
            url: this.endpoint + '/all-stocks/' + store,
            method: 'GET',
        })
    }
}

export default new StocksService();
