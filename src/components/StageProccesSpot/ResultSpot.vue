<template>
    <div class="stage">
        <div class="stage__number">
            <ArrowUpGreen />
        </div>
        <div class="stage__header">
            <div class="stage__title"><span class="stage__number_mobile">
                    <ArrowUpGreen />
                </span>{{ $t('stepProcces.result') }}</div>
            <div class="stage__content">
                <div class="stage__column">
                    <div class="stage__column_title">{{ $t('stepProcces.spread') }}</div>
                    <div class="stage__column_content">{{ profit?.toLocaleString() }}%</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ArrowUpGreen } from '../Icons';

const { t } = useI18n({ useScope: 'global' })
const props = defineProps({
    profit: {
        type: Number
    }
})
</script>

<style lang="scss" scoped>
.stage {
    width: 100%;
    border-radius: 12px;
    position: relative;
    color: #272D37;
    padding: 0px 24px;

    @media screen and (max-width: 900px) {
        padding: 0px;
    }

    &__title {
        display: flex;
        align-items: center;
    }

    &__header {
        padding: 14px;
        background: #2BAD6314;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border-radius: 12px 12px 0px 0px;
    }

    &__content {
        display: flex;
        gap: 16px;
    }

    &__column {
        width: 150px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        &_title {
            width: 80px;
            color: #828D96;
            font-size: 12px;
            font-weight: 500;
        }

        &_content {
            color: #2BAD63;
            font-size: 14px;
            font-weight: 600;
        }
    }

    &__number {
        position: absolute;
        transform: translate(-35%, -35%);
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100px;
        background: #4D80EF;
        color: #FFF;
        font-size: 12px;
        font-weight: 600;

        &_mobile {
            display: none;

            @media screen and (max-width: 900px) {
                margin-right: 4px;
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 50%;
                background: #4D80EF;
                color: #FFF;
                font-size: 12px;
                font-weight: 600;
            }


        }

        @media screen and (max-width: 900px) {
            display: none;
        }
    }
}
</style>