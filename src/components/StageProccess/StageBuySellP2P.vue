<template>
    <div class="stage">
        <div class="stage__header">
            <div class="stage__title"><!--<span class="stage__number_mobile">{{ step }}</span>-->
                <span>{{ title }}</span><span class="stage__title_time">{{ timeUpdate }}</span>
            </div>
            <div class="stage__bunch">
                <IconText :name="action?.exchangeName" typeIcon="exchanges" />
                <IconText :name="action?.coinName" typeIcon="crypto" />
            </div>
            <div class="stage__payment">
                <IconText v-for="row in action?.paymentTypes" :name="row" class="stage__payment_point" typeIcon="bank" />
            </div>
        </div>
        <div class="stage__footer">
          <div class="stage__info">
            <div class="stage__info_column ">
              <div class="stage__info_title">{{ $t('stepProcces.well') }}</div>
              <div class="stage__info_data">{{ action?.price.toLocaleString() + " " + action?.fiatName }}
              </div>
            </div>
            <div class="stage__info_column">
              <div class="stage__info_title">{{ $t('stepProcces.limit') }}</div>
              <div class="stage__info_data">{{ action?.minAmountOrder.toLocaleString() }} - {{
                  action?.maxAmountOrder.toLocaleString() }}</div>
            </div>
            <div class="stage__info_column">
              <div class="stage__info_title">{{ $t('stepProcces.available') }}</div>
              <div class="stage__info_data">{{ action?.availableAmount.toLocaleString() + ' ' + action?.coinName
                }}</div>
            </div>
          </div>
            <div class="stage__footer_info">
                <div class="stage__info_column">
                    <div class="stage__info_title">{{ $t('stepProcces.merchant') }}
                        <Attention class="cursor" @mouseenter="toggleShowAttention" @mouseleave="toggleShowAttention"
                            v-if="action?.warningMerchant" />
                    </div>
                    <div class="stage__info_data"><a :href="link" target="_blank">{{ action?.merchantName }}</a>
                        <Blocked class="cursor"
                            @click="addMerchantBlackList(action?.exchangeName, action?.merchantName)" />
                    </div>
                </div>
                <div class="stage__info_column">
                    <div class="stage__info_title">{{ $t('stepProcces.transactions') }}</div>
                    <div class="stage__info_data">{{ action?.totalDeals.toLocaleString() }}
                    </div>
                </div>
                <div class="stage__info_column">
                    <div class="stage__info_title">{{ $t('stepProcces.successful') }}</div>
                    <div class="stage__info_data" :class="color">{{ action?.completedDeals.toFixed(2) }}%
                    </div>
                </div>
            </div>
            <div class="stage__comment" v-if="action?.merchantComment">
                <div :class="coment">{{ action.merchantComment }}</div>
                <div class="" @click="showComent">
                    <ArrowUpBold v-if="isShowComent" class="stage__footer_arrow" />
                    <ArrowDownBold v-else class="stage__footer_arrow" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeUser } from '../../stores/user.store';
import IconText from '../Sistem/IconText.vue';
import { Attention, Blocked, ArrowUpBold, ArrowDownBold } from '../Icons';

const { t } = useI18n({ useScope: 'global' })
const userStore = storeUser()
const props = defineProps({
    action: {
        type: Object
    },
    title: {
        type: String,
    },
    step: {
        type: [Number, String],
    }
})

