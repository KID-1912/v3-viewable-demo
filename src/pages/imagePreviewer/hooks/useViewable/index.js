import { calculateInitialScale, calculateCenterPosition } from "./helper.js";

const useViewable = (target, options) => {
  let {
    containerElement,
    initialSizePercentage = 1,
    scaleStep = 0.02,
    onDrag,
    onScale,
  } = options;
  let contentElement;
  const position = ref({ x: 0, y: 0 });
  const originSize = { width: 0, height: 0 };
  const scale = ref(1);
  const width = ref();
  const height = ref();

  const initial = () => {
    width.value = contentElement.clientWidth;
    height.value = contentElement.clientHeight;
    originSize.width = width.value;
    originSize.height = height.value;
    const getContentSize = () => ({
      width: width.value,
      height: height.value,
    });
    const getContainerSize = () => ({
      width: containerElement.clientWidth,
      height: containerElement.clientHeight,
    });
    scale.value = calculateInitialScale(
      getContentSize(),
      getContainerSize(),
      initialSizePercentage
    );
    position.value = calculateCenterPosition(
      getContentSize(),
      getContainerSize()
    );
  };

  watch(scale, (newValue, oldValue) => {
    if (scale.value <= 0) return (scale.value = 0.01);
    if (scale.value >= 999) return (scale.value = 9.99);
    const oldWidth = width.value;
    const oldHeight = height.value;
    width.value = Math.round(newValue * originSize.width);
    height.value = Math.round(newValue * originSize.height);
    position.value.x -= Math.round((width.value - oldWidth) / 2);
    position.value.y -= Math.round((height.value - oldHeight) / 2);
  });

  const move = ({ x, y }) => {
    position.value = { x, y };
    onDrag?.({ x, y });
  };

  const wheel = (event) => {
    const deltaY = event.deltaY;
    console.log(deltaY);
    if (deltaY === 0) return;
    const diff = deltaY > 0 ? -scaleStep : scaleStep;
    const newScale = scale.value + diff;
    scale.value = +newScale.toFixed(2);
    onScale?.(event);
    event.preventDefault();
  };

  onMounted(() => {
    contentElement = target.value;
    containerElement = containerElement || contentElement.parentNode;
    if (contentElement.clientWidth && contentElement.clientHeight) initial();
    useEventListener(contentElement, "load", initial, true);
    useDraggable(contentElement, { onMove: move });
    useEventListener(containerElement, "wheel", wheel);
  });

  return {
    width,
    height,
    position,
    scale,
    style: computed(
      () =>
        `width: ${width.value}px;
        height: ${height.value}px;
        left: ${position.value.x}px;
        top: ${position.value.y}px;`
    ),
  };
};

export { useViewable };
