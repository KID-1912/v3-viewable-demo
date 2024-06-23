<script setup>
import { useViewable } from "./hooks/useViewable/index.js";

const viewableRef = ref(null);
let timeoutId;
const { scale, style, setScale } = useViewable(viewableRef, {
  initialSizePercentage: 0.8,
  onScale(event) {
    const cursorName = event.deltaY > 0 ? "cursor-zoom-out" : "cursor-zoom-in";
    viewableRef.value.classList.add(cursorName);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      viewableRef.value.classList.remove("cursor-zoom-in");
      viewableRef.value.classList.remove("cursor-zoom-out");
    }, 300);
  },
});
</script>

<template>
  <div class="h-100vh relative overflow-hidden">
    <img
      ref="viewableRef"
      :style="style"
      class="absolute cursor-move max-w-none"
      src="@/assets/images/post-bg-tree.jpg"
      draggable="false"
    />
    <div class="control-bar">
      <button @click="scale -= 0.05">-</button>
      {{ `${parseInt(scale * 100)}%` }}
      <button @click="scale += 0.05">+</button>
      <div @click="handleReset">reset</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control-bar {
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 120px;
  right: 4%;
  bottom: 4%;
  padding: 4px 12px;
  color: #fff;
  border-radius: 4px;
  background-color: #c0c0c0;
}
.cursor-zoom-in {
  cursor: zoom-in;
}
.cursor-zoom-out {
  cursor: zoom-out;
}
</style>
