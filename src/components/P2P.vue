<template>
    <Wrapper class="p2p">
        <div class="filterBox">
            <FilterP2P />
            <MobileFilterP2P />
        </div>
        <Table>
            <Row :is-header="true" :center="true">
                <Cell class="cell_size_xs mobile__none"></Cell>
                <Cell class="cell_size_xl">
                    {{ $t('table.bundle') }}
                </Cell>
                <Cell class="cell_size_m">{{ $t('table.exchange') }}</Cell>
                <Cell class="cell_size_m mobile__none">{{ $t('table.method') }}</Cell>
                <Cell class="cell_size_l mobile__none">{{ $t('table.well') }}</Cell>
                <Cell class="cell_size_l mobile__none">{{ $t('table.limit') }}</Cell>
                <Cell class="cell_size_m cursor " @click="sortSpred">
                    <Sort />{{ $t('table.spread') }}
                </Cell>
                <Cell class="cell_size_s mobile__none">
                    <Timer />
                </Cell>
            </Row>
            <Row v-for="row in table" :key="row.id" @click="processP2P(row)" class="row-style"
                v-if="myStoreTable.tableP2P.length > 0">
                <Cell class="cell_size_xs mobile__none">
                    <Bracket />
                    <div class="number">{{ row.actions.length }}</div>
                </Cell>
                <Cell class="cell cell_size_xl bundle" :class="[parseRow(row)]">
                    <div class="row">
                        <IconText :name="getIconName(row) || row.actions[0].fiatName" :length="true" typeIcon="bank"
                            class="fiat-icon first" />
                        <span class="sum-bank" v-if="row.actions[0].paymentTypes.length - 1 > 0">
                            +{{ row.actions[0].paymentTypes.length - 1 }}
                        </span>
                        <ArrowRight class="right-to-left-arrow" />
                        <IconText :name="row.actions[0].coinName" typeIcon="crypto" class="fiat-icon second" />
                    </div>
                    <div class="row">
                        <IconText :name="row.actions[row.actions.length - 1].coinName" typeIcon="crypto"
                            class="fiat-icon first" />
                        <ArrowRight class="right-to-left-arrow three-icons" />
                        <IconText typeIcon="bank"
                            :name="getIconName(row, true) || row.actions[row.actions.length - 1].fiatName"
                            :length="true" class="fiat-icon second" />
                        <span class="sum-bank" v-if="row.actions[row.actions.length - 1].paymentTypes.length - 1 > 0">
                            +{{ row.actions[row.actions.length - 1].paymentTypes.length - 1 }}
                        </span>
                    </div>
                    <ArrowLeftCurved class="left-arrow" />
                    <ArrowRightCurved class="right-arrow" />
                    <ArrowRightToBottom class="rigth-to-bottom-arrow" />
                    <ArrowLeftToTop class="left-to-top-arrow" />
                    <ArrowRight class="bottom-to-top-right-arrow" />
                    <ArrowRight class="bottom-to-top-left-arrow" />
                </Cell>
                <Cell class="cell cell_size_m exchange">
                    <div class="row">
                        <IconText :name="row.actions[0].exchangeName" typeIcon="exchanges" class="exchange-icon" />
                    </div>
                    <ArrowRight class="arrow"></ArrowRight>
                    <div class="row">
                        <IconText :name="row.actions[row.actions.length - 1].exchangeName" typeIcon="exchanges"
                            class="exchange-icon" />
                    </div>
                </Cell>
                <Cell class="cell cell_size_m mobile__none">
                    <div class="row">{{ row.actions[0].buySellType }}</div>
                    <div class="row">{{ row.actions[row.actions.length - 1].buySellType }}</div>
                </Cell>
                <Cell class="cell cell_size_l mobile__none">
                    <div class="row">{{ row.actions[0].price.toLocaleString() + " " + row.actions[0].fiatName }}</div>
                    <div class="row">{{ row.actions[row.actions.length - 1].price.toLocaleString() + " " +
                row.actions[row.actions.length - 1].fiatName }}</div>
                </Cell>
                <Cell class="cell cell_size_l mobile__none">
                    <div class="row">
                        {{ row.actions[0].minAmountOrder.toLocaleString() }}<span> - </span>{{
                row.actions[0].maxAmountOrder.toLocaleString()
            }}
                    </div>
                    <div class="row">
                        {{ row.actions[row.actions.length - 1].minAmountOrder.toLocaleString() }}<span> - </span>{{
                row.actions[row.actions.length - 1].maxAmountOrder.toLocaleString() }}
                    </div>
                </Cell>
                <Cell class="cell cell_color_red cell_size_m ">
                    <div class="wrap">
                        {{ row.profit.toLocaleString() + '%' }}
                    </div>
                </Cell>
                <Cell class="cell cell_color_grey cell_size_s mobile__none">
                    &#60; {{ timeUpdate(row.actions[0].lastUpdated, row.actions[row.actions.length - 1].lastUpdated) }}
                </Cell>
            </Row>
            <Row v-else>
                <Cell class="cell__nodata cell_size_xl">
                    <div class="lds-dual-ring" v-if="loadingOrderP2P"></div>
                    <div class="" v-else>{{ $t('table.noData') }}</div>
                </Cell>
            </Row>
        </Table>
        <ProcessP2P ref="processP2PRef" :table="activeRow" />
        <Paginator :activePage="activePage" :lenght="lenght" @change-page="changePage"
            v-if="myStoreTable.tableP2P.length > 0" />
    </Wrapper>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Wrapper, FilterP2P } from './Sistem';
