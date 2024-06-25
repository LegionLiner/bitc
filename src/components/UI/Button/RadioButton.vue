<template>
    <label class="radio-btn">
        <input type="radio" class="radio-btn__input" v-model="checkboxValue" :name="name" :value="value">
        <span class="radio-btn__check"></span>
        {{ title }}
    </label>
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    title: {
        type: String,
    },
    modelValue: {
        type: String
    },
    name: {
        type: String
    },
    value: {
        type: String
    }
})
const checkboxValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<style lang="scss" scoped>
.radio-btn {
    cursor: pointer;
    color: #272D37;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;

    &__input {
        position: absolute;
        -webkit-appearance: none;
        -moz-appearance: none;


    }

    &__input:checked+&__check {
        &::after {
            width: 11px;
            height: 11px;
            border-radius: 50%;
            background: #4D80EF;
            position: absolute;
            content: "";
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }

    &__check {
        position: relative;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 2px solid #4D80EF;
        background: #FFF;
    }
}
</style>