<template>
    <div ref="filterRef" class="mobile-filter">
        <FilterI @click="showFilters" />
        <div class="mobile-filter__modal" :class="{ 'mobile-filter__modal_active': toggleFilters }">
            <div class="mobile-filter__modal_title"><span class="center">{{ $t('filter.mobileFilterSubtitle1') }}
                    <DeleteSmoll @click="resetFilter" />
                </span>
                <Close @click="closeFilters" />
            </div>
            <Filter :name="$t('filter.filterP2P.currency.title')" :filterValue="filterP2P.currency.value"
                :placeholder="$t('filter.filterP2P.currency.placeholder')" :allBtn="false" :singleСhoice="true"
                @change-single-choise="(name) => changeSingleChoise(filterP2P.currency.value, name)"
                @del-tag="(id) => delTag(filterP2P.currency, id)" :required="true" :icon="true" typeIcon="fiat" />
            <Filter :name="$t('filter.filterP2P.exchanges.title')" :filterValue="filterP2P.exchenge.value"
                :placeholder="$t('filter.filterP2P.exchanges.placeholder')"
                @del-tag="(id) => delTag(filterP2P.exchenge, id)" :required="true" typeIcon="exchanges" />
            <Filter :name="$t('filter.filterP2P.paymentSystems.title')" :filterValue="filterP2P.paySystem.value"
                :placeholder="$t('filter.filterP2P.paymentSystems.placeholder')"
                @del-tag="(id) => delTag(filterP2P.paySystem, id)" :required="true" typeIcon="bank" />
            <Filter :name="$t('filter.filterP2P.cryptocurrency.title')" :filterValue="filterP2P.cryptoCurrency.value"
                :placeholder="$t('filter.filterP2P.cryptocurrency.placeholder')"
                @del-tag="(id) => delTag(filterP2P.cryptoCurrency, id)" :required="true" typeIcon="crypto" />
            <FilterTradingMethod :mobile="true" />
            <FilterDep v-model="filterP2P.deposit" :name="$t('filter.filterP2P.deposit')" :size="TABLE_SELL_SIZE.XL"
                placeholder="1 000 000" :mobile="true" />
            <div class="mobile-filter__modal_title" @click="toggleAdditionalFilters">
                {{ $t('filter.filterP2P.additionalFilters.title') }}
                <ArrowUp v-if="showAdditionalFilters" />
                <ArrowDown v-else />
            </div>
            <div class="mobile-filter__modal_additional" v-if="showAdditionalFilters">
                <div class="mobile-filter__block">
                    <div class="mobile-filter__block_title">{{
            $t('filter.filterP2P.additionalFilters.bundleParameters.title') }}
                    </div>
                    <div>
                        <FilterFromTo :title="$t('filter.filterP2P.additionalFilters.bundleParameters.spread')"
                            v-model="filterP2P.additionalFilters.spred" size="s" :limit=true />
                    </div>
                    <div>
                        <FilterFromTo :title="$t('filter.filterP2P.additionalFilters.bundleParameters.limit')"
                            v-model="filterP2P.additionalFilters.limit" size="s" />
                    </div>
                    <div class="mobile-filter__semiblock">
                        <div class="modal__semiblock_title">
                            {{ $t('filter.filterP2P.additionalFilters.bundleParameters.numberActions.title') }}</div>
                        <RadioButton
                            :title="$t('filter.filterP2P.additionalFilters.bundleParameters.numberActions.twoActions')"
                            name="moves" v-model="filterP2P.additionalFilters.moves" value="twoActions" />
                        <RadioButton
                            :title="$t('filter.filterP2P.additionalFilters.bundleParameters.numberActions.threeActions')"
                            name="moves" v-model="filterP2P.additionalFilters.moves" value="threeActions" />
                    </div>
                    <div class="mobile-filter__semiblock">
                        <div class="modal__semiblock_title">
                            {{ $t('filter.filterP2P.additionalFilters.bundleParameters.buyingSelling.title') }}</div>
                        <RadioButton
                            :title="$t('filter.filterP2P.additionalFilters.bundleParameters.buyingSelling.all')"
                            name="purchase-sale" v-model="filterP2P.additionalFilters.purchaseSale" value="ALL" />
                        <RadioButton
                            :title="$t('filter.filterP2P.additionalFilters.bundleParameters.buyingSelling.interexchange')"
                            name="purchase-sale" v-model="filterP2P.additionalFilters.purchaseSale"
                            value="MULTI_EXCHANGE" />
                        <RadioButton
                            :title="$t('filter.filterP2P.additionalFilters.bundleParameters.buyingSelling.intraexchange')"
                            name="purchase-sale" v-model="filterP2P.additionalFilters.purchaseSale"
                            value="SINGLE_EXCHANGE" />
                    </div>
                </div>
                <div class="mobile-filter__block">
                    <div class="modal__block_title">{{ $t('filter.filterP2P.additionalFilters.merchantCriteria.title')
                        }}
                    </div>
                    <div class="modal__width_s">
                        <FilterDep v-model="filterP2P.additionalFilters.sumDeals" :size="TABLE_SELL_SIZE.S"
                            placeholder="0"
                            :name="$t('filter.filterP2P.additionalFilters.merchantCriteria.amountDeals')"
                            :from="true" />
                    </div>
                    <div class="modal__width_l">
                        <FilterDep v-model="filterP2P.additionalFilters.successfulTransactions"
                            :size="TABLE_SELL_SIZE.S" placeholder="0"
                            :name="$t('filter.filterP2P.additionalFilters.merchantCriteria.successfulTransactions')"
                            :from="true" />
                    </div>
                    <Checkbox :title="$t('filter.filterP2P.additionalFilters.merchantCriteria.onlyVerified')"
                        v-model="filterP2P.additionalFilters.provenMerchand" />
                </div>
            </div>
            <div class="filters__update">
                <label class="filters__update_title">{{ $t('filter.filterP2P.additionalFilters.dataUpdate') }}</label>
                <div class="filters__update_btn">
                    <input type="radio" name="time" :value="null" id="radio∞" v-model="timeUpdate"
                        class="filters__update_radio-btn">
                    <label for="radio∞" class="filters__update_label border_l">∞</label>
                    <input type="radio" name="time" value="5000" id="radio5" v-model="timeUpdate"
                        class="filters__update_radio-btn">
                    <label for="radio5" class="filters__update_label">5</label>
                    <input type="radio" name="time" value="10000" id="radio10" v-model="timeUpdate"
                        class="filters__update_radio-btn">
                    <label for="radio10" class="filters__update_label">10</label>
                    <input type="radio" name="time" value="30000" id="radio30" v-model="timeUpdate"
                        class="filters__update_radio-btn">
                    <label for="radio30" class="filters__update_label">30</label>
                    <input type="radio" name="time" value="60000" id="radio60" v-model="timeUpdate"
                        class="filters__update_radio-btn">
                    <label for="radio60" class="filters__update_label border_r">60</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { storeFilter } from '../../../stores/filter.store'
