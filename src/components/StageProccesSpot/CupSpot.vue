<template>
    <div class="cup">
        <div class="cup__btn" @click="hideDialog">
            <div class="cup__title">{{ $t('stepProcces.cup.title') }}</div>
            <ArrowUpBold v-if="isShow" />
            <ArrowDownBold v-else />
        </div>
        <div class="cup__content" v-if="isShow">
            <div class="cup__row">
                <div class="cup__subtitle cup__subtitle_l">
                  <IconText typeIcon="exchanges" :name="cup.exchangeBuy" :length="true" />
                </div>
                <div class="cup__subtitle cup__subtitle_s">
                  <IconText typeIcon="crypto" :name="cup.fromCoin" />
                  <IconText typeIcon="crypto" :name="cup.toCoin" />
                </div>
                <div class="cup__subtitle cup__subtitle_l">
                  <IconText typeIcon="exchanges" :name="cup.exchangeSale" />
                </div>
            </div>
            <div class="cup__table">
                <div class="cup__row" v-for="(row, i) in count">
                    <div class="cup__column_left">
                        <div class="cup_cell cup_cell_price">{{ asks[i]?.price  + " " + cup.toCoin}}</div>
                        <div class="cup_cell cup_cell_volume">{{ asks[i]?.volume + $t('stepProcces.cup.count') }}</div>
                        <div class="cup_cell cup_cell_equivalent">{{ '~' + (asks[i]?.price * asks[i]?.volume).toFixed(2) + ' ' + cup.toCoin }}</div>
                    </div>
                    <div class="center">
                        <div class="cup__center" :class="{
                            'cup__center_red': ((100 / asks[i]?.price) * (bids[i]?.price - asks[i]?.price)) < 0
                        }">
                            {{ spread(asks[i],bids[i]).toLocaleString()/*((100 / asks[i]?.price) * (bids[i]?.price - asks[i]?.price)).toLocaleString()*/ + "%" }}
                        </div>
                    </div>
                    <div class="cup__column_right">
                        <div class="cup_cell cup_cell_price">{{ bids[i]?.price  + " " + cup.toCoin}}</div>
                        <div class="cup_cell cup_cell_volume">{{ bids[i]?.volume + ' ' + $t('stepProcces.cup.count')}}</div>
                        <div class="cup_cell cup_cell_equivalent">{{ '~' + (bids[i]?.price * bids[i]?.volume).toFixed(2) + ' ' + cup.toCoin  }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeFilter } from '../../stores/filter.store';
import { storeTable } from '../../stores/table.store';
import { ArrowUpBold, ArrowDownBold } from '../Icons';
import IconText from "../Sistem/IconText.vue";

const filterStore = storeFilter()
const tableStore = storeTable()
const isShow = ref(false)
const { t } = useI18n({ useScope: 'global' })
const cup = computed(() => {
    return filterStore.cupSpot
})

const count = computed(() => {
    if (cup.value.asks.length > cup.value.bids.length) return cup.value.bids.length
    else return cup.value.asks.length
})

const asks = computed(() => {
    return cup.value.asks.sort((a, b) => a.price > b.price ? 1 : -1)
})
const bids = computed(() => {
    return cup.value.bids.sort((a, b) => a.price > b.price ? -1 : 1)
})

function hideDialog() {
    isShow.value = !isShow.value
}
function spread(ask,bid){
    return tableStore.spreadForCup(ask.price,bid.price)
}
</script>

<style lang="scss" scoped>
.cup {
    margin-top: 16px;
    background-color: #F8FAFC;
    user-select: none;
    width: 100%;
    color: #272D37;
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 14px;
    padding: 16px;

    @media screen and (max-width: 900px) {
        display: none;
    }

    &__btn {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        height: 50px;
        align-items: center;
    }

    &__title {
        font-size: 16px;
        font-weight: 600;

    }

    &__content {
        display: flex;
        flex-direction: column;
    }

    &__subtitle {
        text-align: center;
        border-radius: 10px;
        background: #F0F5FF;
        font-size: 16px;
        font-weight: 600;
        padding: 5px;

        &_s {
            display: flex;
            gap: 5px;
        }

        &_l {
            width: 150px;
            display: flex;
            justify-content: center;
        }
    }

    &__title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
    }

    &__row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 8px;
        border-bottom: 1px solid #ECECEC;
    }

    &_cell {
        font-size: 14px;
        font-weight: 400;
        border-radius: 10px;
        padding: 1px 4px;
        margin-bottom: 2px;

        &_title {
            font-weight: 500;
        }

        &_price {
          background: rgba(240, 245, 255, 0.9);
        }

        &_volume {
          background: rgba(197, 10, 10, 0.05);
        }

        &_equivalent {
          font: small-caption;
          font-size: small;
          background: #FFF;
        }
    }

    &__center {
        width: 25%;
        font-size: 16px;
        font-weight: 500;
        color: #2BAD63;

        &_red {
            color: #DA4040;
        }
    }

    &__column {
        display: flex;

        &_left {
          display: flex;
          width: 40%;
          padding: 1px 4px;
          color: #272D37;
          font-size: 12px;
          font-weight: 400;
          border-radius: 5px;
          flex-direction: column;
          align-items: flex-start;
        }

        &_right {
          display: flex;
          width: 40%;
          padding: 1px 4px;
          color: #272D37;
          font-size: 12px;
          font-weight: 400;
          border-radius: 5px;
          flex-direction: column;
          align-items: flex-end;
        }
    }

    &__table {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
}

.center {
    display: flex;
    text-align: center;
    font-size: 14px;
    font-weight: 600;

}
</style>