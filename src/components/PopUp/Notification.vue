<template>
    <div class="notice" v-if="show">
        <div class="notification" v-for="notic of error">
            <div :class="typeNotice"></div>
            <div class="notification__text">
                <div class="notification__text_title">{{ notic.title }}</div>
                <div class="notification__text_text">{{ notic.text }}</div>
            </div>
            <div class="notification__close">
                <Close @click="closeNotification(notic.timer)" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeNotification } from '../../stores/notification.store'
import { storeToRefs } from 'pinia';
import { Close } from '../Icons';


const notificationStore = storeNotification()

const { show, error, typeNotice } = storeToRefs(notificationStore);

function closeNotification(timer) {
    notificationStore.close(timer)
}

</script>

<style lang="scss" scoped>
.notice {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 30px;
    top: 20px;
    gap: 10px;
    z-index: 15;
}

.notification {
    position: relative;
    user-select: none;
    background-color: #fff;
    width: 300px;
    padding: 10px;
    display: flex;
    gap: 15px;
    border: 1px solid #EAECF0;
    border-radius: 20px;
    color: #272D37;
    z-index: 1;

    &__text {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 100%;
        max-width: 210px;

        &_title {

            word-wrap: break-word;
            font-size: 18px;
            font-weight: 500;

        }

        &_text {
            font-size: 14px;
            font-weight: 400;
        }
    }

    &__close {
        position: absolute;
        right: 10px;
        top: 5px;
        cursor: pointer;
    }

    &_error {
        width: 48px;
        height: 48px;
        background-image: url('../../assets/img/Notification/Error.svg');
        background-repeat: no-repeat;
        background-size: auto;
    }

    &_warning {
        width: 48px;
        height: 48px;
        background-image: url('../../assets/img/Notification/Warning.png');
        background-repeat: no-repeat;
        background-size: auto;
    }

    &_info {
        width: 48px;
        height: 48px;
        background-image: url('../../assets/img/Notification/Info.svg');
        background-repeat: no-repeat;
        background-size: auto;
    }

    &_success {
        width: 48px;
        height: 48px;
        background-image: url('../../assets/img/Notification/Success.svg');
        background-repeat: no-repeat;
        background-size: auto;
    }
}
</style>