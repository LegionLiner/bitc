import httpClient from "./httpClient"

class P2PSpreadService {
    static async p2pSpreadPrices(payload) {
        return await httpClient.post('/p2p/prices', payload)
    }
    static async p2pFilterPrices(payload) {
        return await httpClient.post('/p2p/filterPrices', payload)
    }
}

export default P2PSpreadService