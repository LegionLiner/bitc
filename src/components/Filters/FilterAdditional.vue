<template>
    <div class="filter" ref="filterAdditionalRef">
        <FilterIcon @click="toggleFilterAdditional" class="cursor" />
        <Ellipse class="ellipse" v-if="ellipse" />
        <BackGround v-if="showFilterAdditional" @click="hideMenu">
            <div class="modal" @click.stop :style="styleModal">
                <div class="modal__title">
                    {{ $t('filter.filterP2P.additionalFilters.title') }}
                </div>
                <div class="modal__block">
                    <div class="modal__block_title">{{ $t('filter.filterP2P.additionalFilters.bundleParameters.title')
                        }}
                    </div>
                    <div class="modal__width_m">
                        <FilterFromTo :title="$t('filter.filterP2P.additionalFilters.bundleParameters.spread')"
                            v-model="filterP2P.additionalFilters.spred" size="s"
                            :selectedFilter="selectedFilter" />
                    </div>
                    <div class="modal__width_m">
                        <FilterFromTo :title="$t('filter.filterP2P.additionalFilters.bundleParameters.limit')"
                            v-model="filterP2P.additionalFilters.limit" size="s" :limit="false"
                            :selectedFilter="selectedFilter" />
                    </div>
                    <div class="modal__semiblock">
                        <div class="modal__semiblock_title">
                            {{ $t('filter.filterP2P.additionalFilters.bundleParameters.numberActions.title') }}</div>
                        <RadioButton
                            :title="$t('filter.filterP2P.additionalFilters.bundleParameters.numberActions.twoActions')"
                            name="moves" v-model="filterP2P.additionalFilters.moves" value="twoActions"
                            @update:modelValue="filterStore.editedFilters.add(selectedFilter)" />
                        <RadioButton
                            :title="$t('filter.filterP2P.additionalFilters.bundleParameters.numberActions.threeActions')"
                            name="moves" v-model="filterP2P.additionalFilters.moves" value="threeActions"
                            @update:modelValue="filterStore.editedFilters.add(selectedFilter)" />
                    </div>
                    <div class="modal__semiblock">
                        <div class="modal__semiblock_title">
                            {{ $t('filter.filterP2P.additionalFilters.bundleParameters.buyingSelling.title') }}</div>
                        <RadioButton
                            :title="$t('filter.filterP2P.additionalFilters.bundleParameters.buyingSelling.all')"
                            name="purchase-sale" v-model="filterP2P.additionalFilters.purchaseSale" value="ALL"
                            @update:modelValue="filterStore.editedFilters.add(selectedFilter)" />
                        <RadioButton
                            :title="$t('filter.filterP2P.additionalFilters.bundleParameters.buyingSelling.interexchange')"
                            name="purchase-sale" v-model="filterP2P.additionalFilters.purchaseSale"
                            value="MULTI_EXCHANGE" @update:modelValue="filterStore.editedFilters.add(selectedFilter)" />
                        <RadioButton
                            :title="$t('filter.filterP2P.additionalFilters.bundleParameters.buyingSelling.intraexchange')"
                            name="purchase-sale" v-model="filterP2P.additionalFilters.purchaseSale"
                            value="SINGLE_EXCHANGE"
                            @update:modelValue="filterStore.editedFilters.add(selectedFilter)" />
                    </div>
                    <div class="modal__block_title">{{ $t('filter.filterP2P.additionalFilters.merchantCriteria.title')
                        }}
                    </div>
                    <div class="modal__width_s">
                        <FilterDep v-model="filterP2P.additionalFilters.sumDeals" :size="TABLE_SELL_SIZE.S"
                            placeholder="0"
                            :name="$t('filter.filterP2P.additionalFilters.merchantCriteria.amountDeals')" :from="true"
                            :limit="true" :selectedFilter="selectedFilter" />
                    </div>
                    <div class="modal__width_l">
                        <FilterDep v-model="filterP2P.additionalFilters.successfulTransactions"
                            :size="TABLE_SELL_SIZE.S" placeholder="0"
                            :name="$t('filter.filterP2P.additionalFilters.merchantCriteria.successfulTransactions')"
                            :from="true" :limit="true" :selectedFilter="selectedFilter" />
                        <!--<FilterFromTo
                            :title="$t('filter.filterP2P.additionalFilters.merchantCriteria.successfulTransactions')"
                            v-model="filterP2P.additionalFilters.successfulTransactions" size="m" />-->
                    </div>
                    <Checkbox :title="$t('filter.filterP2P.additionalFilters.merchantCriteria.onlyVerified')"
                        v-model="filterP2P.additionalFilters.provenMerchand"
                        @update:modelValue="filterStore.editedFilters.add(selectedFilter)" />
                </div>
                <div class="modal__update">
                    <div class="modal__update_title">{{ $t('filter.filterP2P.additionalFilters.dataUpdate') }}</div>
                    <div class="modal__update_button">
                        <input type="radio" name="time" :value="null" id="radio∞" v-model="timeUpdate"
                            @change="filterStore.editedFilters.add(selectedFilter)" class="modal__update_radio-btn">
                        <label for="radio∞" class="modal__update_label first">∞</label>
                        <input type="radio" name="time" value="5000" id="radio5" v-model="timeUpdate"
                            @change="filterStore.editedFilters.add(selectedFilter)" class="modal__update_radio-btn">
                        <label for="radio5" class="modal__update_label">{{ "5 " +
            $t('filter.filterP2P.additionalFilters.sec') }}</label>
                        <input type="radio" name="time" value="10000" id="radio10" v-model="timeUpdate"
                            @change="filterStore.editedFilters.add(selectedFilter)" class="modal__update_radio-btn">
                        <label for="radio10" class="modal__update_label">{{ "10 " +
            $t('filter.filterP2P.additionalFilters.sec') }}</label>
                        <input type="radio" name="time" value="30000" id="radio30" v-model="timeUpdate"
                            @change="filterStore.editedFilters.add(selectedFilter)" class="modal__update_radio-btn">
                        <label for="radio30" class="modal__update_label">{{ "30 " +
            $t('filter.filterP2P.additionalFilters.sec') }}</label>
                        <input type="radio" name="time" value="60000" id="radio60" v-model="timeUpdate"
                            @change="filterStore.editedFilters.add(selectedFilter)" class="modal__update_radio-btn">
                        <label for="radio60" class="modal__update_label last">{{ "60 " +
            $t('filter.filterP2P.additionalFilters.sec') }}</label>
                    </div>
                </div>

            </div>
        </BackGround>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { FilterIcon, Ellipse } from '../Icons';
