<template>
    <div class="mobile-filter" ref="filterRef">
        <!--        <div class="mobile-filter__btn" @click="showFilters">-->
        <!--            <span>{{ $t('filter.mobileFilterTitle') }}</span>-->
        <FilterI @click="showFilters" />
        <!--        </div>-->
        <div class="mobile-filter__modal" :class="{ 'mobile-filter__modal_active': toggleFilters }">
            <div class="mobile-filter__modal_title"><span class="center">{{ $t('filter.mobileFilterSubtitle1') }}
                    <DeleteSmoll @click="resetFilter" />
                </span>
                 <Close @click="closeFilters" />
            </div>
            <Filter :name="$t('filter.filterSpot.exchangePurchases.title')" :filterValue="filterSpot.buyExchange.value"
                :placeholder="$t('filter.filterSpot.exchangePurchases.placeholder')"
                @del-tag="(id) => delTag(filterSpot.buyExchange, id)" :icon="true" typeIcon="exchanges" :toTop="true" />
            <Filter :name="$t('filter.filterSpot.salesExchanges.title')" :filterValue="filterSpot.saleExchange.value"
                :placeholder="$t('filter.filterSpot.salesExchanges.placeholder')" :toTop="true"
                @del-tag="(id) => delTag(filterSpot.saleExchange, id)" :icon="true" typeIcon="exchanges" />
            <FilterFromTo :title="$t('filter.filterSpot.spread')" v-model="filterSpot.spred" size="s" />
            <div class="filters__hide-illiquid">
                <Checkbox :title="$t('filter.filterSpot.hideIlliquid')" v-model="filterSpot.hideIlliquid" />
            </div>
            <div class="filters__update">
                <label class="filters__update_title">{{ $t('filter.filterP2P.additionalFilters.dataUpdate') }}</label>
                <div class="filters__update_btn">
                    <input type="radio" name="time" :value="null" id="radio∞" v-model="timeUpdateSpot"
                        class="filters__update_radio-btn">
                    <label for="radio∞" class="filters__update_label border_l">∞</label>
                    <input type="radio" name="time" value="5000" id="radio5" v-model="timeUpdateSpot"
                        class="filters__update_radio-btn">
                    <label for="radio5" class="filters__update_label">5</label>
                    <input type="radio" name="time" value="10000" id="radio10" v-model="timeUpdateSpot"
                        class="filters__update_radio-btn">
                    <label for="radio10" class="filters__update_label">10</label>
                    <input type="radio" name="time" value="30000" id="radio30" v-model="timeUpdateSpot"
                        class="filters__update_radio-btn">
                    <label for="radio30" class="filters__update_label border_r">30</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { storeToRefs } from 'pinia'
import { storeFilter } from '../../../stores/filter.store'
import { Filter, FilterFromTo } from '..';
import { Checkbox } from '../../UI'
import { FilterI, Close, DeleteSmoll, ArrowUp, ArrowDown } from '../../Icons';
import clickOutside from "../../../directives/clickOutSide";


const filterStore = storeFilter()
const { filterSpot, timeUpdateSpot } = storeToRefs(filterStore)
const toggleFilters = ref(false)
const filterRef = ref(null);

clickOutside(filterRef, closeFilters);

function showFilters() {
    toggleFilters.value = true
}
function closeFilters() {
    toggleFilters.value = false
}
function resetFilter() {
    filterStore.resetFilterSpot()
}
function delTag(name, id) {
    filterStore.delTeg(name.name, id)
}
</script>

<style lang="scss" scoped>
.mobile-filter {
    display: none;

    @media screen and (max-width: 900px) {
        display: block;
        margin-top: 10px;
    }

    &__btn {
        display: flex;
        height: 40px;
        padding: 8px 12px;
        justify-content: space-between;
        align-items: center;
        color: #828D96;
        font-size: 14px;
        font-weight: 500;
        border-radius: 8px;
        border: 1px solid #EAECF0;
        background: #FFF;
        cursor: pointer;
    }

    &__modal {
        position: fixed;
        bottom: -100%;
        left: 0;
        width: 100%;
        background: #fff;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        z-index: 3;
        transition: bottom 0.5s ease;
        box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);


        &_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &_active {
            bottom: 66px;
        }
    }
}

.filters {
    &__update {
        display: flex;
        align-items: center;
        gap: 6px;
        border: 1px solid #EAECF0;
        border-radius: 8px;
        color: #828D96;
        font-size: 14px;
        font-weight: 500;
        padding: 0px 12px;

        &_btn {
            height: 32px;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }

        &_radio-btn {
            display: none;
        }

        &_label {
            width: 100%;
            padding: 0px 6px;
            display: flex;
            justify-content: center;
            height: 100%;
            align-items: center;
            cursor: pointer;
            border: 1px solid #EAECF0;
        }
    }
}

.center {
    display: flex;
    gap: 10px;
    align-items: center;
}

input[type='radio']:checked+label {
    color: #FFF;
    font-size: 14px;
    font-weight: 500;
    background: #4D80EF;
    border-color: #4D80EF;
}

.border {
    &_l {
        border-radius: 12px 0px 0px 12px;
    }

    &_r {
        border-radius: 0px 12px 12px 0px;
    }
}

.mobile-filter__modal::-webkit-scrollbar {
    width: 6px;
}

.mobile-filter__modal::-webkit-scrollbar-track {
    width: 6px;
    border-radius: 10px;
    background: #f8fafc;
}

.mobile-filter__modal::-webkit-scrollbar-thumb {
    width: 6px;
    border-radius: 10px;
    background: #eaf0fb;
}
</style>