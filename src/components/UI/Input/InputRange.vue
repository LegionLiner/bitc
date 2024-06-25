<template>
    <div class="input-calc">
        <input required="required" :id="idFor" type="text" class="input-calc__text" @input="onInput" :class="size"
            step=0.01 v-model="inputValue">
        <input required="required" :id="idFor" type="range" class="input-calc__range" @input="onInput" :class="size"
            min="1" :max="max" v-model="inputValue">
        <label :for="idFor" class="input-calc__placeholder">{{ placeholder }}</label>
    </div>
</template>

<script setup>
import { computed } from 'vue'

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
    size: {
        type: String
    },
    idFor: {
        type: String,
        required: true
    },
    max:{
        type:Number,
        default:20
    }
})
const emits = defineEmits(["update:modelValue"]);

const inputValue = computed({
	get() {
		return replaceValue(props.modelValue, { format: true });
	},
	set(val) {
        if(Number(val) > props.max) val = "1"
		emits("update:modelValue", val);
	},
});


function replaceNotNumber(value) {
	return value.replace(/\s|\D/g, "");
}

function setFormat(value) {
	return new Intl.NumberFormat("ru-RU").format(value);
}

function replaceValue(value, { format = false } = {}) {
	if (!value) return value;

	if ((value.includes(".") || value.includes(",")) && props.float) {
		const [a, b] = value.includes(".") ? value.split(".") : value.split(",");
		const first = format ? setFormat(replaceNotNumber(a)) : replaceNotNumber(a);
		const last = replaceNotNumber(b).substring(0, 2);

		return `${first}.${last}`;
	}
	return format ? setFormat(replaceNotNumber(value)) : replaceNotNumber(value);
}

function onInput(e) {
	inputValue.value = replaceValue(e.target.value);
}

const size = computed(() => {
    return 'size__' + props.size
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
        font-family: Inter;
        font-size: 15px;
        font-weight: 400;
        color: #272D37;
        padding: 8px 12px 0px 12px;
    }

    &__placeholder {
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

    &__range{
        -webkit-appearance: none !important;
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        background-color: #C5E1FE;
        transform: translate(-2px,2px);

        &::-webkit-slider-thumb {
            -webkit-appearance: none !important;
            width: 12px;
            height: 12px;
            background-color: #fff;
            border: 2px solid #4D80EF;
            border-radius: 50%;
            position: relative;
            z-index: 1;
        }

        &::-moz-range-thumb {
            -webkit-appearance: none !important;
            width: 12px;
            height: 12px;
            background-color: #fff;
            border: 2px solid #4D80EF;
            border-radius: 50%;
            position: relative;
            z-index: 1;
        }

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
}

.input-calc__text:valid~.input-calc__placeholder {
    transform: translateY(-90%) scale(0.7);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

</style>