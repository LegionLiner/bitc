<template>
    <div class="filter-update" ref="filterUpdateRef">
        <div class="btn" :class="{ btn_active: showMenu }" @click="toggleMenu">
            {{ $t('filter.filterSpot.update') }} {{ timeUpdateSpot / 1000 }} {{ $t('filter.filterSpot.sec') }}
        </div>
        <div class="menu" v-if="showMenu">
            <div class="menu_title">{{ $t('filter.filterP2P.additionalFilters.dataUpdate') }}</div>
            <div class="menu_radio">
                <div class="modal__update_button">
                    <input type="radio" name="time" :value="null" id="radio∞" v-model="timeUpdateSpot"
                        class="modal__update_radio-btn" @change="filterStore.editedFilters.add(selectedFilter); showMenu = false">
                    <label for="radio∞" class="modal__update_label first">∞</label>
                    <input type="radio" name="time" value="5000" id="radio5" v-model="timeUpdateSpot"
                        class="modal__update_radio-btn" @change="filterStore.editedFilters.add(selectedFilter); showMenu = false"> 
                    <label for="radio5" class="modal__update_label">{{ "5 " +
            $t('filter.filterP2P.additionalFilters.sec') }}</label>
                    <input type="radio" name="time" value="10000" id="radio10" v-model="timeUpdateSpot"
                        class="modal__update_radio-btn" @change="filterStore.editedFilters.add(selectedFilter); showMenu = false">
                    <label for="radio10" class="modal__update_label">{{ "10 " +
            $t('filter.filterP2P.additionalFilters.sec') }}</label>
                    <input type="radio" name="time" value="30000" id="radio30" v-model="timeUpdateSpot"
                        class="modal__update_radio-btn" @change="filterStore.editedFilters.add(selectedFilter); showMenu = false">
                    <label for="radio30" class="modal__update_label">{{ "30 " +
            $t('filter.filterP2P.additionalFilters.sec') }}</label>
                    <input type="radio" name="time" value="60000" id="radio60" v-model="timeUpdateSpot"
                        class="modal__update_radio-btn" @change="filterStore.editedFilters.add(selectedFilter); showMenu = false">
                    <label for="radio60" class="modal__update_label last">{{ "60 " +
            $t('filter.filterP2P.additionalFilters.sec') }}</label>
                </div>
            </div>
        </div>
        <BackGround v-if="showMenu" @click="toggleMenu"></BackGround>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { storeFilter } from '../../stores/filter.store';
import { BackGround } from '../UI';
import clickOutside from '../../directives/clickOutSide';

const props = defineProps({
    selectedFilter: {
        type: String
    }
})
const { t } = useI18n({ useScope: 'global' })
const filterStore = storeFilter()
const { timeUpdateSpot } = storeToRefs(filterStore)
const showMenu = ref(false)
const filterUpdateRef = ref(null);

clickOutside(filterUpdateRef, hideMenu);

function toggleMenu() {
    showMenu.value = !showMenu.value
}
function hideMenu() {
    showMenu.value = false
}
</script>

<style lang="scss" scoped>
.filter-update {
    user-select: none;
}

.btn {
    cursor: pointer;
    display: flex;
    align-items: center;
    //border: 1px solid #EAECF0;
    border-radius: 8px;
    color: #828D96;
    font-size: 14px;
    font-weight: 500;
    padding: 0px 12px;
    height: 40px;
    background: #FFFFFF;

    &_active {
        border: 1px solid #4D80EF;
    }
}

.menu {
    position: absolute;
    border: 1px solid #EAECF0;
    display: flex;
    flex-direction: column;
    background: #fff;
    color: #828D96;
    padding: 10px;
    border-radius: 6px;
    border: 1px;
    gap: 10px;
    z-index: 13;

    &__title {
        font-size: 14px;
        font-weight: 400;
    }

    &_radio-btn {
        display: none;
    }

    &_label {
        width: 100%;
        display: flex;
        justify-content: center;
        height: 100%;
        align-items: center;
        cursor: pointer;
        border: 1px solid #EAECF0;
        padding: 10px;

        &_top {
            border-radius: 4px 4px 0px 0px;
        }

        &_bot {
            border-radius: 0px 0px 4px 4px;
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

.modal__update {
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
</style>