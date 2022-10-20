<template>
  <div
    class="vue3-auto-scroll-wrapper"
    :class="[hideScrollBar ? 'hide-scroll-bar' : '']"
    ref="wrapperRef"
  >
    <div ref="scrollRef">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import elementResizeDetectorMaker from "element-resize-detector";

interface IProps {
  hideScrollBar?: boolean;
  speed?: number;
  delay?: number;
  control?: boolean;
  backSpeed?: number;
}
const props = withDefaults(defineProps<IProps>(), {
  hideScrollBar: true,
  speed: 1,
  delay: 1000,
  control: true,
  backSpeed: 10,
});

const wrapperRef = ref<HTMLDivElement | null>(null);
const scrollRef = ref<HTMLDivElement | null>(null);
const wrapperHeight = ref(0);
const scrollHeight = ref(0);
const scrollTop = ref(0);
let timer: any = null;
let scrollId: any = null;

const init = () => {
  if (timer) clearTimeout(timer);
  if (scrollId) cancelAnimationFrame(scrollId);
  wrapperHeight.value = wrapperRef.value!.clientHeight;
  scrollHeight.value = scrollRef.value!.clientHeight;

  if (scrollHeight.value < wrapperHeight.value) return;
  timer = setTimeout(() => {
    scroll();
  }, props.delay);
  if (props.control) {
    control();
  }
};

const control = () => {
  wrapperRef.value?.addEventListener("mouseenter", handlepParse);
  wrapperRef.value?.addEventListener("mouseleave", handleContinue);
};

const handlepParse = () => {
  if (timer) clearTimeout(timer);
  if (scrollId) cancelAnimationFrame(scrollId);
  wrapperRef.value?.addEventListener("scroll", handleScrollByMouse);
};

const handleContinue = () => {
  wrapperRef.value!.removeEventListener("scroll", handleScrollByMouse);
  timer = setTimeout(() => {
    scroll();
  }, props.delay);
};

const handleScrollByMouse = () => {
  scrollTop.value = wrapperRef.value!.scrollTop;
};

const scroll = () => {
  scrollTop.value += props.speed;
  wrapperRef.value!.scrollTop = scrollTop.value;
  if (scrollHeight.value - scrollTop.value <= wrapperHeight.value) {
    end();
    return;
  }
  scrollId = requestAnimationFrame(scroll);
};

const end = () => {
  timer = setTimeout(() => {
    backTop();
  }, props.delay);
};

const backTop = () => {
  requestAnimationFrame(() => {
    scrollTop.value -= props.backSpeed;
    wrapperRef.value!.scrollTop = scrollTop.value;
    if (scrollTop.value <= 0) {
      timer = setTimeout(() => {
        scroll();
      }, props.delay);
      return;
    }

    backTop();
  });
};

onMounted(() => {
  const erd = elementResizeDetectorMaker();
  erd.listenTo(scrollRef.value, () => {
    init();
  });
});

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<style lang="scss" scoped>
.vue3-auto-scroll-wrapper {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.hide-scroll-bar {
  &::-webkit-scrollbar {
    background: transparent; /* make scrollbar transparent */
    width: 0px;
  }
}
</style>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
