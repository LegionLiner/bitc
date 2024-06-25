import axios from "axios";
import { storeAuth } from "../stores/auth.store";

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

httpClient.interceptors.response.use(
    (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            return Promise.reject("error");
        }
    },
    async (error) => {
        const config = error?.config;
        const res = error.response;
        if (res?.status == 403) {
            if (!config.sent) {
                config.sent = true;
                const authStore = storeAuth()
                await authStore.refreshAccess()
                config.headers.Authorization = `Bearer ${authStore.accessToken}`
                return httpClient(config);
            }
            else {
                const authStore = storeAuth()
                authStore.logOutToken()
            }
        }
        return Promise.reject(error);
    }
);

httpClient.interceptors.request.use(
    config => {
        const authStore = storeAuth()
        if (authStore.isLogin) {
            config.headers.Authorization = `Bearer ${authStore.accessToken}`
        }
        else {
            delete config.headers.Authorization;
        }
        return config
    }
);


export default httpClient;