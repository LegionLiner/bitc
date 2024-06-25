<template>
    <div class="table">
        <slot></slot>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.table {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 10px;
    padding: 16px;
    margin-top: 16px;
    -webkit-box-shadow: 4px 4px 31px -8px rgba(34, 60, 80, 0.15);

  @media screen and (max-width: 900px) {
      font-size: 14px;
      padding: 8px;
      display: grid;
      overflow-x: auto;
      overflow: -moz-scrollbars-none;
      -ms-overflow-style: none;
  }

    &::-webkit-scrollbar { 
        width: 0; 
    }
}
</style>