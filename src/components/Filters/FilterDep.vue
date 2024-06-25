<template>
    <div class="filter-dep" :class="sizeBlock">
        <InputCalc class="filter-dep__input" :size="size" :placeholder="name" v-model="modelValue.value" :limit="limit" :localy="true" @update:modelValue="filterStore.editedFilters.add(selectedFilter)"/>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { InputCalc } from '../UI';
import { storeFilter } from '../../stores/filter.store';
const filterStore = storeFilter();

const { t } = useI18n({ useScope: 'global' });
const props = defineProps({
    modelValue: {
        type: Object
    },
    size: {
        type: String
    },
    placeholder: {
        type: String
    },
    name: {
        type: String
    },
    from: {
        type: Boolean
    },
    limit: {
        type: Boolean,
        default: false
    },
    currency: {
        type: String
    },
    mobile: {
        type: Boolean
    },
    selectedFilter: {
        type: String
    }
})
const sizeTitle = computed(() => {
    return `size_${props.size}`
})
const sizeBlock = computed(() => {
    return [`size_block_${props.size}`, props.mobile ? 'mobile' : '']
})

</script>

<style lang="scss" scoped>
.filter-dep {
    width: 120px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 44px;
    color: #828D96;
    font-size: 14px;
    font-weight: 500;
    background: #fff;
    position: relative;
    min-height: 44px;

    &.mobile {
        border-radius: 8px;
        border: 1px solid #eaecf0;
        background: #f8fafc;

        input {
            text-align: start !important;
            margin-left: 6px;
        }
    }

    &__title {
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

    &__input {
        background: none;
        width: 100%;

        :deep(.input-calc__text) {
            background: transparent !important;
            width: 100% !important;
        }
    }

    &__divide {
        color: #EAECF0;
    }
}

.size_block {
    &_s {
        width: 245px;

        @media screen and (max-width: 900px) {
            width: 250px;
        }
    }

    &_l {
        @media screen and (max-width: 900px) {
            width: 210px;
        }
    }

    &_xl {
        @media screen and (max-width: 900px) {
            width: 100%;
        }
    }
}

.size {
    &_s {
        min-width: 120px;
        max-width: 130px;

        @media screen and (max-width: 900px) {
            min-width: 120px;
            max-width: 130px;
        }
    }
}
</style>