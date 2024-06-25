<template>
  <BackGround v-if="isShow" @click="hidePopUp">
    <StepProcess :title="'+' + table.profit?.toLocaleString() + '%'" @click.stop @hide-PopUp="hidePopUp"
                 :class="{ 'translate': isShowSidebar }">
      <div class="process">
        <StageBuySellP2P :action="table.actions[0]"
                         :title="$t('stepProcces.buyAs') + ' ' + table.actions[0].buySellType + ':'" step="1"/>

        <StageConvertTransferP2P v-for="actions of newActions" :action="actions" :commission-from-coin="table.actions[0].price" :from-coin="table.actions[0].fiatName"/>

        <StageBuySellP2P :action="table.actions[table.actions.length - 1]"
                         :title="$t('stepProcces.sellAs') + ' ' + table.actions[table.actions.length - 1].buySellType + ':'"
                         :step="table.actions.length"/>
      </div>
    </StepProcess>
    <EventPopUp ref="eventPopUpRef" @hidePopUp="hidePopUp" title="Уведомление" btnTytle="Закрыть"
                text="Эта связка больше не актуальна!"/>
  </BackGround>
</template>

<script setup>
import {ref, watch, computed} from 'vue'
import {useI18n} from 'vue-i18n'
import {BackGround, StepProcess} from '../UI';
import {StageBuySellP2P, StageConvertTransferP2P, Result} from '../StageProccess'
import {storeTable} from '../../stores/table.store';
import {storeToRefs} from 'pinia';
import {EventPopUp} from '../PopUp'
import {storeFilter} from '../../stores/filter.store';

const {t} = useI18n({useScope: 'global'})
const useStoreTable = storeTable()
const {resultValideteOrdersP2P} = storeToRefs(useStoreTable)
const {startValideteOrdersP2P} = storeTable()
const {getOrderP2P} = storeFilter()

const props = defineProps({
  table: {
    type: Object,
    required: true
  },
})
const isShowSidebar = ref(false);
const isShow = ref(false)
const eventPopUpRef = ref(null)
const newActions = computed(() => {
  return props.table.actions.slice(1, props.table.actions.length - 1)
})

function hidePopUp() {
  isShowSidebar.value = false;
  useStoreTable.stopValideteOrdersP2P()
  setTimeout(() => {
    isShow.value = false;
    const body = document.body
    body.style.removeProperty('overflow');
  }, 495)

}

function openPopUp() {
  isShow.value = true
  setTimeout(() => {
    isShowSidebar.value = true;
    startValideteOrdersP2P(props.table)
  }, 5)
}

defineExpose({
  open: openPopUp
})

watch(resultValideteOrdersP2P, () => {
  if (resultValideteOrdersP2P.value === false) {
    getOrderP2P()
    eventPopUpRef.value?.open()
    setTimeout(() => {
      hidePopUp()
    }, 5000)
  }
})
</script>

<style lang="scss" scoped>
.process {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
  overflow: auto;
  padding: 24px 24px 0px 24px;

  @media screen and (max-width: 900px) {
    padding: 0px;
  }
}


::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  width: 6px;
  border-radius: 10px;
  background: #F8FAFC;
}

::-webkit-scrollbar-thumb {
  width: 6px;
  border-radius: 10px;
  background: #EAF0FB;
}

.translate {
  transform: translateX(0%);
  transition: transform 500ms;
}
</style>