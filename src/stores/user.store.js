import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import UserService from '../api/UserService'
import { storeAuth } from './auth.store'
import { storeFilter } from './filter.store'
import { storeNotification } from './notification.store'
import { NOTIFICATION_TYPE } from '../constants/notification/notification'

export const storeUser = defineStore('storeUser', () => {
    const authStore = storeAuth()
    const notificationStore = storeNotification()
    const filterStore = storeFilter()

    const userInfo = ref(null)
    const userFiltersP2P = ref([])
    const userFiltersSpot = ref([])

    async function getUserInfo() {
        try {
            const response = await UserService.getUserInfo(authStore.accessToken)
            userInfo.value = response.data
            userFiltersP2P.value = response.data.userFilters.userP2PFilters
            userFiltersSpot.value = response.data.userFilters.userSpotFilters
        }
        catch (error) {
            notificationStore.setNotification('Ошибка сервера', 'Не удалось получить информацию о пользователе', { type: NOTIFICATION_TYPE.ERROR })
        }
        finally { }
    }

    async function addUserFilterP2P(payload) {
        try {
            delete payload.input
            const response = await UserService.addUserFilterP2P(payload)
            if (response.data) {
                notificationStore.setNotification('Уведомление', 'Фильтр успешно сохранен', { type: NOTIFICATION_TYPE.SUCCESS })
            }
            getUserInfo()
        }
        catch (error) {
            notificationStore.setNotification('Ошибка сервера', 'Не удалось сохранить фильтр', { type: NOTIFICATION_TYPE.ERROR })
        }
    }
    async function updateUserFilter(filterName, filter, filterType) {
        try {
            let payload;
            if (filterType == "P2P") {
                const fiatNames = []
                const exchanges = []
                const coinNames = []
                const saleExchange = []
                for (let item of filter.currency.value.filter((item) => item.checked == true)) {
                    fiatNames.push(item.name)
                }
                for (let item of filter.exchenge.value.filter((item) => item.checked == true)) {
                    exchanges.push(item.name.toUpperCase())
                }
                for (let item of filter.cryptoCurrency.value.filter((item) => item.checked == true)) {
                    coinNames.push(item.name)
                }
                for (let item of filter.paySystem.value.filter((item) => item.checked == true)) {
                    saleExchange.push(item.name)
                }
                payload = {
                    filterName: filterName,
                    filterType: "P2P",
                    userP2PFilters: {
                        actions: {
                            twoActions: computed(() => filter.additionalFilters.moves == 'twoActions').value,
                            threeActions: computed(() => filter.additionalFilters.moves == 'threeActions').value
                        },
                        coinNames: coinNames,
                        deposit: filter.deposit.value,
                        exchangeOrders: filter.additionalFilters.purchaseSale,
                        exchanges: exchanges,
                        fiatNames: fiatNames,
                        isCertifiedMerchant: null,
                        limit: {
                            minLimit: filter.additionalFilters.limit.min,
                            maxLimit: filter.additionalFilters.limit.max,
                        },
                        merchant: {
                            minCountDeals: filter.additionalFilters.sumDeals.value,
                            isCertifiedMerchant: filter.additionalFilters.provenMerchand,
                            percentCompletedDeals: filter.additionalFilters.successfulTransactions.value
                        },
                        paymentTypes: saleExchange,
                        spread: {
                            minSpread: filter.additionalFilters.spred.min,
                            maxSpread: filter.additionalFilters.spred.max
                        },
                        tradingMethod: {
                            purchase: {
                                maker: filter.tradingMethod.purchase.maker,
                                taker: filter.tradingMethod.purchase.taker
                            },
                            sale: {
                                maker: filter.tradingMethod.sale.maker,
                                taker: filter.tradingMethod.sale.taker
                            }
                        }
                    }
                };
            } else if (filterType == "SPOT") {
                const buyExchange = []
                const saleExchange = []
                for (let item of filter.buyExchange.value.filter((item) => item.checked == true)) {
                    buyExchange.push(item.name)
                }
                for (let item of filter.saleExchange.value.filter((item) => item.checked == true)) {
                    saleExchange.push(item.name)
                }
                payload = {
                    userSpotFilters: {
                        buyExchanges: buyExchange,
                        sellExchanges: saleExchange,
                        minSpread: filter.spred.min,
                        maxSpread: filter.spred.max,
                        isLiquid: filter.hideIlliquid
                    },
                    filterType: filterType,
                    filterName: filterName,
                    input: true
                }
            }
            const response = await UserService.addUserFilterP2P(payload)
        }
        catch (e) {
            console.log(e)
        }
    }

    async function addUserFilterSpot(payload) {
        try {
            delete payload.input
            const response = await UserService.addUserFilterP2P(payload)
            if (response.data) {
                notificationStore.setNotification('Уведомление', 'Фильтр успешно сохранен', { type: NOTIFICATION_TYPE.SUCCESS })
            }
            getUserInfo()
        }
        catch (error) {
            notificationStore.setNotification('Ошибка сервера', 'Не удалось сохранить фильтр', { type: NOTIFICATION_TYPE.ERROR })
        }
    }
    function newUserFilter() {
        const fiatNames = []
        const exchanges = []
        const coinNames = []
        const saleExchange = []
        for (let item of filterStore.filterP2P.currency.value.filter((item) => item.checked == true)) {
            fiatNames.push(item.name)
        }
        for (let item of filterStore.filterP2P.exchenge.value.filter((item) => item.checked == true)) {
            exchanges.push(item.name.toUpperCase())
        }
        for (let item of filterStore.filterP2P.cryptoCurrency.value.filter((item) => item.checked == true)) {
            coinNames.push(item.name)
        }
        for (let item of filterStore.filterP2P.paySystem.value.filter((item) => item.checked == true)) {
            saleExchange.push(item.name)
        }
        const payload = {
            "userP2PFilters": {
                "fiatNames": fiatNames,
                "exchanges": exchanges,
                "coinNames": coinNames,
                "paymentTypes": saleExchange,
                "deposit": filterStore.filterP2P.deposit.value,
                "merchant": {
                    "minCountDeals": filterStore.filterP2P.additionalFilters.sumDeals.value
                },
                "actions": {
                    "twoActions": computed(() => filterStore.filterP2P.additionalFilters.moves == 'twoActions').value,
                    "threeActions": computed(() => filterStore.filterP2P.additionalFilters.moves == 'threeActions').value
                },
                "spread": {
                    "minSpread": filterStore.filterP2P.additionalFilters.spred.min,
                    "maxSpread": filterStore.filterP2P.additionalFilters.spred.max
                },
                "limit": {
                    "minLimit": filterStore.filterP2P.additionalFilters.limit.min,
                    "maxLimit": filterStore.filterP2P.additionalFilters.limit.max
                },
                "exchangeOrders": filterStore.filterP2P.additionalFilters.purchaseSale,
                "isCertifiedMerchant": filterStore.filterP2P.additionalFilters.provenMerchand,
                "provenMerchand": filterStore.filterP2P.additionalFilters.provenMerchand,
            },
            "filterType": "P2P",
            "filterName": "",
            "input": true
        }
        userFiltersP2P.value.push(payload)
    }
    function newUserFilterSpot() {
        const buyExchange = []
        const saleExchange = []
        for (let item of filterStore.filterSpot.buyExchange.value.filter((item) => item.checked == true)) {
            buyExchange.push(item.name)
        }
        for (let item of filterStore.filterSpot.saleExchange.value.filter((item) => item.checked == true)) {
            saleExchange.push(item.name)
        }
        const payload = {
            "userSpotFilters": {
                "buyExchanges": buyExchange,
                "sellExchanges": saleExchange,
                "minSpread": filterStore.filterSpot.spred.min,
                "maxSpread": filterStore.filterSpot.spred.max,
                "isLiquid": filterStore.filterSpot.hideIlliquid
            },
            "filterType": "SPOT",
            "filterName": "",
            "input": true
        }
        userFiltersSpot.value.push(payload)
    }
    async function deleteMerchantBlackList(merchant, exchange) {
        try {
            const payload = {
                "exchange": exchange,
                "merchantName": merchant
            }
            const response = await UserService.deleteMerchantBlackList(payload)
            notificationStore.setNotification('Уведомление', response.data, { type: NOTIFICATION_TYPE.SUCCESS })
            getUserInfo()
        }
        catch (error) {
            notificationStore.setNotification('Ошибка сервера', 'Не удалось удалить пользователя из черного списка', { type: NOTIFICATION_TYPE.ERROR })
        }
    }
    async function addMerchantBlackList(exchange, merchant) {
        try {
            const payload = {
                "exchange": exchange,
                "merchantName": merchant
            }
            const response = await UserService.addMerchantBlackList(payload)
            notificationStore.setNotification('Уведомление', response.data, { type: NOTIFICATION_TYPE.SUCCESS })
            getUserInfo()
            filterStore.getOrderP2P()
        }
        catch (error) {
            notificationStore.setNotification('Ошибка сервера', error, { type: NOTIFICATION_TYPE.ERROR })
        }
    }
    async function editProfileFilterP2P(oldFilterName, filterName) {
        try {
            const payload = {
                "oldFilterName": oldFilterName,
                "filterName": filterName,
                "filterType": "P2P"
            }
            const response = await UserService.editProfileFilter(payload)
        }
        catch (error) {
            console.log(error)
        }
    }
    async function editProfileFilterSpot(oldFilterName, filterName) {
        try {
            const payload = {
                "oldFilterName": oldFilterName,
                "filterName": filterName,
                "filterType": "SPOT"
            }
            const response = await UserService.editProfileFilter(payload)
        }
        catch (error) {
            console.log(error)
        }
    }
    return {
        userInfo, userFiltersP2P, userFiltersSpot,
        getUserInfo, addUserFilterP2P, addUserFilterSpot, deleteMerchantBlackList, addMerchantBlackList, editProfileFilterSpot, newUserFilterSpot, newUserFilter, editProfileFilterP2P, updateUserFilter
    }
})
