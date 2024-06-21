# 基于 vue3 hook 的图片查看

最近在为内部平台实现一个抠图功能页，以[创客贴在线抠图](https://mater.chuangkit.com/)为参考，支持手动/自动抠图，擦除/修补，背景，裁剪等功能。

图片查看是其中一个功能，需要支持图片放大缩小，拖动位置，当然不限于图片作为内容，画布(canvas元素)等不受影响，尝试学习如何通过 hook 方式独立出**内容查看**的实现；

## 准备

**VueUse学习**

VueUse 作为优秀实践，官网一些章节值得花几分钟一看：

[Best Practice（官网）](https://vueuse.org/guide/best-practice.html)
[最佳实践（中文）](http://www.vueusejs.com/guide/best-practice.html)

[Components（官网）](https://vueuse.org/guide/components.html)
[组件（中文）](http://www.vueusejs.com/guide/components.html)

[Guidelines（官网）](https://vueuse.org/guidelines.html)
[使用准则（中文）](http://www.vueusejs.com/guidelines.html)

以 vueuse 的 `useDraggable` https://vueuse.org/core/useDraggable/
使用准则
