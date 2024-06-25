<template>
    <div class="icon-text">
        <img :src="testImg" class="icon_icon" v-if="typeIcon">
        <!--<component class="icon_icon" :is="BANK[props.name]|| STOCK[props.name]||CRYPTO[props.name]||LANGUAGE[props.name]"
            v-if="BANK[props.name] || STOCK[props.name] || CRYPTO[props.name] || LANGUAGE[props.name]">
        </component>-->
        <div class="icon" v-else>{{ name?.charAt(0) }}</div>
        <div class="" v-if="spot && showText">
            <a :href="link" target="_blank">{{ name }}</a>
        </div>
        <div class="" v-else-if="showText">
            <div class="" v-if="!length">
                <div class="">{{ name }}</div>
            </div>
            <div class="" v-else>
                <div class="text" v-if="name.length > 9" @mouseenter="toggleShowName" @mouseleave="toggleShowName">{{
                    name.substring(0,
                        9) + '...'
                }}
                </div>
                <div class="" v-else>{{ name }}</div>
                <div class="name" v-show="showName">{{ name }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { BANK, STOCK, CRYPTO, LANGUAGE } from '../../constants/enum';

const showName = ref(false)
const props = defineProps({
    name: {
        type: String
    },
    spot: {
        type: Boolean
    },
    toCoin: {
        type: String
    },
    fromCoin: {
        type: String
    },
    length: {
        type: Boolean
    },
    typeIcon: {
        type: String
    },
    showText: {
        type: Boolean,
        default: true
    }
})
const link = computed(() => {
    if (props.name == "KUCOIN") return "https://www.kucoin.com/ru/trade/" + props.fromCoin + "-" + props.toCoin
    if (props.name == "BINANCE") return "https://www.binance.com/ru/trade/" + props.fromCoin + "_" + props.toCoin + "?theme=dark&type=spot"
    if (props.name == "OKX") return "https://www.okx.com/ru/trade-spot/" + props.fromCoin + "-" + props.toCoin
    if (props.name == "BYBIT") return "https://www.bybit.com/ru-RU/trade/spot/" + props.fromCoin + "/" + props.toCoin
    if (props.name == "KRAKEN") return "https://pro.kraken.com/app/trade/" + props.fromCoin + "-" + props.toCoin
    if (props.name == "HUOBI") return "https://www.huobi.com/ru-ru/trade/" + props.fromCoin.toLowerCase() + "_" + props.toCoin.toLowerCase() + "/?type=spot"
    if (props.name == "MEXC") return "https://www.mexc.com/ru-RU/exchange/" + props.fromCoin + "_" + props.toCoin
    if (props.name == "BITGET") return "https://www.bitget.com/ru/spot/" + props.fromCoin + props.toCoin
})
const testImg = computed(() => {
    const url = import.meta.env.VITE_IMG_URL
    if (props.name == 'ru') return url + '/' + props.typeIcon + '/RUB.svg'
    if (props.name == 'en') return url + '/' + props.typeIcon + '/GBP.svg'
    if (CRYPTO[props.name]) return url + '/' + props.typeIcon + '/' + CRYPTO[props.name] + '.svg'
    if (props.name) {
        return url + '/' + props.typeIcon + '/' + props.name.toUpperCase() + '.svg'
    }
})
function toggleShowName() {
    showName.value = !showName.value
}
</script>

<style lang="scss" scoped>
.icon {
    min-width: 20px;
    min-height: 20px;
    width: 20px;
    height: 20px;
    border: 1px solid #828D96;
    border-radius: 50%;
    text-align: center;
    color: #828D96;
    font-size: 12px;
    font-weight: 600;

    &_icon {
        border: none;
        min-width: 20px;
        min-height: 20px;
        max-width: 20px;
        max-height: 20px;
    }
}

.icon-text {
    display: flex;
    align-items: center;
    gap: 6px;
}

.name {
    display: block;
    z-index: 1;
    position: absolute;
    background: white;
    color: #272D37;
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #828D96;
    padding: 0px 5px;
    text-align: center;
    border-radius: 10px;
    transform: translate(0px, 0px)
}
</style>