<script setup lang="ts">
// import { ref } from "vue";
// This starter template is using Vue 3 <script setup> SFCs

import { onMounted } from 'vue';
const WIDTH = 800
const HEIGHT = 800
const el = $ref<HTMLCanvasElement>()
const ctx = $computed(() => el.getContext('2d')!)

interface Point {
  x: number
  y: number
}
interface Branch {
  start: Point
  length: number
  angle: number
}
function init() {
  ctx.strokeStyle = '#000'
  ctx.lineWidth = 1
  // const startPoint = { x: WIDTH / 2, y: HEIGHT }
  // const endPoint = { x: WIDTH / 2, y: HEIGHT / 2 }
  // lineTo(startPoint, endPoint)
  const branch = {
    start: { x: WIDTH / 2, y: HEIGHT },
    length: 10,
    angle: -Math.PI / 2
  }
  step(branch)
}
const pendingTasks: Function[] = [] //实现一帧动画一帧的加载枝条
function step(b: Branch, depth = 0) {
  const end = getEndPoint(b)
  drawBranch(b)
  //左树枝
  if (depth < 4 || Math.random() < 0.5)

    pendingTasks.push(() => step({ start: end, length: b.length + (Math.random() * 10 - 5), angle: b.angle - 0.3 * Math.random() }, depth + 1))
  //右树枝
  if (depth < 4 || Math.random() < 0.5)
    pendingTasks.push(() => step({ start: end, length: b.length + (Math.random() * 10 - 5), angle: b.angle + 0.3 * Math.random() }, depth + 1))
}
function frame() {
  const arr = [...pendingTasks]
  pendingTasks.length = 0
  arr.forEach(fn => fn())
}
let countFrame: number = 0
function startFrame() {
  requestAnimationFrame(() => {
    countFrame++
    if (countFrame % 3 == 0) {
      frame()
    }
    startFrame()

  })
}
startFrame()
function lineTo(p1: Point, p2: Point) {
  ctx.beginPath()
  ctx.moveTo(p1.x, p1.y)//把画笔移动到指定的坐标
  ctx.lineTo(p2.x, p2.y)//绘制一条从当前位置到指定坐标(x2, y2)的直线.
  ctx.stroke()
}
function getEndPoint({ start, length, angle }: Branch) {
  return {
    x: start.x + length * Math.cos(angle),
    y: start.y + length * Math.sin(angle)
  }
}
function drawBranch(B: Branch) {
  const end = getEndPoint(B)
  lineTo(B.start, end)
}
onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <canvas width="800" height="800" ref="el"></canvas>
  </div>
</template>

<style scoped>
div {
  width: 100%;
  text-align: center;
}

div canvas {
  border: 4px solid #8788;
}
</style>
