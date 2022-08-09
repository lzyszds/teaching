<script setup lang="ts">
import { ref } from 'vue'
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
]
const count = ref(10) //10*10
let remClick = false
const value: any[any] = ref(Array.from({ length: count.value }, (_, x) =>
  Array.from({ length: count.value }, (_, y) => {
    return {
      x, y, 'xy': x * 10 + y, isOn: false
    }
  })
))
const arr: any = []
document.oncontextmenu = function () { return false; } //禁用鼠标右键

for (let i = 0; i < count.value; i++) {
  var randx = Math.floor(Math.random() * 10)
  var randy = Math.floor(Math.random() * 10)
  value.value[randx][randy].mine = true
  clone()
  arr.push([randx, randy])
}
function clone() {
  arr.forEach((element: any, index: any) => {
    if ([randx, randy].toString() === element.toString()) {
      randx = Math.floor(Math.random() * 10)
      randy = Math.floor(Math.random() * 10)
      clone()
    }
  });
}

const getBgColor = (x: any, y: any) => {
  for (let i in arr) {
    if ([x, y].toString() === arr[i].toString()) return true
  }
}
function addPiece(event: any) {
  event.target.style.backgroundColor = 'rgb(0, 0, 0)'
}
function updateNumbers(x: any, y: any) {
  const xArr = [x - 1, x, x + 1], yArr = [y - 1, y, y + 1]
  let counts: any = null
  xArr.forEach(res => {
    yArr.forEach(item => {
      if (res < 0 || item < 0 || res >= count.value || item >= count.value) return
      for (let i in arr) {
        if ([res, item].toString() === arr[i].toString()) counts++
      }
    })
  })
  return counts
}
function openBorder(x: any, y: any) {
  if (remClick) return
  for (let i in arr) {
    if ([x, y].toString() === arr[i].toString()) {
      endGame()
    } else {
      value.value[x][y].isOn = true
    }
  }
  for (const row of value.value) {
    for (const block of row) {
      value.value[block.x][block.y].number = updateNumbers(block.x, block.y)
    }
  }
  if (value.value[x][y].number === null) { //如果没有雷，则打开周围的方块
    const xArr = [x - 1, x, x + 1], yArr = [y - 1, y, y + 1]
    xArr.forEach(res => {
      yArr.forEach(item => {
        if (res < 0 || item < 0 || res >= count.value || item >= count.value || value.value[res][item].isOn) return
        if (value.value[res][item].number === null) {
          openBorder(res, item)
        } else {
          value.value[res][item].isOn = true
        }
      })
    })
  }
  // if()
}
const setColor = [
  'color:rgb(0, 0, 0)',
  'color:rgba(255,0,255)',
  'color:rgba(0,255,200)',
  'color:rgba(0，0，255)',
  'color:rgba(0，255，0)',
  'color:rgba(255，255，0)',
  'color:rgba(255,125,0)',
  'color:rgba(255，0，0)',
]
function endGame() {
  alert('踩到雷了！')
  value.value.forEach((item: any) => {
    item.forEach((res: any) => {
      if (res.mine) res.isOn = true
    })
  })
  remClick = true
}
</script>

<template>
  <div class="card">
    <div v-for="(item, index) in count" :key="index" class="col">
      <div @contextmenu="addPiece" @click="openBorder(res - 1, item - 1)" v-for="(res, i) in count" :key="i" class="row"
        :class="{ 'none': value[res - 1][item - 1].isOn }" :style="setColor[value[res - 1][item - 1].number]">
        <template v-if="value[res - 1][item - 1].isOn">
          {{ value[res - 1][item - 1].mine ? null : value[res - 1][item - 1].number }}
          <img v-if="getBgColor(res - 1, item - 1)"
            src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1.4em' height='1.4em' preserveAspectRatio='xMidYMid meet' viewBox='0 0 24 24'%3E%3Cpath fill='currentColor' d='M23 13v-2h-3.07a7.988 7.988 0 0 0-1.62-3.9l2.19-2.17l-1.43-1.43l-2.17 2.19A7.988 7.988 0 0 0 13 4.07V1h-2v3.07c-1.42.18-2.77.74-3.9 1.62L4.93 3.5L3.5 4.93L5.69 7.1A7.988 7.988 0 0 0 4.07 11H1v2h3.07c.18 1.42.74 2.77 1.62 3.9L3.5 19.07l1.43 1.43l2.17-2.19c1.13.88 2.48 1.44 3.9 1.62V23h2v-3.07c1.42-.18 2.77-.74 3.9-1.62l2.17 2.19l1.43-1.43l-2.19-2.17a7.988 7.988 0 0 0 1.62-3.9H23M12 8a4 4 0 0 0-4 4H6a6 6 0 0 1 6-6v2Z'/%3E%3C/svg%3E" />
        </template>
        <!-- {{ (res - 1) + ',' + (item - 1) }} -->
      </div>
    </div>
  </div>
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
