import ApiEndpoint from "./service-base";

/**
 * class for user related CRUD operations
 * all role can access (some operations are role-based)
 */
class UserService extends ApiEndpoint{

    readonly endpoint = this.baseEndpoint + "/users";

    /**
     * Get all users
     *
     * @param query
     * @returns Object as Response
     */
    getAllUsers(query:string|null){
        return this.request({
            url : this.endpoint + "/users?query=" + query,
            method : 'GET',
        });
    }
    /**
     * get current active user
     *
     * @returns Object as response
     */
    getActiveUser(){
        return this.request({
            url : this.endpoint + '/current-user',
            method: 'GET'
        });
    }

    insertUser(){

    }

    deleteUser(){

    }

    editUser(){

    }

    login(credentials:Object){
        return this. request({
            url : this.endpoint + '/login',
            method : 'POST',
            body : JSON.stringify(credentials)
        });
    }

    logout(){
        return this. request({
            url : this.endpoint + '/logout',
            method : 'GET',
        });
    }

    //role based methods
    hasAnyRole(permissions:Array<string>){
        return this. request({
            url : this.endpoint + '/has-any-roles',
            method : 'POST',
            body : JSON.stringify(permissions)
        });
    }

    hasRoles(permissions:Array<string>){
        return this. request({
            url : this.endpoint + '/has-all-roles',
            method : 'POST',
            body : JSON.stringify(permissions)
        });
    }

    hasPermission(permission:string){
        return this. request({
            url : this.endpoint + '/permission',
            method : 'POST',
            body : JSON.stringify(permission)
        });

    }
}


export default new UserService();
