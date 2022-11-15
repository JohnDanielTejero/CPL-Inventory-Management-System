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
    getAllUsers(query:string|null) : Promise<any> {
        return this.request({
            url : this.endpoint + "/all-users?query=" + query,
            method : 'GET',
        });
    }
    /**
     * get current active user
     *
     * @returns Object as response
     */
    getActiveUser() : Promise<any> {
        return this.request({
            url : this.endpoint + '/current-user',
            method: 'GET'
        });
    }

    /**
     * creates new user or employee
     *
     * @param user Object containing user information
     * @returns Object as response
     */
    insertUser(user:Object) : Promise<any> {
        return this.request({
            url : this.endpoint + '/register',
            method : 'POST',
            body : JSON.stringify(user)
        });
    }

    /**
     * deletes a user or employee entity
     *
     * @param id id of the user
     * @returns Object as response
     */
    deleteUser(id:number) : Promise<any> {
        return this.request({
            url : this.endpoint + '/delete-user/' + id,
            method : 'DELETE'
        });
    }

    /**
     * Updates the current user's profile
     *
     * @param userinfo body of user to be updated
     * @returns Object as response
     */
    editUser(userinfo:Object) : Promise<any> {
        return this.request({
            url : this.endpoint + '/update-user-profile',
            method : 'PATCH',
            body : JSON.stringify(userinfo),
        });
    }

    /**
     * attempts to authenticate user
     *
     * @param credentials Object containing email and password
     * @returns Object as response: TOKEN
     */
    login(credentials:Object) : Promise<any> {
        return this. request({
            url : this.endpoint + '/login',
            method : 'POST',
            body : JSON.stringify(credentials)
        });
    }

    /**
     * invalidates the user's JWT on the server
     *
     * @returns Object as response
     */
    logout() : Promise<any> {
        return this. request({
            url : this.endpoint + '/logout',
            method : 'GET',
        });
    }

    /**
     * checks if user has any role
     *
     * @param permissions Array of strings
     * @returns boolean
     */
    hasAnyRole(permissions:Array<string>) : Promise<any> {
        return this. request({
            url : this.endpoint + '/has-any-roles',
            method : 'POST',
            body : JSON.stringify(permissions)
        });
    }

    /**
     * checks if users has all roles
     *
     * @param permissions Array of strings
     * @returns boolean
     */
    hasRoles(permissions:Array<string>) : Promise<any> {
        return this. request({
            url : this.endpoint + '/has-all-roles',
            method : 'POST',
            body : JSON.stringify(permissions)
        });
    }

    /**
     * checks if user has a role
     *
     * @param permission string
     * @returns boolean
     */
    hasPermission(permission:string) : Promise<any> {
        return this. request({
            url : this.endpoint + '/permission',
            method : 'POST',
            body : JSON.stringify(permission)
        });

    }

    /**
     * gets all available roles
     *
     * @returns Array<Object>
     */
    getRoles() : Promise<any> {
        return this.request({
            url : this.endpoint + "/roles",
            method : 'GET'
        });
    }
}


export default new UserService();
