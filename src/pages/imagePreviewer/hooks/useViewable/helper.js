// 根据内容宽高、容器宽高、内容占容器比例，计算出初始缩放比
export const calculateScale = (contentSize, containerSize, percentage) => {
  const { width: contentWidth, height: contentHeight } = contentSize;
  const { width: containerWidth, height: containerHeight } = containerSize;
  const initialScale = Math.min(
    (containerWidth * percentage) / contentWidth,
    (containerHeight * percentage) / contentHeight
  );
  const scale = Math.floor(initialScale * 100) / 100;
  return scale;
};

export const calculateCenterPosition = (contentSize, containerSize) => {
  const position = {
    x: Math.round((containerSize.width - contentSize.width) / 2),
    y: Math.round((containerSize.height - contentSize.height) / 2),
  };
  return position;
};