import { ProcessP2P } from './Sidebar'
import IconText from './Sistem/IconText.vue';
import MobileFilterP2P from './Filters/MobileFilters/MobileFilterP2P.vue';
import { Table, Row, Cell } from './UI'
import { Sort, ArrowRight, Bracket, Timer, ArrowRightToBottom, ArrowLeftToTop, ArrowRightCurved, ArrowLeftCurved } from './Icons';
import { Paginator } from './UI'
import { storeTable } from '../stores/table.store'
import { storeFilter } from '../stores/filter.store';
import { store } from '../stores/index'

const myStore = store()
const myStoreTable = storeTable()
const filterStore = storeFilter()
const table = ref(null)
const processP2PRef = ref(null)
const activePage = ref(1)
const lenght = ref(null)
const activeRow = ref(null)
const { t } = useI18n({ useScope: 'global' })
const perPage = computed(() => {
    return myStore.paginatorPerPage
});
const tableP2P = computed(() => {
    return myStoreTable.tableP2P
});
const loadingOrderP2P = computed(() => {
    return filterStore.loadingOrderP2P
});

function processP2P(row) {
    activeRow.value = row
    processP2PRef.value?.open()
    const body = document.body
    body.style.overflow = "hidden"
}
function changePage(pageActive, perPage) {
    let array = myStoreTable.tableP2P.slice(((pageActive - 1) * perPage), (pageActive * perPage))
    activePage.value = pageActive
    table.value = array
}
function timeUpdate(timeFirst, timeSecond) {
    const dateFirst = new Date(timeFirst)
    const dateSecond = new Date(timeSecond)
    const toDay = new Date()
    if (dateFirst >= dateSecond) {
        if (Math.floor(((toDay - dateSecond) / 60000)) >= 1) return Math.floor(((toDay - dateSecond) / 60000)) + 'м.'
        else return ((toDay - dateSecond) / 1000).toFixed(0) + 'с.'
    }
    else {
        if (Math.floor(((toDay - dateFirst) / 60000)) >= 1) return Math.floor(((toDay - dateFirst) / 60000)) + 'м.'
        else return ((toDay - dateFirst) / 1000).toFixed(0) + 'с.'
    }
}
function sortSpred() {
    myStoreTable.sortSpred()
    changePage(activePage.value, perPage.value)
}
function parseRow(row) {
    if (filterStore.filterP2P.additionalFilters.moves === 'twoActions') {
        for (let el of row.actions[0].paymentTypes) {
            if (row.actions[row.actions.length - 1].paymentTypes.includes(el)) {
                return 'two-actions-two-icons';
            }
        }
        return 'two-actions-three-icons';
    } else {
        for (let el of row.actions[0].paymentTypes) {
            if (row.actions[row.actions.length - 1].paymentTypes.includes(el)) {
                return 'three-actions-three-icons';
            }
        }
        return 'three-actions-four-icons';
    }
}
function getIconName(row, last) {
    for (let el of row.actions[0].paymentTypes) {
        if (row.actions[row.actions.length - 1].paymentTypes.includes(el)) {
            return el
        }
    }
    if (last) {
        return row.actions[row.actions.length - 1].paymentTypes[0];
    }
    return row.actions[0].paymentTypes[0];
}

