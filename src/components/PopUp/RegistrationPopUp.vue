<template>
<teleport to="body">
    <BackGround v-if="isShow" @click="hidePopUp" class="reg">
        <Window :title="$t('registrationPopUp.title')" @click.stop @hidePopUp="hidePopUp">
            <Registration @openLoginPopUp="login" :popup="true"/>
        </Window>
    </BackGround>
</teleport>
</template>

<script setup>
import { ref } from 'vue'
import { BackGround, Window} from '../UI';
import Registration from '../Sistem/Registration.vue';

const emit = defineEmits(['openLoginPopUp'])
const isShow = ref(false)

function hidePopUp() {
    isShow.value = false;
}

function openPopUp() {
    isShow.value = true
}

function login() {
    hidePopUp()
    emit('openLoginPopUp')
}

defineExpose({
    open: openPopUp
})
</script>

<style lang="scss" scoped>
.reg {
    user-select: none;
}

.auth {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 8px;
}

.element {
    width: 100%;
}

.registration-popup_login {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
    align-items: center;
}

.blue {
    cursor: pointer;
    color: #4D80EF;
    font-size: 14px;
    font-weight: 500;

}
</style>