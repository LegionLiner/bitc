<template>
    <div class="profile-filters" ref="filterProfileRef">
        <div class="profile-filters__btn" @click="toggleShow">
            <span v-if="selectedFilter"><span class="profile-title">{{ $t('userFilters.title') }}</span>{{ " " + selectedFilter }}</span>
            <span v-else>{{ $t('userFilters.title') + " " + $t('userFilters.nochoise') }}</span>
            <ArrowDownGray v-if="!isShow" />
            <ArrowUpGray v-else />
        </div>
        <div class="modal" v-if="isShow">
            <div class="modal__title">
                <span>{{ $t('userFilters.subTitle') }}</span>
                <div class="modal__add-profile" @click="newUserFilter">+</div>
            </div>
            <div class="modal__profiles">
                <ProfileFiltersRow v-for="row of profileFilter" 
                :row="row" :input="row?.input" :active="row.filterName === selectedFilter" 
                @closeMenu="hideShow" />
            </div>
        </div>
        <div class="icon-save">
            <SaveGreen v-if="selectedFilter && filterStore.editedFilters.has(selectedFilter)" class="cursor" @click="filterStore.saveUserFilterP2P(filterStore.selectedUserFilterP2P)"></SaveGreen>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeUser } from '../../../stores/user.store';
import { storeFilter } from '../../../stores/filter.store';
import clickOutside from '../../../directives/clickOutSide';
import ProfileFiltersRow from './ProfileFiltersRow.vue';
import { ArrowDownGray, ArrowUpGray, SaveGreen } from '../../Icons';

const props = defineProps({
    profileFilter: {
        type: Array
    }
})
const userStore = storeUser()
const filterStore = storeFilter()
const isShow = ref(false);
const filterProfileRef = ref(null);
const { t } = useI18n({ useScope: 'global' })
const selectedFilter = computed(() => {
    return filterStore.selectedUserFilterP2P?.filterName
})

clickOutside(filterProfileRef, hideShow);

function hideShow() {
    isShow.value = false;
}

function toggleShow() {
    isShow.value = !isShow.value
}
function newUserFilter() {
    userStore.newUserFilter()
}
</script>

<style lang="scss" scoped>
.profile-filters {
    display: flex;
    gap: 10px;
    &__btn {
        display: flex;
        align-items: center;
        color: #272d37;
        font-size: 16px;
        font-weight: 400;
        gap: 8px;
        cursor: pointer;
    }

    .icon-save {
        display: flex; 
        align-items: center;
    }
}

.modal {
    z-index: 1000;
    position: absolute;
    padding: 8px 16px 16px 16px;
    border-radius: 10px;
    background: #FFF;
    display: flex;
    flex-direction: column;
    gap: 6px;
    border: 1px solid #EAECF0;
    min-width: 200px;

    &__title {
        display: flex;
        align-items: center;
        justify-content: space-between; 
        
        span {
            font-weight: 700;
        }
    }

    &__profiles {
        // padding: 8px 12px;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    &__add-profile {
        font-size: 24px;
        font-weight: 500;
        color: rgba(77, 128, 239, 1);
        cursor: pointer;
    }
}
.profile-title {
  font-weight: 500;
}

.cursor {
    cursor: pointer;
}
</style>