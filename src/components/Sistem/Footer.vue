`<template>
    <div class="footer">
        <div class="footer__btn">
            <router-link :to="{ name: NAME_PAGE.ARBITRAGE }" class="router-link">
                <ArrowLigaments />
                <div class="footer__btn_text">{{ $t('footer.arbitrage') }}</div>
            </router-link>
        </div>
        <div class="footer__btn">
            <router-link :to="{ name: NAME_PAGE.SUBSCRIPTION }" class="router-link">
                <Rates />
                <div class="footer__btn_text">{{ $t('footer.rates') }}</div>
            </router-link>
        </div>
        <div class="footer__btn">
            <div class="footer__popup" v-if="showPopUp">
                    <div class="footer__row" @click="routP2Pspread">
                        <ArrowP2PSpread />
                        {{ $t('footer.p2pspread') }}
                    </div>
                    <div class="footer__row" @click="routCalculatorSpread">
                        <Calculator />
                        {{ $t('footer.calculatorSpread') }}
                    </div>
                    <div class="footer__row" @click="routCalculatorPercent">
                        <Calculator />
                        {{ $t('footer.calculatorPercent') }}
                    </div>
                    <div class="footer__row" @click="routHelp">
                        <Help />
                        {{ $t('footer.help') }}
                    </div>
                </div>
            <router-link to="" class="router-link" @click.stop="togglePopup">
                <Edit />
                <div class="footer__btn_text">{{ $t('footer.additionally') }}</div>
            </router-link>
        </div>
        <div class="footer__btn" v-if="isLogin">
            <router-link :to="{ name: NAME_PAGE.SETTINGS }" class="router-link">
                <MyProfileGray class="color" />
                <div class="footer__btn_text">{{ $t('footer.profile') }}</div>
            </router-link>
        </div>
        <div class="footer__btn" v-else>
            <router-link @click="login" to="" class="router-link">
                <MyProfileGray class="color" />
                <div class="footer__btn_text">{{ $t('footer.login') }}</div>
            </router-link>
        </div>
        <RegistrationPopUp ref="regPopUpRef" @openLoginPopUp="login" />
        <LoginPopUp ref="logPopUpRef" @openRegPopUp="registration" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';
import { RegistrationPopUp, LoginPopUp } from '../PopUp'
import { NAME_PAGE } from '../../constants/enum';
import { ArrowLigaments, Rates, Help, MyProfileGray,ArrowP2PSpread,Calculator,Edit } from '../Icons';
import { storeAuth } from '../../stores/auth.store';
import { storeToRefs } from 'pinia';
import clickOutside from '../../directives/clickOutSide';

const authStore = storeAuth()
const router = useRouter();
const { isLogin } = storeToRefs(authStore)
const { t } = useI18n({ useScope: 'global' })
const regPopUpRef = ref(null)
const logPopUpRef = ref(null)
const showPopUp = ref(false)
clickOutside(showPopUp, hidePopUp);

function login() {
    logPopUpRef.value?.open()
}
function registration() {
    regPopUpRef.value?.open()
}
function togglePopup(){
    showPopUp.value = !showPopUp.value
}
function hidePopUp(){
    showPopUp.value = false
}
function routP2Pspread(){
    router.push({ name: NAME_PAGE.P2PSPREAD });
    hidePopUp()
}
function routCalculatorSpread(){
    router.push({ name: NAME_PAGE.CALCULATOR_SPREAD });
    hidePopUp()
}
function routCalculatorPercent(){
    router.push({ name: NAME_PAGE.CALCULATOR_PERCENT });
    hidePopUp()
}
function routHelp(){
    router.push({ name: NAME_PAGE.HELP });
    hidePopUp()
}
</script>

<style lang="scss" scoped>
.footer {
    display: none;

    @media screen and (max-width: 900px) {
        position: fixed;
        background: #fff;
        bottom: 0px;
        left: 0px;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        align-items: end;
        padding: 14px;
        border-radius: 12px 12px 0px 0px;
        border-top: 1px solid #EAECF0;
        z-index: 10;
        /*        display: none;*/
    }
    &__popup {
        position: absolute;
        bottom: 74px;
        border-radius: 6px;
        padding: 10px 14px;
        gap: 14px;
        border: 1px solid #EAECF0;
        display: flex;
        flex-direction: column;
        background: #FFFFFF;
        z-index: 3;
    }
    &__row {
        display: flex;
        gap: 4px;
        align-items: center;
        cursor: pointer;
        width: 100%;
    }
}


.router-link {
    text-decoration: none;
    color: var(--gray-ligaments-text);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.router-link-active {
    color: var(--blue-main);
}


</style>