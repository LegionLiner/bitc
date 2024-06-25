<template>
    <div class="background">
        <slot></slot>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.background {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #00000040;
    position: fixed;
    display: flex;
    z-index: 11;
}
</style>