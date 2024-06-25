<template>
  <div v-for="(faq, index) of faq_array" :key="index" class="faq-wrapper" @click="toggleFaq(index)">
    <div :class="['faq', {active: activeFaq === index}]">
      <div class="faq-title">{{ faq.title }}</div>
      <div v-if="activeFaq === index" class="faq-description">{{ faq.description }}</div>
    </div>
    <div>
      <ArrowUpBold v-if="activeFaq === index" class="arrow-icon"/>
      <ArrowDownBold v-else class="arrow-icon"/>
    </div>
  </div>
</template>

<script setup>
import { ArrowUpBold, ArrowDownBold } from "../Icons/index.js";
import { ref } from "vue";

const props = defineProps({
  faq_array: {
    type: Array
  }
})

const activeFaq = ref(-1)

function toggleFaq(index) {
  activeFaq.value = (activeFaq.value === index) ? -1 : index;
}
</script>


<style scoped>
.faq-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  background: #fff;
  -webkit-box-shadow: 4px 4px 31px -12px rgba(34, 60, 80, 0.15);

}

.faq {
  flex: 1;
}

.faq-title {
  color: #2d3748;
  font-weight: bold;
  margin-bottom: 8px;
}

.faq-description {
  max-height: 0;
  overflow: hidden;
  transition: max-height 3s ease;
  color: #4a5568;
  white-space: pre-line;
}

.faq.active .faq-description {
  max-height: 100px; /* Adjust the height as per your content */
}

.arrow-icon {
  color: #4a5568;
  font-size: 18px;
}

.arrow-icon:hover {
  color: #2d3748;
}
</style>