onMounted(() => {
    lenght.value = myStoreTable.tableP2P.length
    filterStore.getOrderP2P()
});

watch(tableP2P, () => {
    changePage(activePage.value, perPage.value)
    lenght.value = myStoreTable.tableP2P.length
});

</script>

<style scoped lang="scss">
.p2p {
    user-select: none;
}

.filterBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 16px;
    border-radius: 10px;
    box-shadow: 4px 4px 31px -12px rgba(34, 60, 80, 0.15);
    -webkit-box-shadow: 4px 4px 31px -12px rgba(34, 60, 80, 0.15);
}

.wrap {
    min-width: 70%;
    width: fit-content;
    padding: 8px 6px 8px 6px;
    border-radius: 4px;
    gap: 10px;
    text-align: center;
    font-weight: 500;
    background: rgba(212, 234, 216, 0.6);
}

.cell {
    color: #272D37;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 74px;

    &.exchange .arrow {
        display: none;
    }

    @media screen and (max-width: 900px) {
        font-size: 14px;

        &.exchange {
            display: flex;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: start !important;
            gap: 8px;

            & .arrow {
                display: block;
            }

            & .exchange-icon :deep(div) {
                display: none !important;
            }
        }
    }

    &_color {
        &_red {
            color: #2BAD63;
            font-weight: 600;
            height: 100%;
        }

        &_grey {
            color: #828D96;
            height: 100%;
        }
    }

    &_size {
        &_xs {
            margin-top: 4px;
            width: 2%;
        }

        &_s {
            width: 8%;
        }

        &_m {
            width: 10%;
            display: flex;

            @media screen and (max-width: 900px) {
                width: 33%;
            }
        }

        &_l {
            width: 17%;
        }

        &_xl {
            width: 25%;

            @media screen and (max-width: 900px) {
                width: 30%;
            }

        }
    }

    &__nodata {
        height: 50px;
        display: flex;
        justify-content: center;
        width: 100%;
        color: #828D96;
        font-size: 14px;
        font-weight: 500;
    }

    .left-arrow,
    .right-arrow,
    .rigth-to-bottom-arrow,
    .left-to-top-arrow,
    .bottom-to-top-right-arrow,
    .bottom-to-top-left-arrow {
        display: none;
    }

    @media screen and (max-width: 900px) {
        &.bundle {
            position: relative;

            &.two-actions-two-icons {
                padding-left: 35px;

                & .row {
                    width: fit-content;
                    justify-content: center;

                    & .fiat-icon.second {
                        display: none !important;
                    }
                }

                .right-arrow {
                    display: block;
                    position: absolute;
                    left: 56px;
                    top: 21px;
                }

                .left-arrow {
                    display: block;
                    position: absolute;
                    left: 20px;
                    top: 18px;
                }

                .bottom-to-top-left-arrow,
                .bottom-to-top-right-arrow,
                .rigth-to-bottom-arrow,
                .right-to-left-arrow,
                .left-to-top-arrow {
                    display: none;
                }

                & .first+.sum-bank {
                    position: absolute;
                    left: 60px;
                    top: 29px;
                    z-index: 1;
                }

                & .second+.sum-bank {
                    position: absolute;
                    left: 13px;
                    top: 29px;
                    z-index: 1;
                }
            }

            &.two-actions-three-icons {
                & .row:nth-child(2) {
                    & .fiat-icon.first {
                        margin-left: 18px;
                    }

                    & .fiat-icon.second {
                        position: absolute;
                        top: 12px;
                        left: 17px;
                    }
                }

                & .row:nth-child(1) {
                    & .fiat-icon.first {
                        margin-left: 44px;
                    }

                    & .fiat-icon.second {
                        display: none;
                    }
                }

                .bottom-to-top-left-arrow,
                .bottom-to-top-right-arrow,
                .right-arrow,
                .right-to-left-arrow,
                .left-arrow {
                    display: none;
                }

                .rigth-to-bottom-arrow {
                    display: block;
                    position: absolute;
                    transform: rotate(90deg);
                    left: 62px;
                    top: 40px;
                }

                .left-to-top-arrow {
                    display: block;
                    position: absolute;
                    transform: rotate(-90deg);
                    left: 22px;
                    top: 37px;
                }

                & .first+.sum-bank {
                    position: absolute;
                    left: 70px;
                    top: 47px;
                    z-index: 1;
                }

                & .second+.sum-bank {
                    position: absolute;
                    left: 17px;
                    top: 47px;
                    z-index: 1;
                }
            }

            &.three-actions-three-icons {
                & .row:nth-child(2) {
                    & .fiat-icon.first {
                        margin-left: 14px;
                    }

                    & .fiat-icon.second {
                        display: none;
                    }
                }

                & .row:nth-child(1) {
                    & .fiat-icon.first {
                        margin-left: 34px;
                    }

                    & .fiat-icon.second {
                        position: absolute;
                        top: 43px;
                        left: 75px;
                    }
                }

                .bottom-to-top-left-arrow,
                .bottom-to-top-right-arrow,
                .right-arrow,
                .right-to-left-arrow,
                .left-arrow {
                    display: none;
                }

                .right-to-left-arrow.three-icons {
                    display: block;
                    transform: rotate(180deg);
                }
                .rigth-to-bottom-arrow {
                    display: block;
                    position: absolute;
                    left: 77px;
                    top: 20px;
                }

                .left-to-top-arrow {
                    display: block;
                    position: absolute;
                    left: 41px;
                    top: 17px;
                }

                & .first+.sum-bank {
                    position: absolute;
                    left: 82px;
                    top: 12px;
                    z-index: 1;
                }

                & .second+.sum-bank {
                    position: absolute;
                    left: 30px;
                    top: 12px;
                    z-index: 1;
                }
            }

            &.three-actions-four-icons {
                padding: 8px 35px;

                & .row {
                    width: fit-content;
                    justify-content: center;

                    &:nth-child(1) {
                        gap: 20px;

                        .fiat-icon.first {
                            position: absolute;
                            top: 8px;
                            left: 74px;
                        }

                        .fiat-icon.second {
                            position: absolute;
                            top: 46px;
                            left: 74px;
                        }

                        .right-to-left-arrow {
                            display: none;
                        }
                    }

                    &:nth-child(2) {

                        .fiat-icon.first {
                            position: absolute;
                            top: 46px;
                            left: 34px;
                        }

                        .fiat-icon.second {
                            position: absolute;
                            top: 8px;
                            left: 34px;
                        }
                    }

                    .right-to-left-arrow {
                        display: block;
                        position: absolute;
                        top: 53px;
                        left: 58px;
                        display: block;
                        transform: rotate(180deg);
                    }
                }

                .left-arrow,
                .right-arrow,
                .rigth-to-bottom-arrow,
                .left-to-top-arrow {
                    display: none;
                }

                .bottom-to-top-left-arrow,
                .bottom-to-top-right-arrow {
                    display: block;
                    position: absolute;
                }

                .bottom-to-top-left-arrow {
                    transform: rotate(-90deg);
                    left: 40px;
                    top: 33px;
                }

                .bottom-to-top-right-arrow {
                    transform: rotate(90deg);
                    left: 80px;
                    top: 33px;
                }

                & .first+.sum-bank {
                    position: absolute;
                    left: 95px;
                    top: 27px;
                }

                & .second+.sum-bank {
                    position: absolute;
                    left: 22px;
                    top: 27px;
                }
            }
        }
    }
}

