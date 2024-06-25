import httpClient from "./httpClient"

class TableService {
    static async validateOrders(payload) {
        return await httpClient.post('/trade/validateOrders', payload)
    }
}

export default TableService