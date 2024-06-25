import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { NOTIFICATION_TYPE } from '../constants/notification/notification'

export const storeNotification = defineStore('storeNotification', () => {

    const show = ref(false);
    const error = ref([])
    const typeNotice = ref(NOTIFICATION_TYPE.ERROR);



    function setNotification(title, text, { type = null, durationMs = 5000 } = {}) {
        if (text && title) {
            open();

            typeNotice.value = type || NOTIFICATION_TYPE.ERROR;

            const timer = setTimeout(() => {
                close(timer);
            }, durationMs)
            error.value.push({ title, text, timer, show: true })
        }
    }

    function close(timer) {
        clearTimeout(timer)
        error.value = error.value.filter(item => item.timer != timer)
        if (error.value.length < 1) show.value = false;
    }
    function open() {
        show.value = true
    }

    return {
        show, typeNotice, error,
        setNotification, close, open
    }
})
