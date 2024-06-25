<template>
    <Wrapper class="spot">
      <div class="filterBox">
        <FilterSpot />
        <MobileFilterSpot />
      </div>
        <Table>
            <Row :is-header="true">
                <Cell class="cell_size_xl mobile">{{ $t('table.bundle') }}</Cell>
                <Cell class="cell_size_xl">{{ $t('table.exchange') }}</Cell>
                <Cell class="cell_size_l mobile__none">{{ $t('table.well') }}</Cell>
                <Cell class="cell_size_m">
                    <Sort />{{ $t('table.spread') }}
                </Cell>
                <Cell class="cell_size_s mobile__none">
                    <Timer />
                </Cell>
            </Row>
            <Row v-for="row,i in table" @click="processSpot(row,i)" v-if="tableStore.tableSpot.length > 0" class="row-style">
                <Cell class="cell cell_size_xl mobile">
                    <div class="row bunch two-actions-three-icons">
                        <IconText :name="row.toCoin" typeIcon="crypto" />
                        <ArrowRight class="arrow" />
                        <IconText :name="row.fromCoin" typeIcon="crypto" class="first" />
                        <ArrowRight class="arrow" />
                        <IconText :name="row.toCoin" typeIcon="crypto" class="second" />

                        <ArrowLeftCurved class="left-arrow" />
                        <ArrowRightCurved class="right-arrow" />
                    </div>
                </Cell>
                <Cell class="cell cell_size_xl exchange">
                    <div class="row">
                        <IconText :name="row.exchangeBuy" :toCoin="row.toCoin" :fromCoin="row.fromCoin"
                            typeIcon="exchanges" />
                    </div>
                    <ArrowRight class="arrow"></ArrowRight>
                    <div class="row">
                        <IconText :name="row.exchangeSale" :toCoin="row.toCoin" :fromCoin="row.fromCoin"
                            typeIcon="exchanges" />
                    </div>
                </Cell>
                <Cell class="cell cell_size_l mobile__none">
                    <div class="">{{ row.priceBuy }}</div>
                    <div class="">{{ row.priceSale }}</div>
                </Cell>
                <Cell class="cell cell_color_red cell_size_m ">
                  <div class="wrap">
                    {{ row.profit.toLocaleString() + '%' }}
                  </div>
                </Cell>
                <Cell class="cell cell_color_grey cell_size_s mobile__none">
                    <!--&#60; 11 c.-->
                    {{ row.lastUpdate }}
                </Cell>
            </Row>
            <Row v-else>
                <Cell class="cell__nodata cell_size_xl">
                    <div class="lds-dual-ring" v-if="loadingOrderSpot"></div>
                    <div class="" v-else>{{ $t('table.noData') }}</div>
                </Cell>
            </Row>
        </Table>
        <ProcessSpot ref="processSpotRef" :table="activeRow" />
        <Paginator :activePage="activePage" :lenght="lenght" @change-page="changePage"
            v-if="tableStore.tableSpot.length > 0" />
    </Wrapper>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Wrapper, FilterSpot } from './Sistem';
import { Table, Row, Cell, Paginator } from './UI';
import { ProcessSpot } from './Sidebar';
import { store } from '../stores/index'
import { storeTable } from '../stores/table.store';
import { storeFilter } from '../stores/filter.store';
import IconText from './Sistem/IconText.vue';
import { Sort, Timer, ArrowRight, ArrowLeftCurved, ArrowRightCurved } from './Icons';
import MobileFilterSpot from './Filters/MobileFilters/MobileFilterSpot.vue'

const myStore = store()
const tableStore = storeTable()
const filterStore = storeFilter()
const lenght = ref(null)
const processSpotRef = ref(null)
const table = ref(null)
const activeRow = ref(null)
const activePage = ref(1)
const { t } = useI18n({ useScope: 'global' })
const perPage = computed(() => {
    return myStore.paginatorPerPage
})
const tableSpot = computed(() => {
    return tableStore.tableSpot
})
const loadingOrderSpot = computed(() => {
    return filterStore.loadingOrderSpot
})
async function processSpot(row,i) {
    activeRow.value = row
    await filterStore.startValidateCupSpot(row,i,activePage.value)
    processSpotRef.value?.open()
    const body = document.body
    body.style.overflow = "hidden"
}

function changePage(pageActive, perPage) {

    if(pageActive>Math.ceil(tableStore.tableSpot.length / perPage)){
        activePage.value = Math.ceil(tableStore.tableSpot.length / perPage)
        let array = tableStore.tableSpot.slice(((activePage.value - 1) * perPage), (activePage.value * perPage))
        table.value = array
    }
    else{
        let array = tableStore.tableSpot.slice(((pageActive - 1) * perPage), (pageActive * perPage))
        activePage.value = pageActive
        table.value = array
    }
}

onMounted(() => {
    lenght.value = tableStore.tableSpot.length
    filterStore.getProfitSpot()
});

watch(tableSpot, () => {
    changePage(activePage.value, perPage.value)
    lenght.value = tableStore.tableSpot.length
})
</script>


<style scoped lang="scss">
.spot {
    user-select: none;
    margin-top: 0px;
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

.filterBox {
    display: flex;
    justify-content: space-between;
    padding: 16px 16px;
    border-radius: 10px;
    align-items: center;
    box-shadow: 4px 4px 31px -12px rgba(34, 60, 80, 0.15);
    -webkit-box-shadow: 4px 4px 31px -12px rgba(34, 60, 80, 0.15);
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

            & .icon-text :deep(div) {
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
            width: 2%;
            margin-top: 4px;
            z-index: -1;
        }

        &_s {
            width: 12%;
        }

        &_m {
            width: 13%;
            display: flex;

            @media screen and (max-width: 900px) {
                width: 25%;
            }
        }

        &_l {
            width: 15%;
        }

        &_xl {
            width: 20%;

            @media screen and (max-width: 900px) {
                width: 65%;
            }
        }
    }

    &__nodata {
        height: 50px;
        display: flex;
        justify-content: center;
    }
}

.row {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
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

.bunch {
    display: flex;
    height: 100%;
    position: relative;

    .left-arrow,
    .right-arrow {
        display: none;
    }

    @media screen and (max-width: 900px) {
        &.two-actions-three-icons {
            position: relative;

            .arrow {
                display: none;
            }

            & .icon-text :deep(div) {
                display: none !important;
            }

            & .icon-text:nth-of-type(1) {
                display: none;
            }

            .first {
                position: absolute;
                top: 0;
                left: 20px;
            }

            .second {
                position: absolute;
                top: 33px;
                left: 20px;
            }

            .left-arrow {
                display: block;
                position: absolute;
                top: 6px;
                left: 5px;
            }

            .right-arrow {
                display: block;
                position: absolute;
                top: 10px;
                left: 43px;
            }

        }
    }
}

.cell__nodata {
    width: 100%;
    color: #828D96;
    font-size: 14px;
    font-weight: 500;
    height: 50px;
    display: flex;
    justify-content: center;
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

.mobile {
    width: 40%;

    @media screen and (max-width: 900px) {
      width: 70%;
    }

    &__none {
        @media screen and (max-width: 900px) {
            display: none;
        }
    }
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