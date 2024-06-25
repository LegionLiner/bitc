<template>
    <Wrapper :title="$t('personalArea.rates.title')">
        <div class="subtitle">{{ $t('personalArea.rates.tarif.title') }}</div>
        <div class="table">
            <div class="column tarif">
                <div class="cell__title">
                    <div class="cell__tarif">
                        <RateBase />
                        {{ $t('personalArea.rates.tarif.base') }}
                    </div>
                    <div class="cell__sum">
                        <div class="cell__sum_sum">$0</div>
                        <div class="cell__sum_period">{{ $t('personalArea.rates.tarif.month') }}</div>
                    </div>
                    <Button label="Купить" :type="BUTTON_TYPE.PRIMARY" class="green" />
                </div>
                <div class="cell__bonus_point">
                    <div class="">
                        <CheckMarkAccept /><span>{{ $t('personalArea.rates.bonus.spreads') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkAccept /><span>{{ $t('personalArea.rates.bonus.monitoring') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkNoAccept /><span>{{ $t('personalArea.rates.bonus.prioritySupport') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkNoAccept /><span>{{ $t('personalArea.rates.bonus.twoSteps') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkNoAccept /><span>{{ $t('personalArea.rates.bonus.threeSteps') }}</span>
                    </div>
                </div>
            </div>
            <div class="column tarif">
                <div class="cell__title">
                    <div class="cell__tarif">
                        <RateStandart />
                        {{ $t('personalArea.rates.tarif.standard') }}
                    </div>
                    <div class="cell__sum">
                        <div class="cell__sum_sum">$99</div>
                        <div class="cell__sum_period">{{ $t('personalArea.rates.tarif.month') }}</div>
                    </div>
                    <Button label="Купить" :type="BUTTON_TYPE.PRIMARY" />
                </div>
                <div class="cell__bonus_point">
                    <div class="">
                        <CheckMarkAccept /><span>{{ $t('personalArea.rates.bonus.spreads') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkAccept /><span>{{ $t('personalArea.rates.bonus.monitoring') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkAccept /><span>{{ $t('personalArea.rates.bonus.prioritySupport') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkNoAccept /><span>{{ $t('personalArea.rates.bonus.twoSteps') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkNoAccept /><span>{{ $t('personalArea.rates.bonus.threeSteps') }}</span>
                    </div>
                </div>
            </div>
            <div class="column tarif">
                <div class="cell__title">
                    <div class="cell__tarif">
                        <RatePremium />
                        {{ $t('personalArea.rates.tarif.premium') }}
                    </div>
                    <div class="cell__sum">
                        <div class="cell__sum_sum">$99</div>
                        <div class="cell__sum_period">{{ $t('personalArea.rates.tarif.month') }}</div>
                    </div>
                    <Button label="Купить" :type="BUTTON_TYPE.PRIMARY" />
                </div>
                <div class="cell__bonus_point">
                    <div class="">
                        <CheckMarkAccept /><span>{{ $t('personalArea.rates.bonus.spreads') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkAccept /><span>{{ $t('personalArea.rates.bonus.monitoring') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkAccept /><span>{{ $t('personalArea.rates.bonus.prioritySupport') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkAccept /><span>{{ $t('personalArea.rates.bonus.twoSteps') }}</span>
                    </div>
                    <div class="">
                        <CheckMarkAccept /><span>{{ $t('personalArea.rates.bonus.threeSteps') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </Wrapper>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { BUTTON_TYPE } from '../constants/enum';
import Wrapper from './Sistem/Wrapper.vue';
import { Button } from './UI';
import { RateBase, RateStandart, RatePremium, CheckMarkAccept, CheckMarkNoAccept } from './Icons';


const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped lang="scss">
.subtitle {
    color: var(--272D37, #272D37);
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 24px;
}

.table {
    display: flex;
    border: 1px solid #EAECF0;
    border-radius: 8px;
    width: 75%;

    @media screen and (max-width: 900px) {
        flex-direction: column;
    }
}

.cell {
    &__title {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-bottom: 1px solid #EAECF0;
        height: 200px;
        color: #272D37;
        font-size: 14px;
        font-weight: 500;

        @media screen and (max-width: 900px) {
            height: auto;
        }
    }

    &__tarif {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #272D37;
        font-size: 16px;
        font-weight: 700;
    }

    &__sum {
        display: flex;
        align-items: center;
        gap: 8px;

        &_sum {
            color: #272D37;
            font-size: 24px;
            font-weight: 700;
        }

        &_period {
            color: #828D96;
            font-size: 14px;
            font-weight: 500;
        }
    }


    &__bonus {
        &_title {
            display: flex;
            flex-direction: column;
            padding: 24px;
            gap: 8px;
            color: #828D96;
            font-size: 14px;
            font-weight: 500;
        }

        &_point {
            display: flex;
            flex-direction: column;
            padding: 24px;
            gap: 7px;
        }
    }
}

.column {
    width: 33%;

    @media screen and (max-width: 900px) {
        width: 100%;
    }
}

.green {
    background: #2BAD631F;
    color: #2BAD63;
    cursor: default;

    &:enabled:hover {
        background: #2BAD631F;
    }
}
</style>