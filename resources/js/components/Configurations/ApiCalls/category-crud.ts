import ApiEndpoint from './service-base';

/**
 * class for category CRUD related operations.
 * only administrator has access.
 */
class CategoryService extends ApiEndpoint{

    readonly endpoint = this.baseEndpoint + "/category";

    /**
     * Gets all categories registered from the database
     *
     * @param query can be null or a string for search queries
     * @returns Object as response
     */
    getCategories(query:string|null){
        return this.request({
            url : this.endpoint + "/categories?query=" + query,
            method : 'GET',
        });
    }

    /**
     * Deletes the category
     *
     * @param target the id of the category
     * @returns Object as response
     */
    deleteCategory(target:number){
        return this.request({
            url : this.endpoint + '/delete-category/' + target,
            method : 'DELETE'
        });
    }

    /**
     * Get a particular category
     *
     * @param id the id of target category
     * @returns Object as response
     */
    getCategory(id:string){
        return this.request({
            url : this.endpoint + "/category-information/" + id,
            method : 'GET',
        });
    }

    /**
     * adds a category to the database
     *
     * @param body Object which contains category model
     * @returns Object as response
     */
    addCategory(body:Object){
        return this.request({
            url : this.endpoint + '/add-category',
            method : 'POST',
            body : JSON.stringify(body),
        });
    }

    /**
     * updates the category in the database.
     *
     * @param body Object which contains category model
     * @param id the id of the target category
     * @returns Object as response
     */
    updateCategory(body:Object, id:string){
        return this.request({
            url : this.endpoint + '/update-category/' + id,
            method : 'PATCH',
            body : JSON.stringify(body),
        });
    }
}

export default new CategoryService();
