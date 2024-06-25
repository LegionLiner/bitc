<template>
    <div class="black-list__mobile">
        <Row v-for="row of userInfo?.merchantBlackList" v-if="userInfo?.merchantBlackList.length > 0"
            @click="openProcess(row)">
            <Cell class="cell_color_blue cell_size_m">{{ row?.merchant }}</Cell>
            <Cell class="cell_color_blue cell_size_s">
                <IconText :name="row.exchange" typeIcon="exchanges" />
            </Cell>
        </Row>
        <Row v-else>
            <Cell class="cell__nodata">
                <div class="">{{ $t('table.noData') }}</div>
            </Cell>
        </Row>
        <ProcessBlackList ref="processBlackListRef" :table="activeRow" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ProcessBlackList } from '../Sidebar'
import { Row, Cell } from '../UI';
import IconText from './IconText.vue';
import { Edit } from '../Icons';
import { useI18n } from 'vue-i18n'

const props = defineProps({
    userInfo: {
        type: Array
    }
})
const { t } = useI18n({ useScope: 'global' })
const processBlackListRef = ref(null)
const activeRow = ref(null)


function openProcess(row) {
    activeRow.value = row
    processBlackListRef.value?.open()
    const body = document.body
    body.style.overflow = "hidden"
}
</script>

<style lang="scss" scoped>
.black-list__mobile {
    display: none;

    @media screen and (max-width: 900px) {
        display: block;
        width: 100%;
    }
}

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
            font-size: 12px;
        }

        &_m {
            min-width: 50%;
            width: 55%;
            font-size: 12px;
        }
    }
}
</style>