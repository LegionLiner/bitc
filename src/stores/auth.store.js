import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import AuthService from '../api/AuthService'
import { storeNotification } from './notification.store'
import { NOTIFICATION_TYPE } from '../constants/notification/notification'
import { useRouter } from 'vue-router';
import { NAME_PAGE } from '../constants/enum'
import { storeFilter } from './filter.store'
import { storeTable } from './table.store'

export const storeAuth = defineStore('storeAuth', () => {

    //state
    const notificationStore = storeNotification()
    const filterStore = storeFilter()
    const tableStore = storeTable()
    const router = useRouter()

    const accessToken = ref(localStorage.getItem("accessToken") || '')
    const refreshToken = ref(localStorage.getItem("refreshToken") || '')
    const textError = ref('')
    const isLogin = ref(JSON.parse(localStorage.getItem("isLogin")) || false)
    const logOutEvent = ref(false)

    //getters



    //actions
    async function login(email, password) {
        try {
            const data = await AuthService.auth({ "email": email, "password": password })
            accessToken.value = data.data.accessToken
            refreshToken.value = data.data.refreshToken
            isLogin.value = true
            localStorage.setItem("isLogin", isLogin.value);
            localStorage.setItem("accessToken", accessToken.value);
            localStorage.setItem("refreshToken", refreshToken.value);
            return true
        }
        catch (error) {
            textError.value = error.response.data.message
            notificationStore.setNotification('Ошибка входа', textError.value, { type: NOTIFICATION_TYPE.ERROR })
        }
    }
    async function registration({ firstName, email, password }) {
        try {
            const data = await AuthService.registration({ firstName, email, password })
            notificationStore.setNotification('Уведомление', data.data.msg, { type: NOTIFICATION_TYPE.SUCCESS })
        }
        catch (error) {
            textError.value = error.response.data.message
            notificationStore.setNotification('Ошибка регистрации', textError.value, { type: NOTIFICATION_TYPE.WARNING })
        }
    }
    function logOut() {
        accessToken.value = null
        refreshToken.value = null
        isLogin.value = false
        localStorage.clear()
        router.push({ name: NAME_PAGE.P2P })
        tableStore.tableP2P = []
        tableStore.tableSpot = []
        filterStore.resetFilterP2P()
        filterStore.filterP2P.currency.value = []
        filterStore.filterP2P.exchenge.value = []
        filterStore.filterP2P.paySystem.value = []
        filterStore.filterP2P.cryptoCurrency.value = []
        filterStore.resetFilterSpot()
        filterStore.filterSpot.buyExchange.value = []
        filterStore.filterSpot.saleExchange.value = []
    }
    function logOutToken() {
        logOutEvent.value = true
        logOut()
    }
    async function refreshAccess() {
        try {
            const payload = {
                "refreshToken": refreshToken.value
            }
            const response = await AuthService.refreshAccess(payload)
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            accessToken.value = response.data.accessToken
            refreshToken.value = response.data.refreshToken
        }
        catch (error) {
            textError.value = error.response.data.message
            notificationStore.setNotification('Ошибка сервера', error.message, { type: NOTIFICATION_TYPE.WARNING })
        }
    }

    return {
        isLogin, accessToken, logOutEvent,
        login, registration, logOut, logOutToken, refreshAccess
    }
})
