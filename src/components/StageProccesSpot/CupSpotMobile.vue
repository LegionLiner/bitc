<template>
    <div class="cup">
        <div class="cup__btn" @click="openProcess()">
            <div class="cup__title">{{ $t('stepProcces.cup.title') }}</div>
        </div>
        <ProcessCupSpot ref="processCupSpot" :table="cup" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeFilter } from '../../stores/filter.store';
import { ProcessCupSpot } from '../Sidebar'

const { t } = useI18n({ useScope: 'global' })
const filterStore = storeFilter()
const processCupSpot = ref(null)
const cup = computed(() => {
    return filterStore.cupSpot
})

function openProcess() {
    processCupSpot.value?.open()
    const body = document.body
    body.style.overflow = "hidden"
}/*
const asks = computed(() => {
    return cup.value.asks.sort((a, b) => a.price > b.price ? 1 : -1)
})
const bids = computed(() => {
    return cup.value.bids.sort((a, b) => a.price > b.price ? -1 : 1)
})

function hideDialog() {
    isShow.value = !isShow.value
}

function processCup() {
    processP2PRef.value?.open()
}*/
</script>

<style lang="scss" scoped>
.cup {
    display: none;


    @media screen and (max-width: 900px) {
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
    }

    &__btn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        height: 50px;
        align-items: center;

    }

    &__title {
        font-size: 16px;
        font-weight: 600;

    }
}
</style>