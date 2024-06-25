<template>
    <div class="auth">
        <Input class="element" type="text" :placeholder="$t('loginPopUp.placeholder.email')" v-model:value="email" />
        <InputPass class="element" :placeholder="$t('loginPopUp.placeholder.password')" v-model:value="password" />
        <span class="blue">{{ $t('loginPopUp.forgotPassword') }}</span>
    </div>
    <Button class="element" :label="$t('loginPopUp.btn')" :type="BUTTON_TYPE.PRIMARY" @click="login"
        :loading="loading"></Button>
    <div class="reg">
        <div class="">{{ $t('loginPopUp.notReg') }}</div>
        <div class="reg__blue" @click="reg">{{ $t('loginPopUp.createAccount') }}</div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { storeAuth } from '../../stores/auth.store'
import { storeUser } from '../../stores/user.store'
import { storeFilter } from '../../stores/filter.store';
import { BUTTON_TYPE } from '../../constants/enum';
import { useRouter } from 'vue-router';
import { Button, Input, InputPass } from '../UI';
import { NAME_PAGE } from '../../constants/enum';

const userStore = storeUser()
const authStore = storeAuth()
const filterStore = storeFilter()
const router = useRouter();
const { t } = useI18n({ useScope: 'global' })

const props = defineProps({
    popup: {
        type: Boolean
    }
})
const emit = defineEmits(['hidePopUp','openRegPopUp'])

const isShow = ref(false);
const email = ref(null)
const password = ref(null)
const loading = ref(false)

async function login() {
    loading.value = true
    const status = await authStore.login(email.value, password.value);
    if (status) {
        await filterStore.getFilterSpot()
        await userStore.getUserInfo()
        await filterStore.getFilterP2P()
        router.push({ name: NAME_PAGE.P2P })
    }
    loading.value = false

    if(props.popup){
        emit('hidePopUp')
        isShow.value = false;
    }
}

function reg() {
    if(props.popup){
        emit('openRegPopUp')
    }
    else router.push({ name: NAME_PAGE.REGISTRATION })
}
</script>

<style lang="scss" scoped>
.login {
    user-select: none;
}

.auth {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 8px;
    user-select: none;
}

.element {
    width: 100%;
}

.blue {
    cursor: pointer;
    color: #4D80EF;
    font-size: 12px;
    font-weight: 500;
    margin-bottom: 8px;
}

.reg {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;

    &__blue {
        cursor: pointer;
        color: #4D80EF;
    }
}
</style>