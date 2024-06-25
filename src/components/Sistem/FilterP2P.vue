<template>
    <div class="filterP2P">
        <ProfileFilters :profileFilter="profileFilter" />
        <div class="filters">
            <Filter :name="$t('filter.filterP2P.currency.title')" :filterValue="filterP2P.currency.value"
                :placeholder="$t('filter.filterP2P.currency.placeholder')" :allBtn="false" :singleСhoice="true"
                @change-single-choise="(name) => changeSingleChoise(filterP2P.currency.value, name)" :icon="true"
                @del-tag="(id) => delTag(filterP2P.currency, id)" :required="true" typeIcon="fiat" :selectedFilter="selectedFilter"/>
            <Filter :name="$t('filter.filterP2P.exchanges.title')" :filterValue="filterP2P.exchenge.value"
                :placeholder="$t('filter.filterP2P.exchanges.placeholder')" :icon="true" :selectedFilter="selectedFilter"
                @del-tag="(id) => delTag(filterP2P.exchenge, id)" :required="true" typeIcon="exchanges" />
            <Filter :name="$t('filter.filterP2P.paymentSystems.title')" :filterValue="filterP2P.paySystem.value"
                :placeholder="$t('filter.filterP2P.paymentSystems.placeholder')" :icon="true" :length="false"
                @del-tag="(id) => delTag(filterP2P.paySystem, id)" typeIcon="bank" :selectedFilter="selectedFilter"/>
            <Filter :name="$t('filter.filterP2P.cryptocurrency.title')" :filterValue="filterP2P.cryptoCurrency.value"
                :placeholder="$t('filter.filterP2P.cryptocurrency.placeholder')" :icon="true" :selectedFilter="selectedFilter"
                @del-tag="(id) => delTag(filterP2P.cryptoCurrency, id)" :required="true" typeIcon="crypto" />
            <FilterTradingMethod :selectedFilter="selectedFilter"/>
            <FilterDep v-model="filterP2P.deposit" :name="$t('filter.filterP2P.deposit')" :size="TABLE_SELL_SIZE.L"
                placeholder="1 000 000" :currency="currency" :selectedFilter="selectedFilter"/>
            <FilterAdditional :selectedFilter="selectedFilter"/>
            <Delite @click="resetFilter" class="cursor" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { Filter, FilterDep, FilterAdditional, FilterTradingMethod } from '../Filters';
import { storeFilter } from '../../stores/filter.store'
import { storeUser } from '../../stores/user.store';
import { TABLE_SELL_SIZE } from '../../constants/enum';
import ProfileFilters from '../Filters/ProfileFilters/ProfileFilters.vue';
import { Delite } from '../Icons';

const userStore = storeUser()
const filterStore = storeFilter()
const { filterP2P } = storeToRefs(filterStore)
const { t } = useI18n({ useScope: 'global' })
const profileFilter = computed(() => {
    return userStore.userFiltersP2P.map(i => {
        return {
            ...i,
            edited: false,
        }
    })
});
const currency = computed(() => {
    return filterP2P.value.currency.value.filter(i => i.checked)[0]?.name || ''
});
const selectedFilter = computed(() => {
    return filterStore.selectedUserFilterP2P?.filterName
});

function resetFilter() {
    filterStore.resetFilterP2P()
}
function changeSingleChoise(filter, name) {
    for (let i of filter) {
        i.checked = i.name === name
    }
}
function delTag(name, id) {
    filterStore.delTeg(name.name, id)
}
</script>

<style lang="scss" scoped>

.filterP2P {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
}

.filters {
    display: flex;

    gap: 16px;
    flex-wrap: wrap;

    @media screen and (max-width: 900px) {
        display: none;
    }
}




.cursor {
    cursor: pointer;
}
</style>