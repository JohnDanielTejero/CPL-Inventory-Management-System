import ApiEndpoint from "./service-base";

class ProductService extends ApiEndpoint{
     readonly endpoint: string = this.baseEndpoint + "/products";

     getAllProducts(query?:string){
        return this.request({
            url : this.endpoint + "/all-products?query=" + query,
            method : 'GET',
        });
     }

     getProduct(id:number){
        return this.request({
            url : this.endpoint + '/product/' + id,
            method : 'GET',
        });
     }

     deleteProduct(id:number){
        return this.request({
            url : this.endpoint + '/delete-product/' + id,
            method : 'DELETE',
        });
     }

     addProduct(body:any){
        return this.request({
            url : this.endpoint + '/add-product',
            method : 'POST',
            body : JSON.stringify(body),
        }, 'multipart/form-data; boundary=???')
     }

     updateProduct(body:Object, id:number){
        return this.request({
            url : this.endpoint + '/update-product/' + id,
            method : 'PATCH',
            body : JSON.stringify(body),
        }, 'multipart/form-data; boundary=???')
     }

     addPayable(body:Object, id:number){
        return this.request({
            url : this.endpoint + '/add-paid/' + id,
            method : 'PUT',
            body : JSON.stringify(body),
        });
     }

     addPaid(body:Object, id:number){
        return this.request({
            url : this.endpoint + '/add-paid/' + id,
            method : 'PUT',
            body : JSON.stringify(body),
        });
     }
}

export default new ProductService();
