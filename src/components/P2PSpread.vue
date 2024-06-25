<template>
    <Wrapper>
        <div class="p2p-spread">
            <div class="spread__filter">
                <div class="spread__filter_title">{{ $t('p2pSpread.title.exchange') }}</div>
                <div class="spread__filter_coin">
                    <div class="spread__coin" :class="{ 'spread__coin_selected': selectedExchange == exchange }"
                        v-for="exchange of exchanges" @click="chooseExchange(exchange)">
                        <IconText :name="exchange" typeIcon="exchanges" />
                    </div>
                </div>
            </div>
            <div class="spread__filter">
                <div class="spread__filter_title">{{ $t('p2pSpread.title.currency') }}</div>
                <div class="spread__filter_coin">
                    <div class="spread__coin" :class="{ 'spread__coin_selected': selectedFiat == fiat }"
                        v-for="fiat of fiats" @click="chooseFiat(fiat)">
                        <IconText :name="fiat" typeIcon="fiat" />
                    </div>
                </div>
                <div class="spread__filter_comment" v-if="fiats.length == 0">{{ $t('p2pSpread.coment.exchange') }}</div>
            </div>
            <div class="spread__filter">
                <div class="spread__filter_title">{{ $t('p2pSpread.title.coin') }}</div>
                <div class="spread__filter_coin">
                    <div class="spread__coin" :class="{ 'spread__coin_selected': selectedCoin == coin }"
                        v-for="coin of coins" @click="chooseCoin(coin)">
                        <IconText :name="coin" typeIcon="crypto" />
                    </div>
                </div>
                <div class="spread__filter_comment" v-if="coins.length == 0">{{ $t('p2pSpread.coment.currency') }}</div>
            </div>
            <div class="spread__filter">
                <div class="spread__filter_title">{{ $t('p2pSpread.title.priceType') }}</div>
                <div class="spread__filter_coin">
                    <div class="spread__coin" :class="{ 'spread__coin_selected': selectedPrice == price.value }"
                        v-for="price of priceType" @click="choosePrice(price.value)">
                        <IconText :name="price.title" />
                    </div>
                </div>
            </div>
            <div class="spread__table">
                <Table>
                    <Row :is-header="true" class="spread__table_row">
                        <Cell class="cell__size_xl">Платежный метод</Cell>
                        <Cell class="cell__size_l">Покупка</Cell>
                        <Cell class="cell__size_l">Продажа</Cell>
                        <Cell class="cell__size_l">Спред</Cell>
                        <Cell class="cell__size_l">Спред, %</Cell>
                        <Cell class="cell__size_s">Кол-во</Cell>
                        <Cell class="cell__size_xs">Всего</Cell>
                    </Row>
                    <Row v-for="row of tableP2PSpread" class="spread__table_row">
                        <Cell class="cell__size_xl">
                            <IconText :name="row.paymentMethod" typeIcon="bank" />
                        </Cell>
                        <Cell class="cell__size_l">{{ row.buyPrice !== 0 ? row.buyPrice + ' ' + selectedFiat : '-' }}</Cell>
                        <Cell class="cell__size_l">{{ row.sellPrice !== 0 ? row.sellPrice + ' ' + selectedFiat : '-' }}</Cell>
                        <Cell class="cell__size_l">{{ row.priceSpread !== 0 ? row.priceSpread + ' ' + selectedFiat : '-' }}</Cell>
                        <Cell class="cell__size_l">
                            <div class="wrap" :class="(row.percentSpread > 0 ? 'wrap_green' : row.percentSpread < 0 ? 'wrap_red' : '')">
                                {{ row.percentSpread !== 0 ? row.percentSpread.toFixed(2) + '%' : '-' }}
                            </div>
                        </Cell>
                        <Cell class="cell__size_s">{{ row.countBuy + ' - ' + row.countSell }}</Cell>
                        <Cell class="cell__size_xs">{{ row.countOrders }}</Cell>
                    </Row>
                </Table>
            </div>
        </div>
    </Wrapper>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia';
import Wrapper from './Sistem/Wrapper.vue';
import IconText from './Sistem/IconText.vue';
import { Table, Row, Cell } from './UI';
import { storeP2PSpread } from '../stores/p2pSpread.store'
import { useI18n } from 'vue-i18n'

