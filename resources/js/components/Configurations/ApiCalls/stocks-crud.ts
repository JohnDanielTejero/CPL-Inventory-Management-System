import ApiEndpoint from './service-base';

/**
 * Class for stocks related CRUD operations
 */
class StocksService extends ApiEndpoint{

    readonly endpoint: string = this.baseEndpoint + '/stocks';

    /**
     * Retrieves a stock depending on the store active
     *
     * @param store id of the store
     * @returns Object as response
     */
    getStocks(store:number){
        return this.request({
            url: this.endpoint + '/all-stocks/' + store,
            method: 'GET',
        })
    }

    /**
     * Retrieves all available stocks depending on the store active
     *
     * @param store id of the store
     * @returns Object as response
     */
    getAvailableStocks(store:number){
        return this.request({
            url: this.endpoint + '/all-available-stocks/' + store,
            method: 'GET',
        })
    }

    /**
     * Delete stocks from the database
     *
     * @param store object containing store id
     * @param stock target stock id
     * @returns Object as response
     */
    deleteStocks(store:Object, stock:number){
        return this.request({
            url: this.endpoint + '/delete-stock/' + stock,
            method : 'DELETE',
            body : JSON.stringify(store),
        });
    }

    /**
     * Add stocks to the database
     *
     * @param body takes in argument such as store, product, and amount.
     * @returns Object as response
     */
    addStocks(body:Object){
        return this.request({
            url: this.endpoint + '/add-stocks',
            method : 'POST',
            body : JSON.stringify(body),
        });
    }

    /**
     * Transfers amount of stocks to the database
     *
     * @param body takes in {amount: amount} as argument
     * @param id targets stocks id as argument
     * @returns Object as response
     */
    transferStocks(body:Object, id:number){
        return this.request({
            url: this.endpoint + '/transfer-stocks/' + id,
            method : 'PUT',
            body : JSON.stringify(body),
        });
    }
}

export default new StocksService();
