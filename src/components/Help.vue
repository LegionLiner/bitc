<template>
  <div>
    <div class ="p2p_faq_block">
      <Faq :faq_array="P2P_FAQ"/>
      </div>
  </div>
</template>

<script setup>
import {P2P_FAQ} from "../constants/enum/index.js";
import Faq from "../../src/components/Faq/Faq.vue";
</script>

<style lang="scss" scoped>

.p2p_faq_block {
  background: #fff;
  padding: 16px 16px;
  border-radius: 10px;
  -webkit-box-shadow: 4px 4px 31px -12px rgba(34, 60, 80, 0.15);
}
</style>