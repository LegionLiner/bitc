<template>
    <div class="auth">
        <Input type="text" :placeholder="$t('registrationPopUp.placeholder.login')"
            v-model:value="registrationData.firstName" />
        <Input type="text" :placeholder="$t('registrationPopUp.placeholder.email')"
            v-model:value="registrationData.email" />
        <InputPass type="text" :placeholder="$t('registrationPopUp.placeholder.password')"
            v-model:value="registrationData.password" />
        <InputPass type="text" :placeholder="$t('registrationPopUp.placeholder.repeatPassword')"
            v-model:value="registrationData.passwordAgain" />
    </div>
    <Button class="element" :label="$t('registrationPopUp.btn')" :type="BUTTON_TYPE.PRIMARY" @click="registration"></Button>
    <div class="registration-popup_login">
        <div class="">{{ $t('registrationPopUp.isReg') }}</div>
        <div class="blue" @click="login">{{ $t('registrationPopUp.login') }}</div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { BUTTON_TYPE } from '../../constants/enum';
import { Button, Input, InputPass } from '../UI';
import { storeAuth } from '../../stores/auth.store'
import { useRouter } from 'vue-router';
import ERRORS from '../../constants/errors/authError'
import { NAME_PAGE } from '../../constants/enum';

const authStore = storeAuth()
const router = useRouter();
const emit = defineEmits(['openLoginPopUp'])
const props = defineProps({
    popup: {
        type: Boolean
    }
})
const registrationData = ref({
    firstName: '',
    password: '',
    passwordAgain: '',
    email: '',
})

const matchPassword = (passwordAgain) => passwordAgain == registrationData.password
const validations = {
    firstName: { required: helpers.withMessage(ERRORS.REQUIRED, required) },
    password: { required: helpers.withMessage(ERRORS.REQUIRED, required), minLength: helpers.withMessage(ERRORS.MIN_LENGTH(8), minLength(8)) },
    passwordAgain: { required: helpers.withMessage(ERRORS.REQUIRED, required), minLength: helpers.withMessage(ERRORS.MIN_LENGTH(8), minLength(8)), matchPassword: helpers.withMessage(ERRORS.NO_MATCH_PASSWORD, matchPassword) },
    email: { required: helpers.withMessage(ERRORS.REQUIRED, required), email: helpers.withMessage(ERRORS.EMAIL, email) },
}
const $v = useVuelidate(validations, registrationData)


async function registration() {
    /*const resValidate = await $v.value.$validate()
    if (!resValidate) return console.log('ошибка валидации', $v)*/

    authStore.registration(registrationData.value)

    /*isShow.value = false;*/
}

function login() {
    if(props.popup){
        emit('openLoginPopUp')
    }
    else router.push({ name: NAME_PAGE.LOGIN })
}
</script>

<style lang="scss" scoped>
.reg {
    user-select: none;
}

.auth {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 8px;
}

.element {
    width: 100%;
}

.registration-popup_login {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    font-weight: 500;
    align-items: center;
}

.blue {
    cursor: pointer;
    color: #4D80EF;
    font-size: 14px;
    font-weight: 500;

}
</style>