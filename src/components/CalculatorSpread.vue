<template>
    <Wrapper class="calculator-spread">
        <div class="calc-spread__header">
            <div class="calc-spread__calc">
                <div class="calc-spread__title">
                    <div class="calc-spread__title_title">{{$t('calculator.spread.title')}}</div>
                    <div class="calc-spread__title_input">
                        <Checkbox :title="$t('calculator.spread.removeCommissions')" v-model="withCommission" />
                        <!--<Checkbox :title="$t('calculator.spread.threeSteps')" v-model="threeMoves" />-->
                    </div>
                </div>
                <div class="calc-spread__content">
                    <div class="calc-spread__top">
                        <InputCalc v-model="calcSpread.startCapital" :float="false" :placeholder="$t('calculator.spread.startCapital')"
                            size="m" idFor="startCapital" />
                        <InputRange v-model="calcSpread.laps" :placeholder="$t('calculator.spread.numberLaps')" size="m" :float="false" idFor="laps" :max="20"/>
                    </div>
                    <div class="calc-spread__bottom">
                        <div class="calc-spread__bottom_column">
                            <InputCalc v-model="calcSpread.priceBue" :placeholder="$t('calculator.spread.purchasePrice')" size="m" :float="false" idFor="priceBue" />
                            <InputCalc v-model="calcSpread.commissionBue" :float="true" :placeholder="$t('calculator.spread.commission')"
                                size="s" idFor="commissionBue" v-if="!withCommission" />
                        </div>
                        <div class="calc-spread__bottom_column" v-if="threeMoves">
                            <InputCalc v-model="calcSpread.priceExchange" :placeholder="$t('calculator.spread.exchangePrice')"
                                size="m" :float="false" idFor="priceExchange" />
                            <InputCalc v-model="calcSpread.commissionExchange" :placeholder="$t('calculator.spread.commission')"
                                size="s" :float="true" idFor="commissionExchange" v-if="!withCommission" />
                        </div>
                        <div class="calc-spread__bottom_column">
                            <InputCalc v-model="calcSpread.priceSell" :placeholder="$t('calculator.spread.sellPrice')" :float="false"
                                size="m" idFor="priceSell" />
                            <InputCalc v-model="calcSpread.commissionSell" :float="true" :placeholder="$t('calculator.spread.commission')"
                                size="s" idFor="commissionSell" v-if="!withCommission" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="calc-spread__result">

                <div class="calc-spread__result_column">
                    <div class="calc-spread__result_title">{{$t('calculator.spread.spread')}}</div>
                    <div class="calc-spread__result_count">
<span class="cell__style_l" :class="spread > 0 ? 'cell__color_green' : 'cell__color_red'">{{ formatValue(spread) }}</span>
</div>
                </div>
                <div class="calc-spread__result_column">
                    <div class="calc-spread__result_title">{{$t('calculator.spread.profit')}}</div>
                    <div class="calc-spread__result_count"><span class="cell__style_l" :class="profit > 0 ? 'cell__color_green' : 'cell__color_red'">{{ formatValue(profit) }}</span></div>
                </div>
            </div>
        </div>

        <Table class="calc-spread__table" v-if="tableCalc.length > 0">
            <Row :is-header="true" class="spread__table_title">
                <Cell class="cell__size_xl">{{$t('calculator.spread.deal')}}</Cell>
                <Cell class="cell__size_l">{{$t('calculator.spread.startCapital')}}</Cell>
                <Cell class="cell__size_l">{{$t('calculator.spread.operation')}}</Cell>
                <Cell class="cell__size_l">{{$t('calculator.spread.finalCapital')}}</Cell>
                <Cell class="cell__size_l">{{$t('calculator.spread.profit')}}</Cell>
                <Cell class="cell__size_s">{{$t('calculator.spread.turnover')}}</Cell>
            </Row>
            <Row v-for="row of tableCalc" class="calc-spread__table_row">
                <Cell class="cell__size_xl">
                    {{ row.step }}
                </Cell>
                <Cell class="cell__size_l">{{ formatValue(row.startCapital) }}</Cell>
                <Cell class="cell__size_l" >
                <span class="cell__style_s" :class="row.spread > 0 ? 'cell__color_green' : 'cell__color_red'">{{ formatValue(row.spread) + '%' }}</span></Cell>
                <Cell class="cell__size_l">{{ formatValue(row.finallyCapital) }}</Cell>
                <Cell class="cell__size_l"><span class="cell__style_s" :class="row.profit > 0 ? 'cell__color_green' : 'cell__color_red'">
                    {{ formatValue(row.profit) }}</span>
                </Cell>
                <Cell class="cell__size_s">{{ formatValue(row.turnover) }}</Cell>
            </Row>
            <Row class="calc-spread__table_result">
                <Cell class="cell__size_xl">{{$t('calculator.spread.deals') + " " + tableCalc.length}}</Cell>
                <Cell class="cell__size_l">{{ formatValue(calcSpread.startCapital)}}</Cell>
                <Cell class="cell__size_l"><span :class="resultSpread > 0 ? 'cell__color_green' : 'cell__color_red'">{{ formatValue(resultSpread) + '%' }}</span></Cell>
                <Cell class="cell__size_l">{{formatValue(resultFinaly)}}</Cell>
                <Cell class="cell__size_l"><span :class="profit > 0 ? 'cell__color_green' : 'cell__color_red'">{{ formatValue(profit)}}</span></Cell>
                <Cell class="cell__size_s">{{formatValue(resultTurnover)}}</Cell>
            </Row>
        </Table>
    </Wrapper>
