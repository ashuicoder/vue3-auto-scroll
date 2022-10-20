<template>
  <div class="wrapper">
    <vue3-auto-scroll>
      <ul>
        <li v-for="item in count" :key="item">这是第{{ item }}个元素</li>
      </ul>
    </vue3-auto-scroll>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(40);
</script>

<style scoped>
.wrapper {
  height: 300px;
  border: 1px solid #ccc;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
</style>
