<template>
    <div class="input-password">
        <input type="password" :placeholder="placeholder" @input="updateValue" class="input" v-show="!isShow"
            v-model="password">
        <input type="text" :placeholder="placeholder" @input="updateValue" class="input" v-show="isShow" v-model="password">
        <div class="eye">
            <EyeOn @click="toggleShow" v-show="isShow" />
            <EyeOff @click="toggleShow" v-show="!isShow" />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { EyeOn, EyeOff } from '../../Icons'

const isShow = ref(false)
const password = ref(null)
const emit = defineEmits(['update:value'])
const props = defineProps({
    value: {
        type: String,
    },
    placeholder: {
        type: String,
    },
})

const updateValue = (e) => {
    emit('update:value', e.target.value)
}

function toggleShow() {
    isShow.value = !isShow.value
}
</script>

<style lang="scss" scoped>
.input-password {
    user-select: none;
    position: relative;
}

.input {
    width: 100%;
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

.eye {
    position: absolute;
    right: 15px;
    top: 9px;
}
</style>