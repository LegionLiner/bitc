<template>
    <div class="cup">
        <div class="cup__btn" @click="hideDialog">
            <div class="cup__title">Стакан</div>
            <ArrowUpBold v-if="isShow" />
            <ArrowDownBold v-else />
        </div>
        <div class="cup__content" v-if="isShow">
            <div class="cup__row">
                <div class="cup__subtitle cup__subtitle_l">{{ cup.exchangeBuy }}</div>
                <div class="cup__subtitle cup__subtitle_s">{{ cup.fromCoin }} - {{ cup.toCoin }}</div>
                <div class="cup__subtitle cup__subtitle_l">{{ cup.exchangeSale }}</div>
            </div>
            <div class="cup__table">
                <div class="cup__row">
                    <div class="cup__column ">
                        <div class="cup_cell cup_cell_title">Цена</div>
                        <div class="cup_cell cup_cell_title">Количество</div>
                    </div>
                    <div class="cup__column center">
                        <div class="cup_cell cup_cell_title">Спред, %</div>
                    </div>
                    <div class="cup__column ">
                        <div class="cup_cell cup_cell_title">Цена</div>
                        <div class="cup_cell cup_cell_title">Количество</div>
                    </div>
                </div>
                <div class="cup__row" v-for="(row, i) in asks">
                    <div class="cup__column ">
                        <div class="cup_cell">{{ asks[i].price }}</div>
                        <div class="cup_cell">{{ asks[i].volume }}</div>
                    </div>
                    <div class="cup__column center">
                        <div class="cup_cell">{{ ((100 / bids[i].price) * (bids[i].price - asks[i].price)).toLocaleString()
                        }}</div>
                    </div>
                    <div class="cup__column ">
                        <div class="cup_cell">{{ bids[i].price }}</div>
                        <div class="cup_cell">{{ bids[i].volume }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeFilter } from '../../stores/filter.store';
import { ArrowUpBold, ArrowDownBold } from '../Icons';

const filterStore = storeFilter()
const isShow = ref(false)
const cup = computed(() => {
    return filterStore.cupSpot
})

const asks = computed(() => {
    /*return cup.value.asks.sort((a, b) => a.price > b.price ? 1 : -1)*/
})
const bids = computed(() => {
    /*return cup.value.bids.sort((a, b) => a.price > b.price ? -1 : 1)*/
})

function hideDialog() {
    isShow.value = !isShow.value
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
    border-radius: 12px;
    padding: 0px 24px;

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
        padding: 8px 10px;
        text-align: center;
        border-radius: 200px;
        background: #FFF;

        &_s {
            width: 120px;
        }

        &_l {
            width: 150px;
        }
    }

    &__row {
        display: flex;
        justify-content: space-between;
    }

    &_cell {
        width: 75px;
        font-size: 14px;
        font-weight: 500;

        &_title {
            color: #828D96;
            font-size: 12px;
            font-weight: 500;
        }
    }

    &__column {
        display: flex;
    }

    &__table {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
}

.center {
    text-align: center;
    color: #2BAD63;
    font-size: 14px;
    font-weight: 600;
}
</style>