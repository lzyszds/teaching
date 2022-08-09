<script setup lang="ts">
import Mines from 'src/page/001/mine.vue'
import { ref, nextTick } from 'vue'
const Again = ref(true)
const startAllOverAgain = () => {
  Again.value = false
  nextTick(() => {
    Again.value = true
  })
}
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
]
</script>

<template>
  <div style="display:flex;justify-content: center;">
    <div style="margin-right:30px">
      <img src="/vite.svg" style="width: 100px; height: 100px;cursor: pointer;" alt="重新开始" @click="startAllOverAgain" />
      <p style="text-align:center">重新开始</p>
    </div>
    <div>
      <el-image style="width: 100px; height: 100px" src="/vue.svg" :preview-src-list="srcList" :initial-index="4"
        fit="cover" />
      <p style="text-align:center">获取提示</p>
    </div>
  </div>
  <Mines v-if="Again" />
</template>

<style scoped>
.card {
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.col {
  display: flex;
  width: 100%;
  justify-content: center;

}

.row {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border: 1px solid #eee;
  background-color: #eee;
  cursor: pointer;
  margin-left: 3px;
  margin-top: 3px;
  user-select: none;
  transition: .2s;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
}

.row:hover {
  background-color: rgba(0, 0, 0, 0.15);
}


.row.none {
  background-color: #fff;
}
</style>
