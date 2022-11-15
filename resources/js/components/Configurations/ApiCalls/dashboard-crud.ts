import ApiEndpoint from '../ApiCalls/service-base';

/**
 * Class for dashboard related CRUD
 */
class DashboardService extends ApiEndpoint{

    readonly endpoint: string = this.baseEndpoint + "/dashboard";

    /**
     * Retrieves the data for admin dashboard
     *
     * @returns Object as response
     */
    getAdminDashboardReport() : Promise<any> {
        return this.request({
            url : this.endpoint + "/admin",
            method : 'GET'
        });
    }

    /**
     * Retrieves the data for store owner dashboard
     *
     * @returns Object as response
     */
    getStoreOwnerDashboardReport() : Promise<any> {
        return this.request({
            url : this.endpoint + "/store-owner",
            method : 'GET'
        });
    }
}

export default new DashboardService();
