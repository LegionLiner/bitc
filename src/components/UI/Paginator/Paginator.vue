<template>
    <div class="paginator">
        <div class="wrapper">
            <div class="paginator__displayed">
                {{ perPage * (activePage - 1) + 1 }}-
                {{ maxElement }}
                /{{ countElements }}
            </div>
            <div class="paginator__pages">
                <ArrowLeftSemi class="cursor" @click="previousPage" />
                <template v-for="item of arrayElements">
                    <div class="paginator__pages_page cursor" :class="{ active: activePage == item }"
                        @click="activeClass(item)"
                        v-if="item == 1 || item == arrayElements || item == activePage || item == activePage + 1 || item == activePage - 1">
                        {{ item }}
                    </div>
                    <div v-else-if="item == activePage + 2 || item == activePage - 2">...</div>
                </template>
                <ArrowRightSemi class="cursor" @click="nextPage" />
            </div>
            <div class="paginator__perPage" ref="paginatorRef">
                <div class="paginator__perPage_btn" @click="openMenu">
                    {{ perPage }} / {{ $t('paginator.page') }}
                    <ArrowDownSemi />
                </div>
                <div class="paginator__perPage_menu" v-if="showMenu">
                    <div class="paginator__perPage_choise" @click="fivePerPage">5</div>
                    <div class="paginator__perPage_choise" @click="tenPerPage">10</div>
                    <div class="paginator__perPage_choise" @click="twentyPerPage">20</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import clickOutside from '../../../directives/clickOutSide';
import { ArrowLeftSemi, ArrowRightSemi, ArrowDownSemi } from '../../Icons'
import { store } from '../../../stores/index'

const myStore = store()
const { t } = useI18n({ useScope: 'global' })
const props = defineProps({
    activePage: {
        type: Number
    },
    lenght: {
        type: Number
    }
})


const perPage = computed(() => {
    return myStore.paginatorPerPage
})
const activePage = ref(1)
const showMenu = ref(false)
const paginatorRef = ref(null);

const emit = defineEmits(['changePage'])
clickOutside(paginatorRef, hideMenu);

const arrayElements = computed(() => {
    return Math.ceil(props.lenght / perPage.value)
})
const countElements = computed(() => {
    return props.lenght
})
const maxElement = computed(() => {
    if (arrayElements.value == activePage.value) return props.lenght
    else return activePage.value * perPage.value
})

function activeClass(item) {
    activePage.value = item
}
function fivePerPage() {
    myStore.fivePerPage()
    showMenu.value = !showMenu.value
}
function tenPerPage() {
    myStore.tenPerPage()
    showMenu.value = !showMenu.value
}
function twentyPerPage() {
    myStore.twentyPerPage()
    showMenu.value = !showMenu.value
}
function openMenu() {
    showMenu.value = !showMenu.value
}

function hideMenu() {
    showMenu.value = false
}
function changePage() {
    emit('changePage', activePage.value, perPage.value)
}
function previousPage() {
    if (activePage.value != 1) activePage.value = activePage.value - 1
}
function nextPage() {
    if (activePage.value != arrayElements.value) activePage.value = activePage.value + 1
}
watch(activePage, (value) => {
    changePage()
})

watch(perPage, (value) => {
    if (activePage.value == 1) changePage()
    activePage.value = 1
})

onMounted(() => {
    changePage()
});
</script>

<style lang="scss" scoped>
.paginator {
    user-select: none;
    padding: 16px;
    width: 100%;
    display: flex;
    color: #272D37;
    font-size: 12px;
    font-weight: 500;

    &__displayed {
        @media screen and (max-width: 900px) {
            display: none;
        }
    }

    &__pages {
        display: flex;
        align-items: center;
        font-size: 14px;
        gap: 12px;

        &_page {
            width: 24px;
            height: 24px;
            text-align: center;
        }
    }

    &__perPage {
        @media screen and (max-width: 900px) {
            display: none;
        }

        &_btn {
            width: 100px;
            padding: 6px 12px;
            gap: 6px;
            border-radius: 4px;
            border: 1px solid #EAECF0;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &_menu {
            width: 100px;
            position: absolute;
            border-radius: 4px;
            border: 1px solid #EAECF0;
            display: flex;
            flex-direction: column;
            gap: 4px;
            background: #fff;
            transform: translate(0px, -130px)
        }

        &_choise {
            padding: 6px 12px;
            cursor: pointer;
            text-align: center;

            &:hover {
                background: #EAECF0;
            }
        }
    }
}

.wrapper {
    margin: auto;
    display: flex;
    align-items: center;
    gap: 24px;
}

.cursor {
    cursor: pointer;
}

.active {
    border-radius: 4px;
    background: #F1F3F4;
}
</style>