<template>
    <div class="language" ref="languageRef">
        <div class="language__btn" @click="hideMenu">
            <IconText :name="lang" class="language__text" typeIcon="fiat">{{ }}</IconText>
            <ArrowDownSemi />
        </div>
        <div class="language__menu" v-if="showMenu">
            <div class="language__item" v-for="row in languages" @click="chengeLanguage(row.name)">
                <IconText :name="row.name" class="language__text" typeIcon="fiat"></IconText>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import IconText from './IconText.vue'
import { store } from '../../stores';
import clickOutside from '../../directives/clickOutSide';
import { ArrowDownSemi, GBP } from '../Icons';

const showMenu = ref(false)
const languageRef = ref(null);
const myStore = store()
const lang = computed(() => {
    return myStore.lang
})
const icon = computed(() => {
    if (myStore.lang == 'ru') return 'rub'
    if (myStore.lang == 'en') return 'GBP'
})
const languages = computed(() => {
    return myStore.languages
})
const { locale } = useI18n()

clickOutside(languageRef, closeMenu);
function hideMenu() {
    showMenu.value = !showMenu.value
}
function chengeLanguage(name) {
    locale.value = name
    myStore.chengeLanguage(name)
    closeMenu()
}
function closeMenu() {
    showMenu.value = false
}
</script>

<style lang="scss" scoped>
.language {
    user-select: none;

    &__btn {
        width: 80px;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 12px;
        border: 1px solid #EAECF0;
        border-radius: 10px;
        cursor: pointer;
    }

    &__menu {
        width: 80px;
        background: #fff;
        border: 1px solid #EAECF0;
        border-radius: 10px;
        position: absolute;
        padding: 4px 12px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    &__item:hover {
        cursor: pointer;
    }

    &__text {
        color: #272D37;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
    }
}
</style>