import { Filter, FilterTradingMethod, FilterDep, FilterFromTo } from '..';
import { Checkbox, RadioButton } from '../../UI'
import { TABLE_SELL_SIZE } from '../../../constants/enum';
import { FilterI, Close, DeleteSmoll, ArrowUp, ArrowDown } from '../../Icons';
import clickOutside from "../../../directives/clickOutSide";

const filterStore = storeFilter()
const { filterP2P, timeUpdate } = storeToRefs(filterStore)
const { t } = useI18n({ useScope: 'global' })
const toggleFilters = ref(false);
const showAdditionalFilters = ref(false);
const filterRef = ref(null);

clickOutside(filterRef, closeFilters);

function showFilters() {
    toggleFilters.value = true
}
function closeFilters() {
    toggleFilters.value = false
}
function toggleAdditionalFilters() {
    showAdditionalFilters.value = !showAdditionalFilters.value
}
function resetFilter() {
    filterStore.resetFilterP2P()
}
function changeSingleChoise(filter, name) {
    for (let i of filter) {
        i.checked = i.name == name
    }
}
function delTag(name, id) {
    filterStore.delTeg(name.name, id)
}
</script>

<style lang="scss" scoped>
.mobile-filter {
    display: none;
    vertical-align: middle;

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
        bottom: -170%;
        left: 0;
        width: 100%;
        background: #fff;
        padding: 14px;
        padding-bottom: 80px;
        display: flex;
        flex-direction: column;
        gap: 14px;
        z-index: 3;
        transition: bottom 0.8s ease;
        max-height: 500px;
        overflow: scroll;
        box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);

        @media (height < 630px) {
            max-height: 300px;
        }

        @media (height < 430px) {
            max-height: 200px;
        }

        &_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &_additional {
            display: flex;
            flex-direction: column;
            gap: 14px;

        }

        &_active {
            bottom: 50px;
        }
    }

    &__block {
        padding: 12px 8px;
        border-radius: 8px;
        background: #F8FAFC;
        display: flex;
        flex-direction: column;
        gap: 14px;
    }

    &__semiblock {
        display: flex;
        flex-direction: column;
        gap: 8px;
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
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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

input[type='radio']:checked+label {
    color: #FFF;
    font-size: 14px;
    font-weight: 500;
    background: #4D80EF;
    border-color: #4D80EF;
}

.center {
    display: flex;
    gap: 10px;
    align-items: center;
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
    width: 8px;
}

.mobile-filter__modal::-webkit-scrollbar-track {
    width: 8px;
    border-radius: 10px;
    background: #f8fafc;
}

.mobile-filter__modal::-webkit-scrollbar-thumb {
    width: 8px;
    border-radius: 10px;
    background: #eaf0fb;
}
</style>