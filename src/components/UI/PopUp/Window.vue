<template>
    <div class="window">
        <div class="window__close">
            <Close @click="$emit('hidePopUp')" />
        </div>
        <div class="window__title">
            {{ title }}
        </div>
        <slot></slot>
    </div>
</template>

<script setup>
import { Close } from '../../Icons';


const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>

<style lang="scss" scoped>
.window {
    position: relative;
    margin: auto;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    width: 320px;
    padding: 24px;
    border-radius: 12px;
    color: var(--272D37, #272D37);

    font-size: 18px;
    font-weight: 600;

    &__close {
        position: absolute;
        right: 20px;
        top: 10px;
        cursor: pointer;
    }

}
</style>