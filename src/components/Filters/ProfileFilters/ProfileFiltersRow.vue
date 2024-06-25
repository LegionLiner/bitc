<template>
    <div class="profile-filter" ref="filterProfileRowRef" :class="{ 'profile-filter__active': active }" @click="editUserFilterP2P">
        <input type="text" v-if="editToggle" v-model="row.filterName" ref="myInputP2P" @blur.stop="editProfileFilter"
            class="profile-filter__input">
        <div class="profile-filter__title" v-else>{{ row.filterName }}</div>
        <div class="profile-filter__btn">
            <SaveGreen v-if="filterStore.editedFilters.has(row.filterName)" class="cursor" @click="saveFilter" />
            <EditGray class="cursor" @click.stop="toggleEdit" />
            <BasketGray class="cursor" @click.stop="deleteUserFilterP2P" />
        </div>
    </div>
    <Teleport to="body">
        <Window v-if="showDeleteModal" class="delete_modal">
            <div class="modal_body">
                <div class="delete_modal__title">
                    {{ $t('userFilters.deleteTitle') }}
                    <Close @click="showDeleteModal = false"></Close>
                </div>
                <div class="delete_modal__text">
                    {{ $t('userFilters.deleteText') }}
                </div>
                <div class="delete_modal__btn">
                    <button @click="deleteFilter">{{ $t('userFilters.deleteBtn') }}</button>
                    <button class="cancel" @click="showDeleteModal = false">{{ $t('userFilters.cancelBtn') }}</button>
                </div>
            </div>
        </Window>
    </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeFilter } from '../../../stores/filter.store';
import { storeUser } from '../../../stores/user.store'
import { EditGray, BasketGray, Close } from '../../Icons';
import Window from '../../UI/PopUp/Window.vue';

const props = defineProps({
    row: {
        type: Object
    },
    input: {
        type: Boolean
    },
    active: {
        type: Boolean
    },
});

const emit = defineEmits(['closeMenu'])
const filterStore = storeFilter()
const userStore = storeUser()
const filterProfileRowRef = ref(null);
const editToggle = ref(props.input || false)
const myInputP2P = ref(null)
const inputValue = ref(null)
const showDeleteModal = ref(false)
const focusInput = () => {
    if (myInputP2P.value) {
        myInputP2P.value.focus()
    }
}

function toggleEdit() {
    editToggle.value = !editToggle.value
    if (editToggle.value) {
        inputValue.value = props.row.filterName
    }
    setTimeout(focusInput, 100)
}
function editUserFilterP2P() {
    filterStore.editUserFilterP2P(props.row);
    emit('closeMenu');
}
function deleteUserFilterP2P() {
    showDeleteModal.value = true;
}
function deleteFilter() {
    filterStore.deleteUserFilter(props.row.filterName, "P2P");
}
function editProfileFilter() {
    editToggle.value = false;
    if (props.input) {
        userStore.addUserFilterP2P(props.row)
    }
    else userStore.editProfileFilterP2P(inputValue.value, props.row.filterName)
}
function saveFilter() {
    filterStore.saveUserFilterP2P(props.row);
}
onMounted(() => {
    if (props.input) setTimeout(focusInput, 100)
})
</script>

<style lang="scss" scoped>
.profile-filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 6px 13px;
    border-radius: 4px;
    background: rgba(246, 246, 246, 1);
    border: 1px solid rgba(77, 128, 239, 0);
    cursor: pointer;

    &__title {
        color: #272D37;
        font-size: 14px;
        font-weight: 500;
        width: 150px;
        height: 20px;
    }

    &__btn {
        display: flex;
        justify-content: end;
        gap: 10px;
        width: 80px;
    }

    &__input {
        color: #272D37;
        font-size: 14px;
        font-weight: 500;
        width: 150px;
        border-radius: 5px;
        height: 20px;
        padding: 0px 5px;
        outline: none;
        border: 1px solid rgba(234, 236, 240, 1);

        &:focus {
            outline: none;
        }
    }

    &__active {
        border: 1px solid rgba(77, 128, 239, 1);

        .profile-filter__title {
            color: rgba(77, 128, 239, 1);
        }
    }

    &:hover {
        background: #f3f3f3;
        border: 1px solid rgba(77, 128, 239, 1);

        .profile-filter__title {
            color: rgba(77, 128, 239, 1);
        }
    }
}

.cursor {
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid rgba(234, 236, 240, 1);
    width: 20px;
    height: 20px;
    padding: 4px;
    background: white;
}

.delete_modal {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        background: rgba(0, 0, 0, 0.2);

    &.window__close {
        display: none;
    }

    .modal_body {
        box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);
        background: white;
        width: 300px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 20px;
        border-radius: 10px;
    }
    &__title {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__text {
        font-weight: 400;
        font-size: 15px;
        text-align: center;
    }

    &__btn {
        width: 100%;
        display: flex;
        justify-content: space-around;

        button {
            border: 1px solid rgba(255, 132, 132, 1);
            background: rgba(255, 132, 132, 0.15);
            border-radius: 3px;
            padding: 10px 20px;
            font-weight: 600;
            cursor: pointer;

            &.cancel {
                border: 1px solid rgba(83, 204, 55, 1);
                background: rgba(83, 204, 55, 0.15);
            }
        }
    }
}
</style>