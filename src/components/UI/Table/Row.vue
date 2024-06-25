<template>
    <div class="row" :class="{ 'row_header': isHeader, 'row_center': center }" @click="stepProcess">
        <slot></slot>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const stepProcessPopUpRef = ref(null)
defineProps({
    isHeader: Boolean,
    center: Boolean,
})

function stepProcess() {
    stepProcessPopUpRef.value?.open()
}
</script>

<style lang="scss" scoped>
.row {
    display: flex;

    &_header {
        font-size: 14px;
        font-weight: 600;
        color: #828d96;
        background: rgba(244, 245, 247, 0.3);
        margin-bottom: 10px;
    }
}

@media screen and (max-width: 900px) {
    .row_center {
        justify-content: space-between;
    }
}
</style>