<script setup>
import { useViewable } from "./hooks/useViewable/index.js";

const viewableRef = ref(null);
let timeoutId;
const { scale, style, calcScaleBySizePercentage, setScale } = useViewable(
  viewableRef,
  {
    initialSizePercentage: 0.8,
    onScale(event) {
      const cursorName =
        event.deltaY > 0 ? "cursor-zoom-out" : "cursor-zoom-in";
      viewableRef.value.classList.add(cursorName);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        viewableRef.value.classList.remove("cursor-zoom-in");
        viewableRef.value.classList.remove("cursor-zoom-out");
      }, 300);
    },
  }
);

const proportionMode = ref("optimal"); // optimal:最佳比例 origin:原比例
const handleToggleProportionMode = () => {
  const mode = proportionMode.value === "optimal" ? "origin" : "optimal";
  if (mode === "optimal") {
    setScale(calcScaleBySizePercentage(0.8));
  }
  if (mode === "origin") {
    setScale(1);
  }
  proportionMode.value = mode;
};
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
      <button class="px-4px" @click="scale -= 0.05">-</button>
      <div class="px-4px w-50px">{{ `${parseInt(scale * 100)}%` }}</div>
      <button class="px-4px" @click="scale += 0.05">+</button>
      <div class="px-4px cursor-pointer" @click="handleToggleProportionMode">
        {{ proportionMode === "optimal" ? "&emsp;1:1&emsp;" : "最佳比例" }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control-bar {
  position: absolute;
  display: inline-flex;
  min-width: 120px;
  right: 4%;
  bottom: 4%;
  padding: 4px 12px;
  color: #fff;
  border-radius: 4px;
  background-color: #c0c0c0;
  user-select: none;
}
.cursor-zoom-in {
  cursor: zoom-in;
}
.cursor-zoom-out {
  cursor: zoom-out;
}
</style>
