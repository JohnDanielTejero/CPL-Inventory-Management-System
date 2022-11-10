import ApiEndpoint from "./service-base";

/**
 * Class for store crud operations
 *
 */
class StoreService extends ApiEndpoint{

    readonly endpoint = this.baseEndpoint + "/stores";

    /**
     * gets all stores in the list
     *
     * @param query can be null or string to query
     * @returns Object collection of stores
     */
    getStores(query:string|null){
        return this.request({
            url: this.endpoint + '/all-stores?query=' + query,
            method : 'GET',
        });
    }

    /**
     * Get a particular store
     *
     * @param id the primary key of store
     * @returns Object of store
     */
    getStore(id:number){
        return this.request({
            url : this.endpoint + "/store/" + id,
            method : 'GET',
        });
    }

    /**
     * Method for adding store
     *
     * @param body Store object
     * @returns Object as response
     */
    addStore(body:Object){
        return this.request({
            url : this.endpoint + "/add-store",
            method : 'POST',
            body : JSON.stringify(body),
        });
    }

    /**
     * Updating a store
     *
     * @param body Store object for update
     * @param id store id for update
     * @returns Object as response
     */
    updateStore(body:Object, id:number){
        return this.request({
            url : this.endpoint + "/update-store/" + id,
            method : 'PATCH',
            body : JSON.stringify(body),
        });
    }

    /**
     * deletes a store from the database
     *
     * @param id takes store id as argument
     * @returns Object as response
     */
    deleteStore(id:number){
        return this.request({
            url : this.endpoint + '/delete-store/' + id,
            method : 'DELETE',
        });
    }
}

export default new StoreService();
