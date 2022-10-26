import { base, request } from '../constants';

class UserService{

    getUser(url:string){
        return request({
            url : base + url,
            method: 'GET'
        }, null);
    }

    checkPermission(url:string, permissions:any){
        return request({
            url : base + url,
            method : 'GET',
            body : JSON.stringify(permissions)
        }, null);

    }
}


export default new UserService();
