# 介绍

一个基于`requestAnimationFrame`的`vue3`自动滚动组件，支持`typescript`

# 使用

## 局部导入

```js
import { Vue3AutoScroll } from "vue3-auto-scroll";
import "vue3-auto-scroll/dist/style.css";
```

## 全局导入

```js
import Vue3AutoScroll from "vue3-auto-scroll";
import "vue3-auto-scroll/dist/style.css";
app.use(Vue3AutoScroll);
```

## 例子

```vue
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

const count = ref(20);
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
```

**注意**：要给组件的父元素设置**高度**和**overflow: hidden**，原因是组件高度是设置成`height:100%`的

# props

| 属性          | 类型    | 默认值 | 描述                       |
| ------------- | ------- | ------ | -------------------------- |
| hideScrollBar | Boolean | true   | 是否隐藏滚动条             |
| speed         | Number  | 1      | 滚动速度                   |
| delay         | Number  | 1000   | 延迟滚动时间（单位：毫秒） |
| control       | Boolean | true   | 鼠标移入是否暂停滚动       |
| backSpeed     | Boolean | 10     | 回到顶部滚动速度           |
