<script setup>
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
const origin = ref('https://jx.bozrc.com:4433/player/?url=')
const input = ref('')
const inputs = ref('https://v.qq.com/x/cover/m441e3rjq9kwpsc/l0043ly8ohx.html')
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
function determine() {
  if (input.value === '') {
    ElMessage.error('请输入链接')
    return
  }
  dialogFormVisible.value = false
  inputs.value = input.value
}
</script>

<template>
  <div style="width:100vw;height:100vh">
    <ElButton style="position:absolute;" @click="dialogFormVisible = true">lzy</ElButton>
    <el-dialog v-model="dialogFormVisible" title="提示">
      接口选择:<el-select style="width: 20%;" v-model="origin" placeholder="Please select a zone">
        <el-option label="parwix" value="https://jx.bozrc.com:4433/player/?url=" />
        <el-option label="4kdv" value="https://jx.4kdv.com/?url=" />
      </el-select>
      <el-input style="width: 60%;" v-model="input" placeholder="想要更换的视频地址" autocomplete="off" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="determine">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <iframe allowfullscreen="true" width="100%" height="100%" :src="origin + inputs"></iframe>
  </div>
</template>

<style scoped>
iframe {
  border: none;
}
</style>
