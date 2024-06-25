<template>
    <div class="from-to" :class="sizeBlock">
        <span class="from-to__text" :class="sizeTitle">{{ title }}</span>
        <div class="filter">
            <InputCalc class="filter-limit__input" v-model="modelValue.min" :split="true" :input-placeholder="0"
                @update:modelValue="filterStore.editedFilters.add(selectedFilter)" />
            <span class="from-to__divide">-</span>
            <InputCalc class="filter-limit__input" v-model="modelValue.max" :split="true" :input-placeholder="0"
                @update:modelValue="filterStore.editedFilters.add(selectedFilter)" />
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { InputHeadless, InputCalc } from '../UI';
import { storeFilter } from '../../stores/filter.store';
const filterStore = storeFilter();

const { t } = useI18n({ useScope: 'global' })
const props = defineProps({
    title: {
        type: String,
    },
    modelValue: {
        type: Object
    },
    limit: {
        type: Boolean
    },
    size: {
        type: String
    },
    selectedFilter: {
        type: String
    }
})
const sizeTitle = computed(() => {
    return `size_${props.size}`
})
const sizeBlock = computed(() => {
    return `size_block_${props.size}`
})
</script>

<style lang="scss" scoped>
.from-to {
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0px 12px;
    gap: 8px;
    color: #828D96;
    font-size: 14px;
    font-weight: 500;
    border-radius: 8px;
    background: #FFF;
    position: relative;

    &__divide {
        font-size: 28px;
        color: #EAECF0;
    }

    &__filter {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    &__count {
        display: flex;
        align-items: center;
        gap: 4px;
    }

    &__text {
        line-height: 100%;
        position: absolute;
        top: 6px;
        z-index: 100;
        font-size: 11px !important;
        color: rgba(130, 141, 150, 1);
        font-weight: 500;
        display: flex;
        gap: 2px;
    }

    .filter {
        position: absolute;
        left: 0px;
        top: 12px;
        width: 100%;
        display: flex;

        :deep(.input-headless) {
            background: none !important;
        }
    }

    &_input {
        margin-top: 3px;
        width: 25px;
        height: 5px;
        padding: 5px;
        border: none;
        border-radius: 5px;
        background: #FFF;
        display: flex;
        text-align: center;
        color: #333;
        font-size: 14px;
        font-weight: 500;


        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &:focus {
            outline: none;
        }
    }

}

.size_block {
    &_s {
        min-width: 260px;

        @media screen and (max-width: 900px) {
            width: 200px;
        }
    }

    &_m {
        width: 310px;

        @media screen and (max-width: 900px) {
            width: 277px;
        }
    }
}

.size {
    &_s {
        min-width: 70px;
    }

    &_m {
        min-width: 120px;
        max-width: 120px;

        @media screen and (max-width: 900px) {
            min-width: 90px;
            max-width: 90px;
        }
    }
}

.filter-limit__input {
    margin-top: -9px;
    background: none;
    width: 120px;

    :deep(.input-calc__text) {
        background: transparent !important;
        width: 120px !important;
        text-align: center;
    }
}
</style>
