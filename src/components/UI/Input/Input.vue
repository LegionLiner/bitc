<template>
    <input :type="type" :placeholder="placeholder" @input="updateValue" class="input">
</template>

<script setup>
const emit = defineEmits(['update:value'])
const props = defineProps({
    value: {
        type: String,
    },
    type: {
        type: String,
        default: 'text',
        required: true
    },
    placeholder: {
        type: String,
    },
})

const updateValue = (e) => {
    emit('update:value', e.target.value)
}
</script>

<style scoped lang="scss">
.input {
    height: 40px;
    background: #FFF;
    color: rgba(39, 45, 55, 1);
    padding: 8px 12px;
    border-radius: 8px;
    border: 1px solid rgba(234, 236, 240, 1);
    box-sizing: border-box;

    &:focus {
        outline: rgba(77, 128, 239, 1);
        border-color: rgba(77, 128, 239, 1);
    }
}
</style>
