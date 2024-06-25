<template>
    <div class="reg">
        <Registration />
    </div>
</template>

<script setup>
import Registration from '../components/Sistem/Registration.vue';
</script>

<style lang="scss" scoped>
.reg {
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

}
</style>