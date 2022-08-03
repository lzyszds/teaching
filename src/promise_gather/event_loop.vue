<script setup>
import { proxyRefs } from 'vue';

const item = null
async function async1() {
  console.log('A')
  await async2()
  console.log('B')
}
console.log('D')
async function async2() {
  console.log('C')
}
setTimeout(() => {
  console.log('E')
}, 0)
async1()

new Promise(resolve => {
  console.log('F')
  resolve()
}).then(() => {
  console.log('G')
})
</script>

<template>
  <div>

  </div>
</template>

<style scoped>
</style>

