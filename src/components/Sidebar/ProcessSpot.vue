<template>
    <BackGround v-if="isShow" @click="hidePopUp">
        <StepProcess :title="'+' + table.profit?.toLocaleString() + '%'" @click.stop @hide-PopUp="hidePopUp"
            :class="{ 'translate': isShowSidebar }">
            <div class="process">
                <StageBuySellSpot :action="table" :title="$t('stepProcces.buy')" step="1" action-type="BUY"/>
                <StageTransferSpot :action="table" :commission-from-coin="table.priceBuy" :from-coin="table.toCoin"/>
                <StageBuySellSpot :action="table" :title="$t('stepProcces.sell')" step="2" action-type="SELL"/>
            </div>
            <div class="cup-conteiner">
                <CupSpot />
                <CupSpotMobile />
            </div>
        </StepProcess>
        <EventPopUp ref="eventPopUpRef" @hidePopUp="hidePopUp" title="Уведомление" btnTytle="Закрыть"
                text="Эта связка больше не актуальна!"/>
    </BackGround>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { BackGround, StepProcess } from '../UI';
import { storeFilter } from '../../stores/filter.store';
import { storeToRefs } from 'pinia';
import {EventPopUp} from '../PopUp'
import { StageBuySellSpot, StageTransferSpot, CupSpot, CupSpotMobile } from '../StageProccesSpot'

const filterStore = storeFilter()
const {resultValidateCupSpot}= storeToRefs(filterStore)
const { t } = useI18n({ useScope: 'global' })
const props = defineProps({
    table: {
        type: Object,
    }
})
const isShowSidebar = ref(false);
const isShow = ref(false)
const eventPopUpRef = ref(null)
const timeout = ref(null)


function hidePopUp() {
    clearTimeout(timeout.value)
    filterStore.finishValidateCupSpot()
    isShowSidebar.value = false;
    setTimeout(() => {
        isShow.value = false;
    }, 495)
    const bod = document.body
    bod.style.removeProperty('overflow');
}

function openPopUp() {
    isShow.value = true
    setTimeout(() => {
        isShowSidebar.value = true;
    }, 5)
}

defineExpose({
    open: openPopUp
})
watch(resultValidateCupSpot,()=>{
    if(resultValidateCupSpot.value === false){
    eventPopUpRef.value?.open()
    timeout.value = setTimeout(() => {
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

.cup-conteiner {
    width: 100%;
    padding: 0px 24px;

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