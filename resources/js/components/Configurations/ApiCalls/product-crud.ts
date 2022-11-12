import ApiEndpoint from "./service-base";
import axios from 'axios';
import { getCookie } from "../constants";

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

        return this.fileUpload({
            method : 'POST',
            url : this.endpoint + '/add-product',
            data : body,
        });
     }

     updateProduct(body:Object, id:number){
        return this.request({
            url : this.endpoint + '/update-product/' + id,
            method : 'PATCH',
            body : JSON.stringify(body),
        });
     }

     addPayable(body:Object, id:number){
        return this.request({
            url : this.endpoint + '/add-payable/' + id,
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
