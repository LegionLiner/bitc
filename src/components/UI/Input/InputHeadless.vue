<template>
    <div class="buffer" ref="bufferRef"></div>
    <input ref="inputRef" :type="type" class="input-headless" :class="{ 'input-headless_max': isMax, 'split': split }" :style="inputStyle"
        :placeholder="placeholder" :readonly="readonly" v-model="inputValue" @input="onInput">
</template>

<script setup>
import { computed, onMounted, reactive, ref, nextTick, watch } from 'vue';

const props = defineProps({
    type: { type: String, default: 'number' },
    modelValue: { type: [String, Number] },
    placeholder: { type: String, default: 'Мой ответ' },
    isMax: { type: Boolean, default: false },
    readonly: { type: Boolean },
    limit: { type: Boolean },
    split: { type: Boolean },
})

const emits = defineEmits(['update:modelValue']);

const bufferRef = ref(null);
const inputRef = ref(null);


const inputValue = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        if (value < 0 && props.type == 'number') value = null;
        if (props.limit && value > 100) value = null;
        if (bufferRef.value?.textContent) {
            bufferRef.value.textContent = value || props.placeholder;
        }
        emits('update:modelValue', value);
    }
});

const inputStyle = reactive({ width: `${bufferRef.value?.clientWidth + 16}px` });

function onInput() {
    if (props.isMax) return;
    const maxWidth = bufferRef.value?.clientWidth > 35 ? 35 : bufferRef.value?.clientWidth;
    inputStyle.width = `${maxWidth + 16}px`
}
function setFocus() {
    inputRef.value.focus();
}

watch(props, () => {
    if (bufferRef.value?.textContent === 'Мой ответ') {
        bufferRef.value.textContent = props.modelValue || props.placeholder;
        onInput();
    }
})

onMounted(async () => {
    await nextTick();
    bufferRef.value.textContent = props.modelValue || props.placeholder;
    onInput();
})

defineExpose({
    setFocus
})

</script>

<style lang="scss" scoped>
.input-headless {
    max-width: 100%;
    min-width: 25px;
    outline: none;
    padding: 1px 6px;
    background: transparent;

    color: #333;
    font-size: 14px;
    font-weight: 500;

    &_max {
        width: 100%;
    }

    &:read-only {
        pointer-events: none;
    }

    &.split {
        width: 50% !important;
    }


    background: #FFF;
    color: rgba(39, 45, 55, 1);
    border: none;
    height: 33px;
    text-align: center;
    box-sizing: border-box;
}

.buffer {
    position: absolute;
    top: 0px;
    left: 0px;
    white-space: nowrap;
    visibility: hidden;

    min-width: 25px;
    color: #333;
    font-size: 14px;
    font-weight: 500;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>