</template>

<script setup>
import { ref, watch } from 'vue'
import {useI18n} from 'vue-i18n'
import Wrapper from './Sistem/Wrapper.vue';
import { Checkbox, InputCalc,InputRange } from './UI';
import { Table, Row, Cell } from './UI';

const {t} = useI18n({useScope: 'global'})
const withCommission = ref(false)
const threeMoves = ref(false)
const tableCalc = ref([])
const spread = ref(0)
const profit = ref(0)
const calcSpread = ref({
    startCapital: null,
    laps: "1",
    priceBue: null,
    commissionBue: null,
    priceExchange: null,
    commissionExchange: null,
    priceSell: null,
    commissionSell: null,
})
const resultSpread = ref(0)
const resultFinaly = ref(0)
const resultTurnover = ref(0)
function createTable() {
    if (threeMoves.value) {
        if (withCommission.value) { }
        else { }
    }
    else {
        tableCalc.value = []
        let startCapital = Number(calcSpread.value.startCapital);

        const secondPrice = Number(calcSpread.value.priceSell)
        const comBuy = (Number(calcSpread.value.commissionBue) / 100)
        const comSell = (Number(calcSpread.value.commissionSell) / 100)
        const firstPrice = Number(calcSpread.value.priceBue)
        let sum;
        if (!withCommission.value) {
            sum = (((secondPrice - secondPrice * (comBuy + comSell)) - firstPrice) / firstPrice * 100)
            spread.value = sum
        }
        else {
            sum = ((secondPrice - firstPrice) / firstPrice * 100)
            spread.value = sum
        }
        let turnover = startCapital;
        let finallyCapital = startCapital
        for (let i = 1; i <= calcSpread.value.laps; i++) {
            finallyCapital = finallyCapital + startCapital / 100 * sum
            const row = {
                step: t('calculator.spread.deal') + ' ' + i,
                startCapital: startCapital,
                spread: sum,
                finallyCapital: finallyCapital,
                profit: finallyCapital - startCapital,
                turnover: turnover
            }
            tableCalc.value.push(row)

            startCapital = startCapital + startCapital / 100 * sum
            resultTurnover.value = turnover
            turnover = turnover + finallyCapital
        }
        profit.value = (finallyCapital - Number(calcSpread.value.startCapital))
        resultSpread.value = ((finallyCapital - Number(calcSpread.value.startCapital))/Number(calcSpread.value.startCapital) * 100)
        resultFinaly.value = finallyCapital
    }
}
function formatValue(value) {
  return Number(value).toFixed(2).toLocaleString();
}