.row {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;

    @media screen and (max-width: 900px) {
        & .fiat-icon :deep(div) {
            display: none !important;
        }
    }
}

.number {
    position: absolute;
    transform: translate(2px, -34px);
    width: 11px;
    height: 15px;
    color: #6B6B6B;
    font-size: 10px;
    font-weight: 600;

    @media screen and (max-width: 900px) {
        z-index: 1;
    }
}

.row-style {
    @media screen and (max-width: 900px) {
        justify-content: space-between;
    }
}

.row-style:hover {
    border-radius: 10px;
    background: rgba(77, 128, 239, 0.16);
}

.row-style:nth-child(even) {
    border-radius: 10px;
    background: #F8FAFC;

    &:hover {
        background: rgba(77, 128, 239, 0.16);
    }
}

.cursor {
    cursor: pointer;
}

.sum-bank {
    width: 15px;
    height: 15px;
    color: #6897FB;
    font-size: 10px;
    font-weight: 600;
    border-radius: 3px;
    background: #E5F1FD;
    padding: 4px 2px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mobile {
    &__none {
        @media screen and (max-width: 900px) {
            display: none;
        }
    }
}

.lds-dual-ring {
    display: block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 3px solid #6B6B6B;
    border-color: #6B6B6B transparent #6B6B6B transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>