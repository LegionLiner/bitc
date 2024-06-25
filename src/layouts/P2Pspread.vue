<template>
    <div class="content">
        <!--<Header />-->
        <div class="ligaments-title">
            <router-link :to="{ name: NAME_PAGE.P2PSPREAD }" class="router-link">{{ $t('layouts.p2pspread.spread')
            }}</router-link>
        </div>
        <RouterView />
    </div>
</template>

<script setup>
import { NAME_PAGE } from '../constants/enum';
import { useI18n } from 'vue-i18n'
/*import Header from '../components/Sistem/Header.vue';*/

const { t } = useI18n({ useScope: 'global' })
</script>

<style lang="scss" scoped>
.content {
    user-select: none;
}

.router-link {
    padding: 10px 5px;
    //background: var(--white);
    text-decoration: none;
    color: var(--gray-ligaments-text);
    font-family: Inter;
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: 0px;
}

.router-link-exact-active {
    color: var(--blue-main);
    //border-bottom: 2px solid #6B6B6B;
}
</style>