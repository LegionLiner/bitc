<template>
    <div class="stage">
        <div class="stage__header">
            <div class="stage__title">
                <span>{{ $t('stepProcces.translate') }}</span>
            </div>
            <div class="stage__info">
                <IconText :name="action?.fromCoin" typeIcon="crypto"/>
                <IconText :name="action?.exchangeBuy" class="stage__info_rigth" typeIcon="exchanges"/>
                <ArrowRigthBig class="stage__info_center" />
                <IconText :name="action?.exchangeSale" typeIcon="exchanges"/>
            </div>
        </div>
      <div class="stage__footer">
        <div class="stage__footer_title">{{ $t('stepProcces.networks') }}</div>
        <div class="stage__footer_content">
          <div class="stage__chainInfo">
            <div :class="chains">
              <div class="stage__chainInfo_row" v-for="chainInfo of action?.intersectChains">
                <IconText :name="chainInfo?.chainName" class="stage__chainInfo_title" typeIcon="crypto"/>
                <div class="stage__chainInfo_chainCommission">{{ chainInfo?.chainCommission + ' ' + action?.fromCoin + ' (~' + (commissionFromCoin * chainInfo.chainCommission).toFixed(2) + ' ' + fromCoin + ')'}}</div>
              </div>
            </div>
          </div>
          <div class="" @click="showChains">
            <ArrowUpBold v-if="isShowChains" class="stage__footer_arrow" />
            <ArrowDownBold v-else class="stage__footer_arrow" />
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import IconText from '../Sistem/IconText.vue';
import { ArrowRigthBig, ArrowUpBold, ArrowDownBold } from '../Icons';
import {ref, watch} from "vue";

const { t } = useI18n({ useScope: 'global' })
const props = defineProps({
    action: {
        type: Object
    },
    title: {
        type: String,
    },
    step: {
        type: [Number, String],
    },
    commissionFromCoin: {
      type: Number,
    },
    fromCoin: {
      type: String,
    }
})

const isShowChains = ref(false)
const chains = ref('stage__footer_chains')

function showChains() {
  isShowChains.value = !isShowChains.value
}

watch(isShowChains, () => {
  if (isShowChains.value) {
    chains.value = 'stage__footer_allchains'
  } else chains.value = 'stage__footer_chains'
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
        background: -webkit-gradient(linear, left top, left bottom, from(rgb(107 169 231 / 8%)), to(transparent));
        display: flex;
        flex-direction: column;
        gap: 16px;
        border-radius: 12px 12px 0px 0px;
    }

    &__info {
        display: grid;
        grid-template-columns: 1fr 0.5fr 50px 1fr;
        align-items: center;
        font-size: 18px;
        font-weight: 500;

        &_rigth {
            display: flex;
            justify-content: flex-end;
        }

        &_center {
            width: 100%;
            display: flex;
            justify-content: center;
        }
    }

    &__title {
        font-size: 18px;
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &_time {
            font-size: 14px;
            font-weight: 600;
            color: #A9A9A9;
        }
    }

    &__footer {
        padding: 16px;
        background: transparent;
        display: flex;
        flex-direction: column;
        border-radius: 0px 0px 12px 12px;
        gap: 8px;

        &_content {
            display: flex;
            justify-content: space-between;
        }

        &_title {
            font-size: 16px;
            font-weight: 400;
            color: #828D96;
        }

      &_allchains {
        font-size: 12px;
        font-weight: 400;
        height: auto;
      }

      &_chains {
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

    &__chainInfo {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        font-size: 14px;
        font-weight: 500;

        &_row {
          padding: 8px 10px;
          display: inline-block;
          flex-direction: column;
          background: #F0F5FF;
          border-radius: 10px;
          gap: 4px;
          margin-bottom: 10px;
          margin-right: 5px;
          font-size: 14px;
          font-weight: 500;
        }

        &_chainCommission {
            display: flex;
            justify-content: flex-end;
          font-size: 12px;
          font-weight: 300;
        }
    }
}
</style>