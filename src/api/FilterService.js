import httpClient from "./httpClient"

class FilterService {
    static async getFilterSpot() {
        return await httpClient.get('/trade/getSpotFilters')
    }
    static async getOrderSpot(payload) {
        return await httpClient.post('/trade/getOrderBookSpot', payload)
    }
    static async getProfitSpot(payload) {
        return await httpClient.post('/trade/getProfitSpot', payload)
    }
    static async getFilterP2P(payload) {
        return await httpClient.post('/trade/getPtpFilters', payload)
    }
    static async getOrderP2P(payload, controller) {
        return await httpClient.post('/trade/getProfitPtp', payload, { signal: controller.signal })
    }
    static async deleteUserFilter(payload) {
        return await httpClient.delete('/user/deleteUserFilters', { data: payload })
    }
}



export default FilterService