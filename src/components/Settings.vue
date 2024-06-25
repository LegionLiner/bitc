<template>
    <Wrapper :title="$t('personalArea.settings.profile.title')" :exit=true>
        <div class="content">
            <div class="row">
                <div class="info">
                    <MyProfileBig />
                    <div class="info__data">
                        <div class="info__title info__title_size">{{ userInfo?.firstName }}</div>
                        <div class="info__info">email: <span class="info__title">{{ userInfo?.email }}</span></div>
                    </div>
                </div>
                <Button :label="$t('personalArea.btn')" :type=BUTTON_TYPE.PRIMARY />
            </div>
        </div>
    </Wrapper>
    <Wrapper :title="$t('personalArea.settings.personalArea.title')" class="settings">
        <div class="content">
            <div class="row">
                <div class="info__data">
                    <div class="info__title">{{ $t('personalArea.settings.personalArea.name') }}</div>
                    <div class="info__info">{{ $t('personalArea.settings.personalArea.nameInfo') }}</div>
                </div>
                <Button :label="$t('personalArea.settings.personalArea.btnName')" :type=BUTTON_TYPE.SECONDARY />
            </div>
            <div class="row">
                <div class="info__data">
                    <div class="info__title">{{ $t('personalArea.settings.personalArea.password') }}</div>
                    <div class="info__info">{{ $t('personalArea.settings.personalArea.passwordInfo') }}</div>
                </div>
                <Button :label="$t('personalArea.settings.personalArea.btnPass')" :type=BUTTON_TYPE.SECONDARY />
            </div>
        </div>
    </Wrapper>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { storeUser } from '../stores/user.store'
import { Button } from './UI';
import { BUTTON_TYPE } from '../constants/enum';
import { MyProfileBig } from './Icons'
import Wrapper from './Sistem/Wrapper.vue';
import { storeToRefs } from 'pinia';

const userStore = storeUser()
const { userInfo } = storeToRefs(userStore)
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped lang="scss">
.settings {
    padding-bottom: 75px;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 1px solid #EAECF0;
    border-radius: 8px;
    padding: 16px;
}

.row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    @media screen and (max-width: 900px) {
        display: flex;
        flex-direction: column;
        align-items: normal;
    }
}

.info {
    display: flex;
    align-items: center;
    gap: 30px;

    &__data {
        font-size: 14px;
        font-weight: 500;


    }

    &__title {
        color: #272D37;

        &_size {
            font-size: 16px;
        }
    }

    &__info {
        color: #828D96;
    }
}
</style>