const p2pSpreadStore = storeP2PSpread()
const { exchanges, coins, fiats, selectedExchange, selectedFiat, selectedCoin, selectedPrice, tableP2PSpread } = storeToRefs(p2pSpreadStore)
const { t } = useI18n({ useScope: 'global' })
const timerIntervalP2PSpread = ref(null)

const priceType = computed(() => {
    return p2pSpreadStore.priceType
})

function chooseFiat(fiat) {
    p2pSpreadStore.chooseFiat(fiat)
}
function chooseExchange(exchange) {
    p2pSpreadStore.chooseExchange(exchange)
}
function chooseCoin(coin) {
    p2pSpreadStore.chooseCoin(coin)
}
function choosePrice(price) {
    p2pSpreadStore.choosePrice(price)
}
function p2pSpreadPrices() {
    p2pSpreadStore.p2pSpreadPrices()
    startInterval()
}
function startInterval(){
    if(!timerIntervalP2PSpread.value) timerIntervalP2PSpread.value = setInterval(p2pSpreadPrices, 5000)
}
function stopInterval(){
    clearInterval(timerIntervalP2PSpread.value)
    timerIntervalP2PSpread.value = null
}

onMounted(() => {
    p2pSpreadStore.p2pFilterPrices()
})

watch(selectedCoin, () => {
    if (selectedFiat.value && selectedExchange.value && selectedCoin.value) p2pSpreadPrices()
    else {
        if(!!timerIntervalP2PSpread.value) stopInterval()
    }
})
watch(selectedPrice, () => {
    if (selectedFiat.value && selectedExchange.value && selectedCoin.value) p2pSpreadPrices()
    else {
        if(!!timerIntervalP2PSpread.value) stopInterval()
    }
})
watch(selectedExchange, () => {
    p2pSpreadStore.p2pFilterPrices()
})
watch(selectedFiat, () => {
    p2pSpreadStore.p2pFilterPrices()
})
</script>

<style scoped lang="scss">
.p2p-spread {
    user-select: none;
    display: flex;
    flex-direction: column;
    gap: 24px;
    font-size: 14px;
}

.spread {
    &__filter {
        background: #fff;
        border-radius: 10px;
        padding: 15px;
        gap: 10px;
        align-items: center;
        -webkit-box-shadow: 4px 4px 31px -8px rgba(34, 60, 80, 0.15);

        &_title {
            margin-top: -20px;
            width: 15%;
            min-width: 70px;
            margin-bottom: 10px;
            font-weight: 400;
            font-size: 16px;
            color: var(--blue-main);
        }

        &_coin {
            display: flex;
            flex-wrap: wrap;
            gap: 16px;

        }
        &_comment {
          color: #828d96;
        }
    }

    &__table {
        margin-bottom: 70px;

        &_row {
            justify-content: space-between;
        }
    }


    &__coin {
        background: rgba(228, 235, 251, 0.9);
        padding: 5px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;

      &_selected {
            background: -webkit-gradient(linear, left top, left bottom, from(#25ecffc2), to(rgb(37 152 247 / 43%)));
        }
    }
}

.spread__table_row:hover {
    border-radius: 10px;
    background: rgba(77, 128, 239, 0.16);
}

.spread__table_row:nth-child(even) {
    border-radius: 10px;
    background: #F8FAFC;

    &:hover {
        background: rgba(77, 128, 239, 0.16);
    }
}


.cell {
    &__size {
        &_xl {
            width: 20%;
            white-space: wrap !important;
        }

        &_l {
            width: 13%;
        }

        &_s {
            width: 10%;
        }
        &_xs {
            width: 7%;
        }
    }
}

.wrap {
    min-width: 70%;
    width: fit-content;
    padding: 8px 6px 8px 6px;
    border-radius: 4px;
    gap: 10px;
    text-align: center;
    font-weight: 500;

    &_green {
        background: rgba(212, 234, 216, 0.6);
        color: #2BAD63;
    }

    &_red {
        background: rgba(234, 212, 230, 0.6);
        color: #DA4040;
    }
}
</style>