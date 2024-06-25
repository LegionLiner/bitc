<template>
  <div class="header">
    <div class="menu-app">
      <Logo/>
      <div class="menu-app__settings">
        <router-link :to="{ name: NAME_PAGE.ARBITRAGE }" class="router-link">
          <ArrowLigaments/>
          {{
            $t(
                'header.router.arbitrage')
          }}
        </router-link>
        <router-link :to="{ name: NAME_PAGE.P2PSPREAD }" class="router-link">
          <ArrowP2PSpread/>
          {{ $t('header.router.p2pspread') }}
        </router-link>
        <router-link :to="{ name: NAME_PAGE.CALCULATOR }" class="router-link">
          <Calculator/>
          {{ $t('header.router.calculator') }}
        </router-link>
        <router-link :to="{ name: NAME_PAGE.HELP }" class="router-link">
          <HelpQuestion/>
          {{
            $t(
                'header.router.help')
          }}
        </router-link>
      </div>
    </div>
    <div class="menu-setting">
      <Language/>
      <div class="menu" v-if="authStore.isLogin">
        <div class="menu__header" @click.stop="togglePopUp">
          <MyProfile/>
          <div class="">{{ $t('header.profile') }}</div>
          <ArrowDown/>
        </div>
        <div class="menu__popup" v-if="showPopUp">
          <div class="menu__row" @click="routSetting">
            <Smile/>
            {{ $t('header.popUp.profile') }}
          </div>
          <div class="menu__row" @click="routBlackList">
            <BlackList/>
            {{ $t('header.popUp.blackList') }}
          </div>
          <div class="menu__row" @click="routSubscription">
            {{ $t('header.popUp.subscription') }}
          </div>
          <div class="menu__row" @click="logout">
            <Logout/>
            {{ $t('header.popUp.logout') }}
          </div>
        </div>
      </div>
      <div class="menu-login" v-else>
        <Button :label="$t(
                    'header.btn.login')" type="text" @click="login"></Button>
        <Button :label="$t('header.btn.createAccount')" type="primary" @click="registration"></Button>
      </div>
    </div>
    <RegistrationPopUp ref="regPopUpRef" @openLoginPopUp="login"/>
    <LoginPopUp ref="logPopUpRef" @openRegPopUp="registration"/>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import {useRouter} from 'vue-router';
import {NAME_PAGE} from '../../constants/enum';
import {storeAuth} from '../../stores/auth.store';
import Language from './Language.vue';
import {Button} from '../UI';
import {
  Logo,
  MyProfile,
  ArrowDown,
  Smile,
  BlackList,
  Logout,
  ArrowLigaments,
  HelpQuestion,
  Calculator,
  ArrowP2PSpread
} from '../Icons';
import {RegistrationPopUp, LoginPopUp} from '../PopUp'
import clickOutside from '../../directives/clickOutSide';

const authStore = storeAuth()
const router = useRouter();

const regPopUpRef = ref(null)
const logPopUpRef = ref(null)
const showPopUp = ref(false)
const {t} = useI18n({useScope: 'global'})
clickOutside(showPopUp, hidePopUp);

function hidePopUp() {
  showPopUp.value = false
}

function registration() {

  /*router.push({ name: NAME_PAGE.REGISTRATION })*/
  regPopUpRef.value?.open()
}

function login() {
  /*router.push({ name: NAME_PAGE.LOGIN })*/
  logPopUpRef.value?.open()
}

function routSetting() {
  router.push({name: NAME_PAGE.SETTINGS});
}

function routBlackList() {
  router.push({name: NAME_PAGE.BLACK_LIST});
}

function routSubscription() {
  router.push({name: NAME_PAGE.SUBSCRIPTION});
}

function logout() {
  authStore.logOut()
  togglePopUp()
}

function togglePopUp() {
  showPopUp.value = !showPopUp.value
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background: rgba(248, 250, 252, 0.9);
  padding: 20px;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  z-index: 5;
  -webkit-box-shadow: 4px 4px 31px -8px rgba(34, 60, 80, 0.15);

  @media screen and (max-width: 900px) {
    width: 100%;
  }
}

.menu-app {
  display: flex;
  gap: 40px;

  &__settings {
    display: flex;
    gap: 12px;
    align-items: center;
    font-size: 16px;
    font-weight: 500;

    @media screen and (max-width: 900px) {
      display: none;
    }
  }
}

.menu-setting {
  display: flex;
  align-items: center;
  gap: 45px;
}

.menu-login {
  display: flex;
  gap: 12px;
  align-items: center;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
  line-height: 17px;

  @media screen and (max-width: 900px) {
    display: none;
  }
}

.menu {
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;

  @media screen and (max-width: 900px) {
    display: none;
  }

  &__header {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__popup {
    position: absolute;
    border-radius: 6px;
    padding: 10px 8px;
    gap: 14px;
    border: 1px solid #EAECF0;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    z-index: 3;
    -webkit-box-shadow: 4px 4px 31px -8px rgba(34, 60, 80, 0.15);
  }

  &__row {
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    width: 100%;

    &:hover {
      background: #4d80ef29;
    }
  }
}

.router-link {
  padding: 6px 12px;
  background: var(--white);
  border-radius: 8px;
  text-decoration: none;
  color: var(--black);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.router-link-active {
  background: var(--white-link-active);
  color: #4D80EF;
}
</style>