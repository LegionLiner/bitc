<template>
  <div class="step-process">
    <div class="step-process__close">
      <Close @click="$emit('hidePopUp')"/>
    </div>
    <div class="wrap">
      <div class="step-process__title">
        {{ title }}
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script setup>
import {Close} from '../../Icons';


const props = defineProps({
  title: {
    type: String,
    required: true
  }
})

</script>

<style lang="scss" scoped>
.wrap {
  margin-left: 24px;
  border-radius: 4px;
  background:rgba(212, 234, 216, 0.6);

  @media screen and (max-width: 900px) {
    margin: 16px;
  }
}

.step-process {
  overflow: auto;
  width: 600px;
  background-color: #fff;
  height: 100%;
  position: absolute;
  right: 0;
  padding: 16px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #272D37;
  transform: translateX(100%);
  transition: transform 500ms;

  @media screen and (max-width: 900px) {
    width: 100%;
    height: auto;
    max-height: 90%;
    transform: translateY(100%);
    transition: transform 500ms;
    bottom: 0;
    right: none;
    border-radius: 12px 12px 0px 0px;
  }

  &__close {
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
  }

  &__title {
    color: #2BAD63;
    font-size: 20px;
    font-weight: 600;
    padding: 0px 18px;

    @media screen and (max-width: 900px) {
      font-size: 20px;
    }
  }
}
</style>