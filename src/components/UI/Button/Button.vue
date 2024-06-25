<template>
    <button class="button" :class="[typeClass]" :disabled="disabled">
        <div class="lds-default" v-if="loading">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <span v-else>{{ label }}</span>
    </button>
</template>

<script setup>
import { computed } from 'vue'
import { BUTTON_TYPE } from '../../../constants/enum'

const props = defineProps({
    label: {
        type: String,
        default: 'Button'
    },
    type: {
        type: String,
        enum: Object.values(BUTTON_TYPE),
        default: BUTTON_TYPE.PRIMARY
    },
    disabled: {
        type: Boolean,
        required: false,
    },
    loading: {
        type: Boolean,
    }
})

const typeClass = computed(() => `button_${props.type}`)
</script>

<style lang="scss" scoped>
.button {
    height: 40px;
    padding: 9px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &_primary {
        background: var(--blue-main);
        color: #fff;

        &:enabled:hover {
            background: var(--blue-main-hover);
        }

        &:disabled {
            background: red;
        }
    }

    &_secondary {
        border: none;
        background: var(--blue-secondary);
        color: var(--blue-main);

        &:enabled:hover {
            background: var(--blue-secondary-hover);
        }
    }

    &_text {
        border: none;
        background: var(--white);
        color: var(--blue-text);
        padding: 0px;

        &:enabled:hover {
            color: var(--blue-main);
        }
    }
}

.lds-default {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
}

.lds-default div {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation: lds-default 1.2s linear infinite;
}

.lds-default div:nth-child(1) {
    animation-delay: 0s;
    top: 12px;
    left: 19px;
}

.lds-default div:nth-child(2) {
    animation-delay: -0.1s;
    top: 8px;
    left: 18px;
}

.lds-default div:nth-child(3) {
    animation-delay: -0.2s;
    top: 5px;
    left: 16px;
}

.lds-default div:nth-child(4) {
    animation-delay: -0.3s;
    top: 4px;
    left: 12px;
}

.lds-default div:nth-child(5) {
    animation-delay: -0.4s;
    top: 5px;
    left: 8px;
}

.lds-default div:nth-child(6) {
    animation-delay: -0.5s;
    top: 8px;
    left: 5px;
}

.lds-default div:nth-child(7) {
    animation-delay: -0.6s;
    top: 12px;
    left: 4px;
}

.lds-default div:nth-child(8) {
    animation-delay: -0.7s;
    top: 16px;
    left: 5px;
}

.lds-default div:nth-child(9) {
    animation-delay: -0.8s;
    top: 18px;
    left: 8px;
}

.lds-default div:nth-child(10) {
    animation-delay: -0.9s;
    top: 19px;
    left: 12px;
}

.lds-default div:nth-child(11) {
    animation-delay: -1s;
    top: 18px;
    left: 16px;
}

.lds-default div:nth-child(12) {
    animation-delay: -1.1s;
    top: 16px;
    left: 18px;
}

@keyframes lds-default {

    0%,
    20%,
    80%,
    100% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.5);
    }
}
</style>