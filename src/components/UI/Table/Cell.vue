<template>
    <div class="main-cell">
        <slot></slot>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.main-cell {
    padding: 12px;

    @media screen and (max-width: 900px) {
        padding: 12px 20px;
        white-space: nowrap;
    }
}
</style>