<template>
    <div class="filterSpot">
        <ProfileFiltersSpot :profileFilter="profileFilter" />
        <div class="filters">
            <div class="filters__filter">
                <Filter :name="$t('filter.filterSpot.exchangePurchases.title')"
                    :filterValue="filterSpot.buyExchange.value"
                    :placeholder="$t('filter.filterSpot.exchangePurchases.placeholder')" :icon="true"
                    @del-tag="(id) => delTag(filterSpot.buyExchange, id)" typeIcon="exchanges"
                    :selectedFilter="selectedFilter" />
                <Filter :name="$t('filter.filterSpot.salesExchanges.title')"
                    :filterValue="filterSpot.saleExchange.value"
                    :placeholder="$t('filter.filterSpot.salesExchanges.placeholder')" :icon="true"
                    @del-tag="(id) => delTag(filterSpot.saleExchange, id)" typeIcon="exchanges"
                    :selectedFilter="selectedFilter" />
                <FilterFromTo :title="$t('filter.filterSpot.spread')" v-model="filterSpot.spred" size="s"
                    :selectedFilter="selectedFilter" :limit="true"/>
                <FilterUpdate :selectedFilter="selectedFilter" />
                <Checkbox :title="$t('filter.filterSpot.hideIlliquid')" v-model="filterSpot.hideIlliquid"
                    @update:modelValue="filterStore.editedFilters.add(selectedFilter)" />
                <Delite @click="resetFilter" class="cursor" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { Filter, FilterFromTo, FilterUpdate } from '../Filters';
import ProfileFiltersSpot from '../Filters/ProfileFiltersSpot/ProfileFiltersSpot.vue';
import { storeFilter } from '../../stores/filter.store'
import { storeUser } from '../../stores/user.store';
import { Checkbox } from '../UI';
import { Delite } from '../Icons';

const userStore = storeUser()
const filterStore = storeFilter()
const { filterSpot, timeUpdateSpot } = storeToRefs(filterStore)
const { t } = useI18n({ useScope: 'global' })
const profileFilter = computed(() => {
    return userStore.userFiltersSpot.map(i => {
        return {
            ...i,
            edited: false,
        }
    })
})
const selectedFilter = computed(() => {
    return filterStore.selectedUserFilterSpot?.filterName
});
const timeUpdate = ref(false)

function resetFilter() {
    filterStore.resetFilterSpot()
}
function delTag(name, id) {
    filterStore.delTeg(name.name, id)
}
</script>

<style lang="scss" scoped>
.filterSpot {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
}

.filters {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &__filter {
        width: 100%;
        display: flex;
        gap: 16px;
        justify-content: space-between;
        flex-wrap: wrap;
    }

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
            display: flex;
        }

        &_radio-btn {
            display: none;
        }

        &_label {
            width: 28px;
            padding: 0px 6px;
            display: flex;
            justify-content: center;
            height: 100%;
            align-items: center;
            cursor: pointer;
            border: 1px solid #EAECF0;
        }

        &_title {
            cursor: pointer;
        }
    }

    @media screen and (max-width: 900px) {
        display: none;
    }
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
        border-radius: 8px 0px 0px 8px;
    }

    &_r {
        border-radius: 0px 8px 8px 0px;
    }
}

.cursor {
    cursor: pointer;
}
</style>