<template>
    <input v-model="inputValue" class="input" :class="[sizeclass]" type="number" :placeholder="placeholder">
</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
    placeholder: {
        type: String,
    },
    size: {
        type: String,
        required: true
    },
    modelValue: {
        type: [Number, String]
    },
    limit: {
        type: Boolean
    }
})

const inputValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        if (!props.limit) emit('update:modelValue', value)
        else {
            if (value > 100 || value < 0) value = null;
        }
        emit('update:modelValue', value)
    }
})
const sizeclass = computed(() => {
    return `input_size_${props.size}`
})
</script>

<style lang="scss" scoped>
.input {
    width: 100%;
    padding: 8px 4px;
    text-align: center;
    border: none;
    color: #333;
    font-size: 14px;
    font-weight: 500;

    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &:focus {
        outline: none;
    }

    &_size {
        &_s {
            width: 35px;
        }

        &_m {
            width: 35px;
        }

        &_l {
            width: 100px;
        }
    }
}
</style>