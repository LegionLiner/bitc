import httpClient from "./httpClient"

class AuthService {
    static async auth(payload) {
        return await httpClient.post('/auth/login', payload)
    };
    static async registration(payload) {
        return await httpClient.post('/auth/register', payload)
    };
    static async refreshAccess(refresh) {
        return await httpClient.post('/auth/refresh', refresh)
    }
}



export default AuthService