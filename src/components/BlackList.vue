<template>
    <Wrapper :title="$t('personalArea.blackList.title')">
        <Table>
            <Row :is-header="true">
                <Cell class="cell_size_m">{{ $t('personalArea.blackList.table.userName') }}</Cell>
                <Cell class="cell_size_s">{{ $t('personalArea.blackList.table.exchange') }}</Cell>
                <Cell class="cell_size_xl mobile__none">{{ $t('personalArea.blackList.table.comment') }}</Cell>
                <Cell class="cell_size_l mobile__none">{{ $t('personalArea.blackList.table.date') }}</Cell>
                <Cell class="cell_size_l mobile__none">{{ $t('personalArea.blackList.table.action') }}</Cell>
            </Row>
            <BlackListTableMobile :userInfo="userInfo" />
            <div class="black-list__table">
                <Row v-for="row of userInfo?.merchantBlackList" v-if="userInfo?.merchantBlackList.length > 0">
                    <Cell class="cell_color_blue cell_size_m">{{ row?.merchant }}</Cell>
                    <Cell class="cell_color_blue cell_size_s">
                        <IconText :name="row?.exchange" typeIcon="exchanges" />
                    </Cell>
                    <Cell class="cell cell__description cell_size_xl mobile__none">{{ row?.coment }}
                        <Edit class="cursor" />
                    </Cell>
                    <Cell class="cell cell_size_l ">{{ row?.timeBlock }}</Cell>
                    <Cell class="cell_size_l cell_color_blue mobile__none">
                        <span class="cursor" @click="deleteMerchantBlackList(row?.merchant, row?.exchange)">{{
                            $t('personalArea.blackList.remove') }}</span>
                    </Cell>
                </Row>
                <Row v-else>
                    <Cell class="cell__nodata">
                        <div class="">{{ $t('table.noData') }}</div>
                    </Cell>
                </Row>
            </div>
        </Table>
    </Wrapper>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { storeUser } from '../stores/user.store'
import IconText from './Sistem/IconText.vue';
import Wrapper from './Sistem/Wrapper.vue';
import { Table, Row, Cell } from './UI';
import { UserPlus, Edit } from './Icons';
import { storeToRefs } from 'pinia';
import BlackListTableMobile from './Sistem/BlackListTableMobile.vue';

const userStore = storeUser()
const { t } = useI18n({ useScope: 'global' })
const { userInfo } = storeToRefs(userStore)


function deleteMerchantBlackList(merchant, exchange) {
    userStore.deleteMerchantBlackList(merchant, exchange)
}
</script>

<style scoped lang="scss">
.cell {
    color: #272D37;
    font-size: 14px;
    font-weight: 400;

    &__description {
        display: flex;
        justify-content: space-between;
        gap: 10px;

        &>svg {
            min-width: 20px;
        }
    }

    &__nodata {
        height: 50px;
        width: 100%;
        display: flex;
        justify-content: center;
        color: #828D96;
        font-size: 14px;
        font-weight: 500;
    }

    &_color {
        &_blue {
            color: #4D80EF;
            font-size: 16px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 4px;
        }


    }

    &_size {
        &_s {
            width: 13%;
            min-width: 180px;
        }

        &_m {
            width: 17%;
            min-width: 135px;

            @media screen and (max-width: 900px) {
                /*width: 30%;*/
                min-width: 50%;
                width: 55%;
            }

        }

        &_l {
            width: 21%;
            min-width: 215px;
        }

        &_xl {
            width: 28%;
            min-width: 300px;
        }
    }
}

.cursor {
    cursor: pointer;
}

.black-list__table {
    @media screen and (max-width: 900px) {
        display: none;
    }
}

.mobile__none {
    @media screen and (max-width: 900px) {
        display: none;
    }
}
</style>