watch(calcSpread.value, () => {
    if (threeMoves.value) {
        if (withCommission.value) {
            if (!!calcSpread.value.startCapital && !!calcSpread.value.laps && !!calcSpread.value.priceBue && !!calcSpread.value.priceExchange && !!calcSpread.value.priceSell) {
                console.log('3 действия без комиссией заполнено')
            }
        }
        else {
            if (!!calcSpread.value.startCapital && !!calcSpread.value.laps && !!calcSpread.value.priceBue && !!calcSpread.value.priceExchange && !!calcSpread.value.priceSell && !!calcSpread.value.commissionBue && !!calcSpread.value.commissionExchange && !!calcSpread.value.commissionSell) {
                console.log('3 действия с комиссией заполнено')
            }
            else return console.log('3 действия с комиссией не заполнено')
        }
    }
    else {
        if (withCommission.value) {
            if (!!calcSpread.value.startCapital && !!calcSpread.value.laps && !!calcSpread.value.priceBue && !!calcSpread.value.priceSell) {
                createTable()
            }
            else tableCalc.value = []
        }
        else {
            if (!!calcSpread.value.startCapital && !!calcSpread.value.laps && !!calcSpread.value.priceBue && !!calcSpread.value.priceSell && !!calcSpread.value.commissionBue && !!calcSpread.value.commissionSell) {
                createTable()
            }
            else tableCalc.value = []
        }
    }
})

watch(withCommission, () => {
    if (withCommission.value) {
        if (!!calcSpread.value.startCapital && !!calcSpread.value.laps && !!calcSpread.value.priceBue && !!calcSpread.value.priceSell) {
            createTable()
        }
    }
    else {
        if (!!calcSpread.value.startCapital && !!calcSpread.value.laps && !!calcSpread.value.priceBue && !!calcSpread.value.priceSell && !!calcSpread.value.commissionBue && !!calcSpread.value.commissionSell) createTable()
        else tableCalc.value = []
    }

})
</script>

<style scoped lang="scss">
.calculator-spread {
    user-select: none;
}

.calc-spread {
    &__header {
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 900px) {
        display: flow;
      }
    }
    &__top {
        display: flex;
        gap: 14px;
    }

    &__calc {
        width: 50%;
        padding: 24px;
        border-radius: 10px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media screen and (max-width: 900px) {
          width: 100%;
        }
    }

    &__title {
        display: flex;
        justify-content: space-between;

        &_title {
            font-size: 18px;
            font-weight: 600;
        }

        &_input {
            display: flex;
            gap: 24px;
        }
    }

    &__result {

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 24px;
        gap: 18px;

        &_column {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        &_title {
            font-size: 24px;
            font-weight: 500;
            text-align: right;
            color: #828D96;
        }

        &_count{
            display: flex;
            justify-content: flex-end;
        }

        @media screen and (max-width: 900px) {
          flex-direction: row;
          justify-content: space-between;
        }
    }

    &__bottom {
        display: flex;
        gap: 14px;

        &_column {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 28px;
    }

    &__table {

        font-size: 14px;
        font-weight: 400;
        color: #272D37;

        @media screen and (max-width: 900px) {
          display: grid;
          overflow-x: auto;
        }

        &_row {

            &:nth-child(even) {
                border-radius: 10px;
                background: #F8FAFC;
            }

            &:hover {
                border-radius: 10px;
                background: rgba(77, 128, 239, 0.16);
            }
        }

        &_result {
            text-align: center;
            align-items: center;
            background: rgba(212, 234, 216, 0.6);
            font-weight: 500;
            font-size: 16px;
            color: #3CA14D;
            border-radius: 10px;
        }
    }
}

.cell {
    &__size {
        &_xl {
            width: 16%;
            text-align: center;
        }

        &_l {
            width: 16%;
            text-align: center;
        }

        &_s {
            width: 16%;
            text-align: center;
        }
    }
    &__style {
        &_s {
            padding: 4px;
            border-radius: 4px;
            background: #E3F1E5;
            font-size: 14px;
            font-weight: 500;
        }
        &_l{
            padding: 4px 6px;
            background: #D4EAD899;
            border-radius: 4px;
            text-align: right;
            font-size: 28px;
            font-weight: 500;
        }
    }
    &__color {
        &_green {
            color:#2BAD63;
        }
        &_red {
            color: #A13C3C;
        }
    }
}
</style>