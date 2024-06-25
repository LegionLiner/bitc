<template>
    <div class="wrapper">
        <div class="title">
            {{ title }}
            <div class="title__exit" v-if="exit" @click="logOut">{{ $t('personalArea.settings.profile.logOut') }}</div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { storeAuth } from '../../stores/auth.store'
import { useI18n } from 'vue-i18n'

const authStore = storeAuth()
const { t } = useI18n({ useScope: 'global' })
const props = defineProps({
    title: {
        type: String,
    },
    exit: {
        type: Boolean,
        default: false
    }
})

function logOut() {
    authStore.logOut()
}
</script>

<style lang="scss" scoped>
.wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media screen and (max-width: 900px) {
        width: 100%;
    }
}

.title {
    color: #272D37;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;

    &__exit {
        cursor: pointer;
        color: #828D96;
        font-size: 14px;
        font-weight: 500;
    }
}
</style>