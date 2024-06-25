<template>
    <teleport to="body">
    <BackGround v-if="isShow" @click="hidePopUp" class="login">
        <Window :title="$t('loginPopUp.title')" @click.stop @hide-PopUp="hidePopUp">
            <Login @openRegPopUp="reg" @hidePopUp="hidePopUp" :popup="true"/>
        </Window>
    </BackGround>
</teleport>
</template>

<script setup>
import { ref } from 'vue';
import Login from '../Sistem/Login.vue';
import { BackGround, Window } from '../UI';

const isShow = ref(false);
const emit = defineEmits(['openRegPopUp'])

function hidePopUp() {
    isShow.value = false;
}

function openPopUp() {
    isShow.value = true
}

function reg() {
    hidePopUp()
    emit('openRegPopUp')
}

defineExpose({
    open: openPopUp
})
</script>

<style lang="scss" scoped>
.login {
    user-select: none;
}
</style>