import { FilterFromTo, FilterDep } from '.';
import { storeFilter } from '../../stores/filter.store';
import { Checkbox, RadioButton } from '../UI'
import { TABLE_SELL_SIZE } from '../../constants/enum'
import clickOutside from '../../directives/clickOutSide';
import { BackGround } from '../UI';


const filterStore = storeFilter()
const { filterP2P, timeUpdate } = storeToRefs(filterStore)
const filterAdditionalRef = ref(null);
const styleModal = ref({
    top: '0px',
    left: '0px',
})
const showFilterAdditional = ref(false)
const filterNull = ref({
    spred: {
        min: null,
        max: null,
    },
    moves: "twoActions",
    purchaseSale: null,
    sumDeals: { value: null },
    successfulTransactions: {
        min: null,
        max: null,
    },
    provenMerchand: null,
    timeUpdate: null,
})
const { t } = useI18n({ useScope: 'global' });
const props = defineProps({
    selectedFilter: {
        type: String
    }
});

clickOutside(filterAdditionalRef, hideMenu);

function toggleFilterAdditional(event) {
    showFilterAdditional.value = true
    const coordinats = event.target.getBoundingClientRect()
    styleModal.value.top = (coordinats.y + coordinats.height) + 'px'
    styleModal.value.left = (coordinats.x - 380) + 'px'
}
function hideMenu() {
    showFilterAdditional.value = false
}

const ellipse = computed(() => {
    if (filterNull.value.spred.max != filterStore.filterP2P.additionalFilters.spred.max) return true
    if (filterNull.value.spred.min != filterStore.filterP2P.additionalFilters.spred.min) return true
    if (filterNull.value.moves != filterStore.filterP2P.additionalFilters.moves) return true
    if (filterNull.value.purchaseSale != filterStore.filterP2P.additionalFilters.purchaseSale) return true
    if (filterNull.value.sumDeals.value != filterStore.filterP2P.additionalFilters.sumDeals.value) return true
    if (filterNull.value.successfulTransactions.max != filterStore.filterP2P.additionalFilters.successfulTransactions.max) return true
    if (filterNull.value.successfulTransactions.min != filterStore.filterP2P.additionalFilters.successfulTransactions.min) return true
    if (filterNull.value.provenMerchand != filterStore.filterP2P.additionalFilters.provenMerchand) return true
    if (filterNull.value.timeUpdate != filterStore.filterP2P.additionalFilters.timeUpdate) return true
})
</script>

<style lang="scss" scoped>
.filter {
    user-select: none;
    /*@media screen and (max-width: 900px) {

                min-width: 50%;
                width: 55%;
            }*/
}

.modal {
    position: absolute;
    width: 420px;
    border-radius: 10px;
    border: 1px solid #EAECF0;
    background: #FFF;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    color: #272D37;
    max-height: 695px;
    bottom: 10px;

    @media screen and (max-width: 1086px) {
        transform: translate(380px, 0px);
    }

    &__title {
        font-size: 18px;
        font-weight: 500;

    }


    &__update {
        display: flex;
        flex-direction: column;
        gap: 6px;

        &_title {
            font-size: 14px;
            font-weight: 400;
        }

        &_button {
            display: flex;
        }

        &_radio-btn {
            display: none;
        }

        &_label {
            text-align: center;
            min-width: 30px;
            padding: 3px 10px;
            border: 1px solid #EAECF0;
            cursor: pointer;
            color: #ADADAD;
            font-size: 14px;
            font-weight: 500;

            &.first {
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }

            &.last {
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }

            &:checked {
                color: #FFF;
                font-size: 14px;
                font-weight: 500;
                background: #4D80EF;
            }
        }
    }

    &__block {
        display: flex;
        flex-direction: column;
        gap: 14px;
        border-radius: 8px;
        background: #F8FAFC;
        padding: 8px 12px;
        overflow: auto;

        &_title {
            font-size: 16px;
            font-weight: 500;
        }
    }

    &__semiblock {
        display: flex;
        flex-direction: column;
        gap: 6px;

        &_title {
            font-size: 14px;
            font-weight: 400;
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

::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    width: 6px;
    border-radius: 10px;
    background: #F8FAFC;
}

::-webkit-scrollbar-thumb {
    width: 6px;
    border-radius: 10px;
    background: #EAF0FB;
}

.cursor {
    cursor: pointer;
}

.modal__width {
    &_s {
        width: 220px;
    }

    &_m {
        width: 250px;
    }

    &_l {
        width: 320px;
    }
}

.ellipse {
    position: absolute;
    transform: translate(-44px, -4px);
    z-index: 1;
}
</style>