<script setup lang='ts'>
import router from 'src/router/router';
import deepCopy from 'src/utils/deepcopy';
const pathArr = deepCopy(router.getRoutes())
const path = pathArr.splice(1, pathArr.length - 1)
</script>

<template>
  <div id="home">
    <div style="height:438px">
      <img style="width: 100%;height: 438px;object-fit: cover;" src="src/assets/lzybg.png" alt="">
    </div>
    <div> 练手项目 </div>
    <div class="main">
      <RouterLink v-for="(item, index) in path" :key="index" :to="item.path">
        <el-button link>
          {{ item.path.replaceAll('/', '') }}&nbsp;&nbsp;&nbsp;{{ item.name }}
        </el-button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 300px;
  height: 300px;
  margin: 20px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  justify-content: center;
  border-radius: 5px;
  align-items: center;
  box-shadow: 1px 1px 4px 3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.main .el-button+.el-button {
  margin-left: 0;
}

#home {
  /* max-width: 1280px; */
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
</style>