const isShowComent = ref(false)
const showAttention = ref(false)
const coment = ref('stage__footer_comment')
const timeUpdate = computed(() => {
    const date = new Date(props.action.lastUpdated)
    const toDay = new Date()
    if (Math.floor(((toDay - date) / 60000)) >= 1) return '<' + Math.floor(((toDay - date) / 60000)) + 'м.'
    else return '<' + ((toDay - date) / 1000).toFixed(0) + 'с.'
})
const color = computed(() => {
    if (props.action?.completedDeals < 60) return 'color_red'
    if (60 < props.action?.completedDeals && props.action?.completedDeals < 80) return 'color_orange'
    if (props.action?.completedDeals > 80) return 'color_green'
})
const link = computed(() => {
    if (props.action?.exchangeName == "BYBIT") return "https://www.bybit.com/fiat/trade/otc/profile/" + props.action.merchantId + "/" + props.action.coinName + "/" + props.action.fiatName + "/item"
    if (props.action?.exchangeName == "BINANCE") return "https://p2p.binance.com/ru/advertiserDetail?advertiserNo=" + props.action.merchantId
    if (props.action?.exchangeName == "HUOBI") return "https://www.htx.com/ru-ru/fiat-crypto/trader/" + props.action.merchantId
    if (props.action?.exchangeName == "GATEIO") return "https://www.gate.io/ru/c2c/user/" + props.action.merchantId
    if (props.action?.exchangeName == "OKX") return "https://www.okx.com/ru/p2p/ads-merchant?publicUserId=" + props.action.merchantId
    if (props.action?.exchangeName == "KUCOIN") return "https://www.kucoin.com/ru/otc/buy/" + props.action.coinName + "-" + props.action.fiatName
    if (props.action?.exchangeName == "BITPAPA") return "https://bitpapa.com/trade/new/" + props.action.orderId
})

function toggleShowAttention() {
    showAttention.value = !showAttention.value
}

function addMerchantBlackList(exchange, merchant) {
    userStore.addMerchantBlackList(exchange, merchant)
}
function showComent() {
    isShowComent.value = !isShowComent.value
}

watch(isShowComent, () => {
    if (isShowComent.value) {
        coment.value = 'stage__footer_allcomment'
    }
    else coment.value = 'stage__footer_comment'
})
</script>

<style lang="scss" scoped>
.stage {
    width: 100%;
    border-radius: 12px;
    position: relative;
    color: #272D37;

    &__header {
        padding: 16px;
        background: -webkit-gradient(linear, left top, left bottom, from(rgba(107, 169, 231, 0.08)), to(transparent));
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-radius: 12px 12px 0px 0px;
    }

    &__title {
        font-size: 16px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &_time {
            font-size: 12px;
            font-weight: 600;
            color: #A9A9A9;
        }
    }

    &__bunch {
        display: grid;
        grid-template-columns: 1.5fr 1fr 27px;
        font-size: 18px;
        font-weight: 500;
        padding-bottom: 16px;
        border-bottom: 1px dashed #828D96;

      @media screen and (max-width: 900px) {
            font-size: 16px;
            border-bottom: 1px dashed #828D96;
      }
    }

    &__info {
        display: flex;
        gap: 52px;
        font-size: 16px;
        font-weight: 400;

        @media screen and (max-width: 900px) {
            flex-wrap: wrap;
            gap: 20px;
            font-size: 14px;
        }

        &_title {
            color: #828D96;

            @media screen and (max-width: 900px) {
                font-size: 14px;
            }
        }

        &_data {
            width: 110%;
            color: #272D37;
            display: flex;
            font-weight: 500;
            align-items: center;
            gap: 8px;

            @media screen and (max-width: 900px) {
                font-size: 14px;
            }
        }
    }

    &__payment {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;

        @media screen and (max-width: 900px) {
            font-size: 14px;
        }

        &_point {
            padding: 2px;
            border-radius: 10px;
            background: rgb(77 128 239 / 6%);
        }
    }

    &__comment {
        display: flex;
        justify-content: space-between;
    }

    &__footer {
        padding: 8px 16px 16px 16px;
        background: transparent;
        display: flex;
        flex-direction: column;
        border-radius: 0px 0px 12px 12px;
        gap: 24px;

        &_info {
            display: flex;
            gap: 42px;

            @media screen and (max-width: 900px) {
                flex-wrap: wrap;
                gap: 20px;
            }
        }

        &_allcomment {
            font-size: 12px;
            font-weight: 400;
            height: auto;
        }

        &_comment {
            position: relative;
            font-size: 12px;
            font-weight: 400;
            max-height: 36px;
            overflow: hidden;

            &::after {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                content: "";
                background: -webkit-gradient(linear, left top, left bottom, from(transparent), to(#F8FAFC));
            }
        }

        &_arrow {
            min-width: 24px;
        }
    }
}

.color {
    &_red {
        color: #F04C4C;
    }

    &_orange {
        color: #EB930F;
    }

    &_green {
        color: #219653;
    }
}
</style>