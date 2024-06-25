<template>
    <div class="filter" ref="filterRef">
        <div class="btn" @click="toggleShow" :class="{ btn_active: isShow, btn_choise: isChoise, btn_required: !isChoise, 'mobile': mobile }">
            <div class="btn_inner">
                <div class="btn__title">{{ $t('filter.filterP2P.tradingMethod.title') }}</div>
                <div class="trading_type">
                    {{ tradingTitle }}
                </div>
            </div>
            <div class="count">
                <ArrowUp v-if="isShow" />
                <ArrowDown v-else />
            </div>
        </div>
        <div class="modal" v-if="isShow">
            <div class="modal__title">
                <div class="">{{ $t('filter.filterP2P.tradingMethod.title') }}</div>
                <div class="modal__drop" @click="resetFilter">{{ $t('filter.reset') }}</div>
            </div>
            <div class="checkbox">
                <div class="checkbox__item">
                    <span class="checkbox__title">{{ $t('filter.filterP2P.tradingMethod.purchase') }}</span>
                    <Checkbox :title="$t('filter.filterP2P.tradingMethod.maker')" @update:modelValue="filterStore.editedFilters.add(selectedFilter);"
                        v-model="filterStore.filterP2P.tradingMethod.purchase.maker" />
                    <Checkbox :title="$t('filter.filterP2P.tradingMethod.taker')" @update:modelValue="filterStore.editedFilters.add(selectedFilter);"
                        v-model="filterStore.filterP2P.tradingMethod.purchase.taker" />
                </div>
                <div class="checkbox__item">
                    <span class="checkbox__title">{{ $t('filter.filterP2P.tradingMethod.sale') }}</span>
                    <Checkbox :title="$t('filter.filterP2P.tradingMethod.maker')" @update:modelValue="filterStore.editedFilters.add(selectedFilter);"
                        v-model="filterStore.filterP2P.tradingMethod.sale.maker" />
                    <Checkbox :title="$t('filter.filterP2P.tradingMethod.taker')" @update:modelValue="filterStore.editedFilters.add(selectedFilter);"
                        v-model="filterStore.filterP2P.tradingMethod.sale.taker" />
                </div>
            </div>
        </div>
        <BackGround v-if="isShow" @click="hideShow"></BackGround>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n'
import clickOutside from '../../directives/clickOutSide';
import { ArrowUp, ArrowDown } from '../Icons'
import { Checkbox, BackGround } from '../UI';
import { storeFilter } from '../../stores/filter.store'

const props = defineProps({
    mobile: {
        type: Boolean
    },
    selectedFilter: {
        type: String
    }
})
const filterStore = storeFilter()
const filterRef = ref(null);
const isShow = ref(false);
const { t } = useI18n({ useScope: 'global' })

clickOutside(filterRef, hideShow);

const isChoise = computed(() => {
    if (filterStore.filterP2P.tradingMethod.purchase.maker || filterStore.filterP2P.tradingMethod.purchase.taker) {
        if (filterStore.filterP2P.tradingMethod.sale.maker || filterStore.filterP2P.tradingMethod.sale.taker) return true
    }
    else false
});

const tradingTitle = computed(() => {
    return `
        ${filterStore.filterP2P.tradingMethod.purchase.maker ? 'M' : ''}
        ${filterStore.filterP2P.tradingMethod.purchase.taker ? 'T' : ''}
        -
        ${filterStore.filterP2P.tradingMethod.sale.maker ? 'M' : ''}
        ${filterStore.filterP2P.tradingMethod.sale.taker ? 'T' : ''}
    `.replaceAll(/\s/g, '')
})

function hideShow() {
    isShow.value = false;
}

function toggleShow() {
    isShow.value = !isShow.value
}

function resetFilter() {
    filterStore.resetTradingMethod()
}

</script>

<style lang="scss" scoped>
.filter {
    user-select: none;
}

.btn {
    cursor: pointer;
    padding: 4px 12px;
    display: flex;
    align-items: center;
    min-width: 140px;
    height: 44px;
    border-radius: 8px;
    justify-content: space-between;
    background: #FFFFFF;
    color: #828D96;


    &.mobile {
        border-radius: 8px;
        border: 1px solid #eaecf0;
        background: #f8fafc;
    }

    .btn_inner {
        height: 100%;
        display: flex;
        flex-direction: column;

        .trading_type {
            width: 48px;
            padding: 2px 4px;
            border-radius: 2px;
            background: rgba(224, 231, 255, 1);
            font-family: Inter;
            font-size: 11px;
            font-weight: 500;
            line-height: 14px;
            text-align: center;
        }
    }

    &__title {
        font-size: 11px !important;
        color: rgba(130, 141, 150, 1);
        font-weight: 500;
        white-space: nowrap;
        margin-right: 6px;
    }

    &__count {
        display: flex;
        width: 18px;
        height: 18px;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        background: #4D80EF;
        color: #fff;
        font-size: 11px;
        font-weight: 600;
    }

    &_choise {
        background: #FFFFFF;
        color: #272D37;
        //border: 1px solid #4d80ef;
    }

    &_active {
        border: 1px solid #4D80EF;
        z-index: 12;
        position: relative;
    }

    &_required {
        border: 1px solid rgb(77, 128, 239)
    }
}

.modal {
    z-index: 1000;
    position: absolute;
    background-color: #fff;
    display: inline-block;
    border: 1px solid #EAECF0;
    max-width: 300px;
    border-radius: 8px;
    overflow: hidden;

    &__title {
        display: flex;
        justify-content: space-between;
        padding: 12px 16px;
        border-bottom: 1px solid #EAECF0;
        font-family: Inter;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
    }

    &__drop {
        color: #828D96;
        cursor: pointer;
    }
}

.checkbox {
    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;

    &__item {
        min-width: 45%;
        display: flex;
        gap: 10px;
        align-items: center;
    }

    &__title {
        width: 70px;
        color: #828D96;
        font-size: 14px;
        font-weight: 500;
    }
}

.count {
    width: 18px;
    height: 18px;
}
</style>