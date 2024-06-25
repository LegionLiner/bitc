<template>
    <BackGround v-if="isShow" @click="hidePopUp">
        <StepProcess :title="$t('personalArea.blackList.title')" @click.stop @hide-PopUp="hidePopUp"
            :class="{ 'translate': isShowSidebar }">
            <div class="black-list__block">
                <div class="black-list__name">
                    <div class="black-list__title">{{ $t('personalArea.blackList.table.userName') }}</div>
                    <div class="black-list__info">{{ table.merchant }}</div>
                </div>
                <div class="black-list__name">
                    <div class="black-list__title">{{ $t('personalArea.blackList.table.exchange') }}</div>
                    <div class="black-list__info">
                        <IconText :name="table.exchange" typeIcon="exchanges" />
                    </div>
                </div>
                <div class="black-list__name">
                    <div class="black-list__title">{{ $t('personalArea.blackList.table.comment') }}</div>
                    <div class="black-list__info">
                        <Edit />{{ table?.comment || $t('personalArea.blackList.noComent') }}
                    </div>
                </div>
                <div class="black-list__name">
                    <div class="black-list__title">{{ $t('personalArea.blackList.table.date') }}</div>
                    <div class="black-list__info">{{ table.timeBlock }}</div>
                </div>
                <div class="black-list__name">
                    <div class="black-list__title">{{ $t('personalArea.blackList.table.action') }}</div>
                    <div class="black-list__info"><Button :label="$t('personalArea.blackList.remove')"
                            :type="BUTTON_TYPE.SECONDARY" @click="deleteMerchantBlackList"></Button></div>
                </div>
            </div>
        </StepProcess>
    </BackGround>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeUser } from '../../stores/user.store';
import { BackGround, StepProcess, Button } from '../UI';
import { Edit } from '../Icons';
import IconText from '../Sistem/IconText.vue';
import { BUTTON_TYPE } from '../../constants/enum';


const props = defineProps({
    table: {
        type: Object,
        required: true
    },
})
const userStore = storeUser()
const { t } = useI18n({ useScope: 'global' })
const isShowSidebar = ref(false);
const isShow = ref(false)




function hidePopUp() {
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
function deleteMerchantBlackList() {
    userStore.deleteMerchantBlackList(props.table.merchant, props.table.exchange)
    hidePopUp()
}
defineExpose({
    open: openPopUp
})
</script>

<style lang="scss" scoped>
.black-list {
    &__block {
        width: calc(100% - 40px);
        padding: 20px;
        margin: 0px 20px;
        border-radius: 12px;
        background: rgba(77, 128, 239, 0.08);
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    &__title {
        color: var(--828D96, #828D96);

        font-size: 14px;
        font-style: normal;
        font-weight: 500;
    }

    &__info {
        color: var(--272D37, #272D37);
        font-size: 16px;
        font-weight: 500;
        display: flex;
        align-items: center;
        gap: 5px;
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