<template>
    <label class="checkbox-item">
        <input type="checkbox" class="checkbox-item__input" v-model="checkboxValue">
        <span class="checkbox-item__check"></span>
        <IconText v-if="icon" :name="title" :length="length" :typeIcon="typeIcon"></IconText>
        <span v-else>{{ title }}</span>
    </label>
</template>

<script setup>
import { computed } from 'vue'
import IconText from '../../Sistem/IconText.vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    title: {
        type: String,
    },
    modelValue: {
        type: Boolean,
    },
    choiceName: {
        type: String,
    },
    icon: {
        type: Boolean
    },
    length: {
        type: Boolean
    },
    typeIcon: {
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
.checkbox-item {
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
        border-radius: 4px;
        background: #4D80EF;
        background-image: url('../../../assets/img/CheckMark.svg');
        background-position: center center;
        background-size: cover;
    }

    &__check {
        width: 18px;
        height: 18px;
        background-color: #DCE9F6;
        border-radius: 4px;
    }
}

.no_check {
    width: 18px;
    height: 18px;
    background-color: #fff;
    border: 1px solid #DCE9F6;
    border-radius: 4px;
}
</style>