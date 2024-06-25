<template>
    <Wrapper class="calculator-percent">
        <div class="calculator-percent-header">
            {{ $t('layouts.calculator.persentCalculator.header') }}
        </div>
        <div class="calculator-percent-container">
            <div class="calculator-percent-settings">
                <div class="settings-inputs">
                    <div class="settings-input-block">
                        <div class="title">
                            {{ actionTitle }} {{ $t('layouts.calculator.persentCalculator.title') }}
                        </div>
                        <div class="value">
                            <div class="input">
                                <input v-model="number" @click="$event.target.select()" id="input-number" type="number"
                                    class="input__text">
                                <label for="input-number" class="input__placeholder">{{ $t('layouts.calculator.persentCalculator.number') }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="settings-input-block">
                        <div class="title">
                            <RadioButton :title="$t('layouts.calculator.persentCalculator.increace')" v-model="action" value="increase"></RadioButton>
                            <RadioButton :title="$t('layouts.calculator.persentCalculator.decrease')" v-model="action" value="decrease"></RadioButton>
                        </div>
                        <div class="value">
                            <div class="input">
                                <input v-model="persentage" @click="$event.target.select()" id="input-persentage"
                                    type="number" class="input__text">
                                <label for="input-persentage" class="input__placeholder">{{ actionTitle }} {{ $t('layouts.calculator.persentCalculator.on') }}, %</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="result-block">
                    <div class="result">
                        <div class="title">
                            {{ $t('layouts.calculator.persentCalculator.gotResult') }}
                        </div>
                        <div class="value" :title="result" @click="copy(result)">
                            {{ result }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="calculator-percent-table">
                <div class="table-header">
                    <div class="title">
                        {{ $t('layouts.calculator.persentCalculator.persentOfaNumber') }}
                    </div>
                    <div class="value">
                        {{ toNormalNumber(number) || 0 }}
                    </div>
                </div>
                <div class="table">
                    <div class="increase-column">
                        <div class="increase persentage-part" v-for="step in incresersTable" :title="step.value">
                            <div class="persentage">
                                +{{ step.persent }}%
                            </div>
                            <div class="step-value">
                                {{ step.value }}
                            </div>
                        </div>
                    </div>
                    <div class="decrease-column">
                        <div class="decrease persentage-part" v-for="step in decresersTable" :title="step.value">
                            <div class="persentage">
                                -{{ step.persent }}%
                            </div>
                            <div class="step-value">
                                {{ step.value }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Wrapper>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import Wrapper from './Sistem/Wrapper.vue';
import RadioButton from './UI/Button/RadioButton.vue';

const { t } = useI18n({ useScope: 'global' });

const action = ref('increase');
const actionTitle = computed(() => {
    if (action.value === 'increase') return t('layouts.calculator.persentCalculator.increace');
    return t('layouts.calculator.persentCalculator.decrease');
});
const number = ref(0);
const persentage = ref(0);
let timer;
const result = computed(() => {
    if (number.value < 0) number.value = 0;
    if (persentage.value < 0) persentage.value = 0;
    if (!!number.value) {
        number.value = toNormalNumber(number.value);
    }

    clearTimeout(timer);
    timer = setTimeout(() => {
        changePersentage();
    }, 500);

    if (action.value === 'increase') {
        return toNormalNumber(+number.value + (number.value * persentage.value) / 100);
    } else {
        return toNormalNumber(number.value - (number.value * persentage.value) / 100);
    }
});
const incresersTable = ref([]);
const decresersTable = ref([]);

function changePersentage() {
    incresersTable.value = [];
    decresersTable.value = [];

    if (number.value <= 0) return;
    
    for (let i = 1; i < 11; i++) {
        incresersTable.value.push({
            persent: i,
            value: toNormalNumber(+number.value + (number.value * i / 100)),
        });
        decresersTable.value.push({
            persent: i,
            value: toNormalNumber(number.value - (number.value * i / 100)),
        });

        checkAccuracy(i)
    }
}

function toNormalNumber(number) {
    let data = String(number).split(/[eE]/);
    if (data.length == 1) return deleteDots(data[0]);

    let z = '',
        sign = number < 0 ? '-' : '',
        str = data[0].replace('.', ''),
        mag = Number(data[1]) + 1;

    if (mag < 0) {
        z = sign + '0.';
        while (mag++) z += '0';
        let res = z + str.replace(/^\-/, '');
        return deleteDots(res);
    }
    mag -= str.length;
    while (mag--) z += '0';
    let res = str + z;
    return deleteDots(res);
}

function deleteDots(string) {
    if (string.lastIndexOf('.') == string.indexOf('.')) {
        return string;
    }
    string = string.split('');
    string.splice(string.lastIndexOf('.'), 1);
    return string.join('');
}

function checkAccuracy(i) {
    if (incresersTable.value[i - 1].value.length > decresersTable.value[i - 1].value.length) {
            if ((incresersTable.value[i - 1].value - decresersTable.value[i - 1].value) < 0.1) {
                if (incresersTable.value[i - 1].value.slice(-5) == '99999') {
                    while (incresersTable.value[i - 1].value.slice(-1) == '9') {
                        incresersTable.value[i - 1].value = incresersTable.value[i - 1].value.slice(0, -1);
                    }
                    let lastNum = +incresersTable.value[i - 1].value.slice(-1) + 1;
                    incresersTable.value[i - 1].value = incresersTable.value[i - 1].value.slice(0, -1) + lastNum;
                } else {
                    incresersTable.value[i - 1].value = incresersTable.value[i - 1].value.slice(0, decresersTable.value[i - 1].value.length)
                }
            }
        } else {
            if ((decresersTable.value[i - 1].value - incresersTable.value[i - 1].value) < 0.1) {
                if (decresersTable.value[i - 1].value.slice(-5) == '99999') {
                    while (decresersTable.value[i - 1].value.slice(-1) == '9') {
                        decresersTable.value[i - 1].value = decresersTable.value[i - 1].value.slice(0, -1);
                    }
                    let lastNum = +decresersTable.value[i - 1].value.slice(-1) + 1;
                    decresersTable.value[i - 1].value = decresersTable.value[i - 1].value.slice(0, -1) + lastNum;
                } else {
                    decresersTable.value[i - 1].value = decresersTable.value[i - 1].value.slice(0, incresersTable.value[i - 1].value.length)
                }
            }
        }
}

function copy(text) {
    navigator.clipboard.writeText(text);
}
</script>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}

.calculator-percent {
    .calculator-percent-header {
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
    }

    .calculator-percent-container {
        display: flex;
        gap: 20px;
        padding-top: 20px;

        @media screen and (max-width: 900px) {
          display: grid;
        }

        .calculator-percent-settings {
            display: flex;
            flex-direction: column;
            gap: 40px;
            padding: 16px;
            border: 1px solid rgba(234, 236, 240, 1);
            border-radius: 12px;
            background: white;
            height: fit-content;
            min-width: 320px;
            max-width: 320px;
            white-space: nowrap;

            @media screen and (max-width: 900px) {
              max-width: 100%;
            }

            .settings-inputs {
                display: flex;
                flex-direction: column;
                gap: 15px;

                .settings-input-block {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;

                    .checkboxes {
                        gap: 10px;
                    }

                    .title {
                        display: flex;
                        gap: 20px;
                        color: rgba(39, 45, 55, 1);
                    }
                }
            }

            .result-block {
                display: flex;
                justify-content: flex-end;
                background: rgba(249, 252, 248, 1);
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                padding: 18px;

                .result {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 12px;

                    .title {
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 24px;
                        color: rgba(39, 45, 55, 1);
                    }

                    .value {
                        background: rgba(212, 234, 216, 0.6);
                        border-radius: 4px;
                        padding: 8px 6px;
                        font-size: 20px;
                        font-weight: 500;
                        line-height: 24px;
                        color: rgba(60, 161, 77, 1);
                        width: fit-content;
                        max-width: 250px;
                        overflow: hidden;
                        cursor: pointer;
                    }
                }
            }
        }

        .calculator-percent-table {
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 16px;
            border: 1px solid rgba(234, 236, 240, 1);
            border-radius: 12px;
            background: white;
            width: 100%;
            height: 631px;

            .table-header {
                display: flex;
                align-items: center;
                gap: 14px;

                .title {
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 20px;
                    color: rgba(39, 45, 55, 1);
                    border-right: 1px solid rgba(234, 236, 240, 1);
                    padding-right: 14px;
                }

                .value {
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 29px;
                    color: rgba(77, 128, 239, 1);
                }
            }

            .table {
                display: flex;
                justify-content: space-between;
                row-gap: 10px;
                column-gap: 20px;

                .increase-column,
                .decrease-column {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    row-gap: 10px;
                }

                .persentage-part {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    border-top-left-radius: 8px;
                    padding: 12px;
                    width: 100%;
                    background: rgba(249, 252, 248, 1);
                    color: rgba(60, 161, 77, 1);

                    &.decrease {
                        background: rgba(252, 248, 248, 1);
                        color: rgba(161, 60, 60, 1);
                    }

                    .persentage {
                        font-size: 12px;
                        font-weight: 500;
                        line-height: 18px;
                    }

                    .step-value {
                        font-size: 14px;
                        font-weight: 600;
                        line-height: 22px;
                    }
                }
            }
        }
    }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.input {
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
        padding: 8px 12px;
        width: 100%;
    }

    &__placeholder {
        font-size: 16px;
        font-weight: 400;
        color: #828D96;
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-94%) scale(0.7);
        transform-origin: left top;
    }
}
</style>