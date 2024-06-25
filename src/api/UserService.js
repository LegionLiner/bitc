import httpClient from "./httpClient"

class UserService {
    static async getUserInfo() {
        return await httpClient.get('/user/userInfo')
    }
    static async addUserFilterP2P(payload) {
        return await httpClient.post('/user/saveUserFilters', payload)
    }
    static async deleteMerchantBlackList(payload) {
        return await httpClient.delete('/user/deleteMerchantBlackList', { data: payload })
    }
    static async addMerchantBlackList(payload) {
        return await httpClient.post('/user/addMerchantBlackList', payload)
    }
    static async editProfileFilter(payload) {
        return await httpClient.post('/user/editProfileFilter', payload)
    }
}



export default UserService