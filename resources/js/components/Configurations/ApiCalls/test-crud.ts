import ApiEndpoint from "./service-base";

class SampleService extends ApiEndpoint{

    getStores(){
        return this.request({
            url: this.baseEndpoint + '/stores',
            method : 'GET',
        });
    }


}

export default new SampleService();
