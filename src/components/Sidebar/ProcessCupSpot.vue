<template>
    <BackGround v-if="isShow" @click="hidePopUp">
        <StepProcess :title="$t('stepProcces.cup.title')" @click.stop @hide-PopUp="hidePopUp"
            :class="{ 'translate': isShowSidebar }">
            <div class="cup-mobile">
                <div class="cup-mobile__title">
                    <div class="cup-mobile__row_title cell__size_m cell__center">{{ table.exchangeBuy }}</div>
                    <div class="cup-mobile__row_title cell__size_s cell__center">{{ table.fromCoin + "-" + table.toCoin }}
                    </div>
                    <div class="cup-mobile__row_title cell__size_m cell__center">{{ table.exchangeSale }}</div>
                </div>
                <div class="cup-mobile__row" v-for="(row, i) in asks">
                    <div class="cup-mobile__row_left cell__size_m">
                        <div class="cup-mobile__row_subtitle">{{ $t('stepProcces.cup.price') }}</div>
                        <div class="cup-mobile__row_price">{{ asks[i].price + " " + table.toCoin }}</div>
                        <div class="cup-mobile__row_quantity">{{ asks[i].volume + ' (~' + (asks[i].price * asks[i].volume).toFixed(2) + ' ' + table.toCoin + ')' }}
                        </div>
                    </div>
                    <div class="cup-mobile__row_center cell__size_s">
                        <div class="cup-mobile__row_subtitle cell__center">{{ $t('stepProcces.cup.spread') }}</div>
                        <div class="cup-mobile__row_spred" :class="{
                            'cup-mobile__row_spred_red': ((100 / asks[i].price) * (bids[i].price - asks[i].price)) < 0
                        }">{{ ((100 / asks[i].price) * (bids[i].price -
                            asks[i].price)).toLocaleString()
                            + "%"
                        }}</div>
                    </div>
                    <div class="cup-mobile__row_right cell__size_m">
                        <div class="cup-mobile__row_subtitle">{{ $t('stepProcces.cup.price') }}</div>
                        <div class="cup-mobile__row_price">{{ bids[i].price + " " + table.toCoin }}</div>
                        <div class="cup-mobile__row_quantity">{{ bids[i].volume + ' (~' + (bids[i].price * bids[i].volume).toFixed(2) + ' ' + table.toCoin + ')' }}
                        </div>
                    </div>
                </div>
            </div>
        </StepProcess>
    </BackGround>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { BackGround, StepProcess, } from '../UI';


const props = defineProps({
    table: {
        type: Object,
        required: true
    },
})
const { t } = useI18n({ useScope: 'global' })
const isShowSidebar = ref(false);
const isShow = ref(false)

function hidePopUp() {
    isShowSidebar.value = false;
    setTimeout(() => {
        isShow.value = false;
    }, 495)
    const bod = document.body
    bod.style.removeProperty('overflow');
}

function openPopUp() {
    isShow.value = true
    setTimeout(() => {
        isShowSidebar.value = true;
    }, 5)
}
const asks = computed(() => {
    return props.table.asks.sort((a, b) => a.price > b.price ? 1 : -1)
})
const bids = computed(() => {
    return props.table.bids.sort((a, b) => a.price > b.price ? -1 : 1)
})

defineExpose({
    open: openPopUp
})
</script>

<style lang="scss" scoped>
.cup-mobile {
    width: 100%;
    padding: 0px 14px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__title {
        display: flex;
        justify-content: space-between;
        padding-top: 8px;
    }

    &__row {
        display: flex;
        justify-content: space-between;
        padding-top: 8px;
        border-top: 1px solid #ECECEC;

        &_title {
            color: #000;
            font-size: 12px;
            font-weight: 500;
        }

        &_subtitle {
            color: var(--828D96, #828D96);
            font-size: 10px;
            font-weight: 500;
        }

        &_price {
            color: #272D37;
            font-size: 12px;
            font-weight: 500;
        }

        &_quantity {
            padding: 1px 4px;
            color: #272D37;
            font-size: 8px;
            font-weight: 600;
            border-radius: 5px;
            background: #ECECEC;
            align-items: flex-start;
        }

        &_spred {
            color: #2BAD63;
            font-size: 12px;
            font-weight: 600;
            display: flex;
            justify-content: center;

            &_red {
              color: #DA4040;
            }
        }

        &_right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }

        &_left {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
        }
    }
}

.cell {
    &__center {
        display: flex;
        justify-content: center;
    }

    &__size {
        &_s {
            width: 30%;
        }

        &_m {
            width: 35%;
        }
    }
}

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    width: 6px;
    border-radius: 10px;
    background: #F8FAFC;
}

::-webkit-scrollbar-thumb {
    width: 6px;
    border-radius: 10px;
    background: #EAF0FB;
}

.translate {
    transform: translateX(0%);
    transition: transform 500ms;
}
</style>