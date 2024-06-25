<template>
  <div class="stage">
    <div class="stage__header">
      <div class="stage__title">
        <span>{{ title }}</span><span class="stage__title_time">{{ action.lastUpdate }}</span>
      </div>
      <div class="stage__info">
        <IconText :name="actionType === 'BUY' ? action.exchangeBuy : action.exchangeSale" :spot="true" :toCoin="action.toCoin"
                  :fromCoin="action.fromCoin" class="stage__row_blue" typeIcon="exchanges"/>
        <IconText :name="actionType === 'BUY' ? action.toCoin : action.fromCoin" class="stage__info_rigth" typeIcon="crypto"/>
        <ArrowRigthBig class="stage__info_center"/>
        <IconText :name="actionType === 'BUY' ? action.fromCoin : action.toCoin" typeIcon="crypto"/>
      </div>
    </div>
    <div class="stage__footer">
      <div class="stage__footer_column">
        <div class="stage__footer_row">
          <div class="stage__column_title subtitle">{{ $t('stepProcces.well') }}</div>
          <div class="stage__row">{{ (actionType === 'BUY' ? action.priceBuy : action.priceSale) + ' ' + action.toCoin }}</div>
        </div>
      </div>
      <div class="stage__footer_column">
        <div class="stage__footer_row">
          <div class="stage__column_title subtitle">{{ $t('stepProcces.commission') }}</div>
          <div class="stage__row">{{ actionType === 'BUY' ? action.commissionBuy : action.commissionSale || $t('stepProcces.commissionText') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useI18n} from 'vue-i18n'
import IconText from '../Sistem/IconText.vue';
import {ArrowRigthBig} from '../Icons';

const {t} = useI18n({useScope: 'global'})
const props = defineProps({
  action: {
    type: Object
  },
  actionType: {
    type: String
  },
  title: {
    type: String,
  },
  step: {
    type: String,
  },
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

    &_time {
      font-size: 12px;
      font-weight: 600;
      color: #A9A9A9;
    }
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

  &__footer {
    padding: 16px;
    background: transparent;
    display: flex;
    border-radius: 0px 0px 12px 12px;

    &_row {
      @media screen and (max-width: 900px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &_column {
      width: 45%;
      display: flex;
      flex-direction: column;
      gap: 12px;

      @media screen and (max-width: 900px) {
        width: 50%;
      }
    }
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
      min-width: 80px;
      color: #828D96;
      font-size: 12px;
      font-weight: 500;

      @media screen and (max-width: 900px) {
        /*min-height: 40px;*/
        align-items: flex-start;
      }
    }

    &_content {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
  }

  &__row {
    gap: 6px;
    font-size: 16px;
    font-weight: 500;

    &_blue {
      color: #4D80EF;
    }

    &_divider {
      color: #EAECF0;
    }
  }

  &__title {
    font-size: 18px;
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

.arrow {
  position: absolute;
  transform: translate(-21px, 3px);

  @media screen and (max-width: 900px) {
    transform: translate(-14px, 2px);
  }
}

.subtitle {
  font-size: 16px;
  font-weight: 400;

  @media screen and (max-width: 900px) {
    min-height: 20px;
  }
}

.cursor {
  cursor: pointer;
}

.test {
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__row {
    display: flex;
    gap: 10px;

    &_title {
      width: 100px;
      color: #828D96;
      font-size: 12px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 3px;
    }

    &_icon {
      padding: 2px 6px;
      border-radius: 20px;
      background-color: rgba(43, 173, 99, 0.0784313725);
    }

    &_content {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }
  }
}
</style>