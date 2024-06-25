import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import P2PSpreadService from '../api/P2PSpreadService'
import { useI18n } from 'vue-i18n'


export const storeP2PSpread = defineStore('storeP2PSpread', () => {

    //state
    const { t } = useI18n({ useScope: 'global' })
    const tableP2PSpread = ref(null)
    const priceType = ref([
        { title: computed(() => { return t('p2pSpread.typePrice.one') }), value: "ONE" },
        { title: computed(() => { return t('p2pSpread.typePrice.three') }), value: "THREE" },
        { title: computed(() => { return t('p2pSpread.typePrice.five') }), value: "FIVE" },
        { title: computed(() => { return t('p2pSpread.typePrice.ten') }), value: "TEN" },
    ])
    const exchanges = ref([])
    const coins = ref([])
    const fiats = ref([])
    const selectedExchange = ref(null)
    const selectedFiat = ref(null)
    const selectedCoin = ref(null)
    const selectedPrice = ref("ONE")
    //getters
    //const count = computed(() => test.value.length)



    //actions
    function chooseExchange(exchange) {
        if (selectedExchange.value != exchange) {
            tableP2PSpread.value = null
            selectedExchange.value = exchange
        }

    }
    function chooseCoin(coin) {
        if (selectedCoin.value != coin) {
            tableP2PSpread.value = null
            selectedCoin.value = coin
        }
    }
    function chooseFiat(fiat) {
        if (selectedFiat.value != fiat) {
            tableP2PSpread.value = null
            selectedFiat.value = fiat
        }
    }
    function choosePrice(price) {
        selectedPrice.value = price
    }

    async function p2pSpreadPrices() {
        try {
            const payload = {
                "coin": selectedCoin.value,
                "fiat": selectedFiat.value,
                "exchange": selectedExchange.value,
                "priceType": selectedPrice.value || "ONE"
            }
            const response = await P2PSpreadService.p2pSpreadPrices(payload)
            tableP2PSpread.value = response
        }
        catch (e) {
            console.log(e)
        }
    }
    async function p2pFilterPrices() {
        try {
            const payload = {
                "exchange": selectedExchange.value,
                "fiat": selectedFiat.value,
            }
            const response = await P2PSpreadService.p2pFilterPrices(payload)
            exchanges.value = response.exchanges
            coins.value = response.coins
            fiats.value = response.fiats

            if (!fiats.value.find(item => item == selectedFiat.value)) selectedFiat.value = null
            if (!coins.value.find(item => item == selectedCoin.value)) selectedCoin.value = null

            if (selectedExchange.value && selectedFiat.value && selectedCoin.value) p2pSpreadPrices()
        }
        catch (e) {
            console.log(e)
        }
    }

    return {
        tableP2PSpread, priceType, exchanges, coins, fiats, selectedExchange, selectedFiat, selectedCoin, selectedPrice,

        chooseExchange, chooseCoin, choosePrice, chooseFiat,

        p2pSpreadPrices, p2pFilterPrices
    }
})
