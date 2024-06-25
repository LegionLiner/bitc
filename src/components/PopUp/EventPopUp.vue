<template>
    <BackGround v-if="isShow" @click="closeEvent" class="login">
        <WindowEvent :title="title" @click.stop>
            <span class="event-pop-up__text">{{ text }}</span>
            <Button :label="btnTytle" @click="closeEvent" />
        </WindowEvent>
    </BackGround>
</template>

<script setup>
import { ref } from 'vue';
import { BackGround, WindowEvent, Button } from '../UI';

const props = defineProps({
    title: { type: String },
    btnTytle: { type: String },
    text: { type: String }
})

const emit = defineEmits(['hidePopUp'])

const isShow = ref(false);

function closeEvent() {
    isShow.value = false;
    emit('hidePopUp')
}

function openPopUp() {
    isShow.value = true
}

defineExpose({
    open: openPopUp
})
</script>

<style lang="scss" scoped>
.event-pop-up__text {
    font-size: 14px;
    font-weight: 500;
    text-align: center;
}
</style>