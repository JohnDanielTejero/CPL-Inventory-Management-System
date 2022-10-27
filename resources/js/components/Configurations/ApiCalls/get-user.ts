import { base, request } from '../constants';

class UserService{

    getUser(url:string){
        return request({
            url : base + url,
            method: 'GET'
        });
    }

    checkPermission(url:string, permissions:Array<string>){
        return request({
            url : base + url,
            method : 'GET',
            body : JSON.stringify(permissions)
        });

    }
}


export default new UserService();
