import ApiEndpoint from "./service-base";

/**
 * Class for product related CRUD
 */
class ProductService extends ApiEndpoint{
     readonly endpoint: string = this.baseEndpoint + "/products";

     /**
      * Gets all products depending on searched criteria.
      *
      * @param query string or null
      * @returns Object response
      */
     getAllProducts(query?:string) : Promise<any> {
        return this.request({
            url : this.endpoint + "/all-products?query=" + query,
            method : 'GET',
        });
     }

     /**
      * Retrieves a particular product
      *
      * @param id number targets the product id
      * @returns Object response
      */
     getProduct(id:number) : Promise<any> {
        return this.request({
            url : this.endpoint + '/product/' + id,
            method : 'GET',
        });
     }

     /**
      * Deletes a particular product
      *
      * @param id number targets the product id
      * @returns Object response
      */
     deleteProduct(id:number) : Promise<any> {
        return this.request({
            url : this.endpoint + '/delete-product/' + id,
            method : 'DELETE',
        });
     }

     /**
      * Adds a product
      *
      * @param body payload to add product
      * @returns
      */
     addProduct(body:any) : Promise<any> {
        return this.fileUpload({
            method : 'POST',
            url : this.endpoint + '/add-product',
            data : body,
        });
     }

     /**
      * Updates a particular product
      *
      * @param body updated information of the product
      * @param id number targets the product id
      * @returns Object response
      */
     updateProduct(body:Object, id:number) : Promise<any> {
        return this.request({
            url : this.endpoint + '/update-product/' + id,
            method : 'PATCH',
            body : JSON.stringify(body),
        });
     }

     /**
      * Adds a payable amount on product
      *
      * @param body payload
      * @param id number targets the product id
      * @returns Object response
      */
     addPayable(body:Object, id:number) : Promise<any> {
        return this.request({
            url : this.endpoint + '/add-payable/' + id,
            method : 'PUT',
            body : JSON.stringify(body),
        });
     }

     /**
      * Adds paid amount on product and reduce payable amount
      *
      * @param body payload
      * @param id number targets the product id
      * @returns Object response
      */
     addPaid(body:Object, id:number) : Promise<any> {
        return this.request({
            url : this.endpoint + '/add-paid/' + id,
            method : 'PUT',
            body : JSON.stringify(body),
        });
     }
}

export default new ProductService();
