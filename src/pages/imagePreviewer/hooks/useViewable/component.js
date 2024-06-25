import { useViewable } from "./index.js";
import { defineComponent, defineExpose, h, reactive, ref } from "vue";

export const UseViewable = defineComponent({
  name: "UseViewable",
  props: {
    containerElement: {
      type: Object,
      default: null,
      validator(value) {
        return value instanceof Element;
      },
    },
    initialSizePercentage: { type: Number, default: 1 },
    scaleStep: { type: Number, default: 0.02 },
    onDrag: { type: Function, default: () => {} },
    onScale: { type: Function, default: () => {} },
  },
  setup(props, { slots, expose }) {
    const target = ref(null);
    const data = reactive(useViewable(target, { ...props }));
    expose(data);
    return () =>
      h(
        "div",
        { ref: target, style: data.style },
        slots.default ? slots.default(data) : []
      );
  },
});
