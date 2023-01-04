import ApiEndpoint from "./service-base";

/**
 * Class for Supplier crud operations
 *
 */
class SupplierService extends ApiEndpoint{

    readonly endpoint = this.baseEndpoint + "/suppliers";

    /**
     * gets all Suppliers in the list
     *
     * @param query can be null or string to query
     * @returns Object collection of suppliers
     */
    getSuppliers(query:string|null) : Promise<any> {
        return this.request({
            url: this.endpoint + '/all-suppliers?query=' + query,
            method : 'GET',
        });
    }

    /**
     * Get a particular Supplier
     *
     * @param id the primary key of Supplier
     * @returns Object of Supplier
     */
    getSupplier(id:number) : Promise<any> {
        return this.request({
            url : this.endpoint + "/supplier/" + id,
            method : 'GET',
        });
    }

    /**
     * Method for adding Supplier
     *
     * @param body Supplier object
     * @returns Object as response
     */
    addSupplier(body:Object) : Promise<any> {
        return this.request({
            url : this.endpoint + "/add-supplier",
            method : 'POST',
            body : JSON.stringify(body),
        });
    }

    /**
     * Updating a Supplier
     *
     * @param body Supplier object for update
     * @param id Supplier id for update
     * @returns Object as response
     */
    updateSupplier(body:Object, id:number) : Promise<any> {
        return this.request({
            url : this.endpoint + "/update-supplier/" + id,
            method : 'PATCH',
            body : JSON.stringify(body),
        });
    }

    /**
     * deletes a supplier from the database
     *
     * @param id takes supplier id as argument
     * @returns Object json as response
     */
    deleteSupplier(id:number) : Promise<any> {
        return this.request({
            url : this.endpoint + '/delete-supplier/' + id,
            method : 'DELETE',
        });
    }
}

export default new SupplierService();
