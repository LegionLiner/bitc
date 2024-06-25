<template>
  <div class="input-calc" @click="setFocus">
        <input required="required" :id="idFor" type="text" class="input-calc__text" @input="onInput($event.target.value)" :class="size"
            step=0.01 v-model="inputValue" ref="input" :placeholder="inputPlaceholder">
        <label :for="idFor" class="input-calc__placeholder">{{ placeholder }}</label>
    </div>
</template>

<script setup>
import { computed, onMounted, nextTick, ref } from 'vue'

const props = defineProps({
    modelValue: {
		type: [String, Number],
	},
    float: {
		type: Boolean,
	},
    placeholder: {
        type: String,
    },
    inputPlaceholder: {
        type: String,
    },
    size: {
        type: String
    },
    idFor: {
        type: String,
        required: true
    }
})
const emits = defineEmits(["update:modelValue"]);

const input = ref(null);
const inputValue = computed({
	get() {
		return replaceValue(props.modelValue, { format: true });
	},
	set(val) {
		emits("update:modelValue", val);
	},
});


function replaceNotNumber(value) {
	return value.replace(/\s|\D/g, "");
}

function setFormat(value) {
	return new Intl.NumberFormat("ru-RU").format(value);
}
function setFocus() {
    input.value.focus();
}

function replaceValue(value, { format = false } = {}) {
	if (!value) return value;
    value = String(value);

	if ((value.includes(".") || value.includes(",")) && props.float) {
		const [a, b] = value.includes(".") ? value.split(".") : value.split(",");
		const first = format ? setFormat(replaceNotNumber(a)) : replaceNotNumber(a);
		const last = replaceNotNumber(b).substring(0, 2);

		return `${first}.${last}`;
	}
	return format ? setFormat(replaceNotNumber(value)) : replaceNotNumber(value);
}

function onInput(value) {
	inputValue.value = replaceValue(value);
}

const size = computed(() => {
    return 'size__' + props.size
})
onMounted(async () => {
    await nextTick();
    input.value.value = replaceValue(props.modelValue, { format: true });
})
</script>

<style lang="scss" scoped>
.input-calc {
    display: inline-block;
    position: relative;

    &__text {
        height: 44px;
        border: none;
        box-shadow: none;
        outline: none;
        appearance: none;
        border-radius: 8px;
        background: #F7F9FA;
        font-size: 14px;
        font-weight: 400;
        color: #272D37;
        padding: 8px 12px 0px 12px;
        white-space: nowrap;
    }

    &__placeholder {
        white-space: nowrap;

        font-size: 14px;
        font-weight: 400;
        color: #828D96;
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        transition: transform .2s ease;
        transform-origin: left top;
    }
}

.size {
    &__s {
        width: 125px;
    }

    &__m {
        width: 160px;
    }
}

.input-calc__text:focus~.input-calc__placeholder {
    transform: translateY(-90%) scale(0.7);
    white-space: nowrap;
}

.input-calc__text:valid~.input-calc__placeholder {
    transform: translateY(-90%) scale(0.7);
    white-space: nowrap;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>