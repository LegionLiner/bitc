<template>
    <Header />
    <RouterView />
    <!--<Notification />-->
    <Footer />
    <EventPopUp title="Уведомление" btnTytle="Закрыть"
        text="Вы долго были неактивны. Произведен выход из системы. Авторизуйтесь, пожалуйста, заново!" ref="eventPopUpRef"
        @hidePopUp="hidePopUp" />
  <FooterService/>

</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { RouterView } from 'vue-router';
import { storeToRefs } from 'pinia';
import Header from './components/Sistem/Header.vue';
/*import Notification from './components/PopUp/Notification.vue';*/
import Footer from './components/Sistem/Footer.vue';
import FooterService from "./components/FooterService.vue";
import { storeAuth } from './stores/auth.store';
import { storeFilter } from './stores/filter.store';
import { storeUser } from './stores/user.store';
import { EventPopUp } from './components/PopUp';


const authStore = storeAuth()
const filterStore = storeFilter()
const userStore = storeUser()
const { isLogin, logOutEvent } = storeToRefs(authStore)
const eventPopUpRef = ref(null)

function hidePopUp() {
    eventPopUpRef.value = false
}

onMounted(() => {
    if (isLogin.value) {
        userStore.getUserInfo()
        filterStore.getFilterP2P()
        filterStore.getFilterSpot()
    }
})
watch(logOutEvent, () => {
    if (logOutEvent.value == true) {
        eventPopUpRef.value?.open()
    }
})
</script>



<style scoped></style>