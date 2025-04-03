<script setup lang="ts">
import MainTemplate from './views/template.vue';
</script>

<template>
  <div id="app">
    <MainTemplate />
  </div>
</template>




<style scoped>
h1, h2 { text-align: center; }
.form { display: flex; flex-direction: column; gap: 10px; align-items: center; }
input, select { padding: 10px; width: 300px; font-size: 16px; }
button { padding: 10px; margin: 5px; cursor: pointer; background-color: #42b883; color: white; border: none; }
button:hover { background-color: #35495e; }
</style>
