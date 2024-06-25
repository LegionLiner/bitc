<template>
    <div class="login">
        <Login />
    </div>
</template>

<script setup>
import Login from '../components/Sistem/Login.vue';
</script>

<style lang="scss" scoped>
.login {
    margin: auto;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
    width: 320px;
    padding: 24px;
    border-radius: 12px;
    border: 1px solid var(--blue-main-hover);
    color: var(--272D37, #272D37);
    min-height: 1vh;
}
</style>