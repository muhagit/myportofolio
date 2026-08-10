<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { gsap } from 'gsap'

const containerRef = ref(null)
const activeType = ref(null)
const isClicked = ref(false)
const isVisible = ref(false)
const isSupportedDevice = ref(false)
const isReduced = ref(false)

const cursorX = ref(0)
const cursorY = ref(0)

let xTo, yTo

const updateCursorVisibility = () => {
  if (typeof window !== 'undefined') {
    isSupportedDevice.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    isReduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    isVisible.value = isSupportedDevice.value
  }
}

// Initialize in setup so isVisible has its correct state immediately
updateCursorVisibility()

const onMouseMove = (e) => {
  if (!isVisible.value) return
  
  if (containerRef.value && (containerRef.value.style.opacity === '0' || containerRef.value.style.opacity === '')) {
    containerRef.value.style.opacity = '1'
  }
  
  if (isReduced.value) {
    cursorX.value = e.clientX
    cursorY.value = e.clientY
  } else {
    if (xTo && yTo) {
      xTo(e.clientX)
      yTo(e.clientY)
    }
  }
}

const onMouseOver = (e) => {
  if (!isVisible.value) return
  const target = e.target.closest('[data-cursor]')
  if (target) {
    activeType.value = target.getAttribute('data-cursor')
  } else {
    const interactive = e.target.closest('a, button, [role="button"]')
    if (interactive) {
      activeType.value = 'click'
    }
  }
}

const onMouseOut = (e) => {
  if (!isVisible.value) return
  const target = e.target.closest('[data-cursor]')
  const interactive = e.target.closest('a, button, [role="button"]')
  if (target || interactive) {
    activeType.value = null
  }
}

const onMouseDown = () => {
  if (!isVisible.value) return
  isClicked.value = true
}

const onMouseUp = () => {
  if (!isVisible.value) return
  isClicked.value = false
}

const onMouseLeaveDoc = () => {
  if (containerRef.value) {
    containerRef.value.style.opacity = '0'
  }
}

const onMouseEnterDoc = () => {
  if (containerRef.value) {
    containerRef.value.style.opacity = '1'
  }
}

onMounted(() => {
  nextTick(() => {
    if (!isVisible.value) return
    
    if (containerRef.value) {
      containerRef.value.style.opacity = '0'
      document.documentElement.classList.add('has-custom-cursor')
    }
    
    if (!isReduced.value) {
      xTo = gsap.quickTo(containerRef.value, 'x', { duration: 0.15, ease: 'power3.out' })
      yTo = gsap.quickTo(containerRef.value, 'y', { duration: 0.15, ease: 'power3.out' })
    }
    
    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeaveDoc)
    document.addEventListener('mouseenter', onMouseEnterDoc)
  })
})

onUnmounted(() => {
  document.documentElement.classList.remove('has-custom-cursor')
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseOver)
  document.removeEventListener('mouseout', onMouseOut)
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('mouseleave', onMouseLeaveDoc)
  document.removeEventListener('mouseenter', onMouseEnterDoc)
})
</script>

<template>
  <div
    v-if="isVisible"
    ref="containerRef"
    class="custom-cursor-container"
    :style="isReduced ? { transform: `translate3d(${cursorX}px, ${cursorY}px, 0)` } : {}"
  >
    <div
      class="custom-cursor"
      :class="[
        activeType ? 'is-active' : '',
        isClicked ? 'is-clicked' : '',
        `cursor-${activeType || 'default'}`
      ]"
    >
      <div class="cursor-content">
        <span v-if="activeType === 'view'" class="cursor-label">VIEW &nearr;</span>
        <span v-else-if="activeType === 'open'" class="cursor-label">OPEN &nearr;</span>
        <span v-else-if="activeType === 'download'" class="cursor-label">DOWNLOAD &darr;</span>
        <span v-else-if="activeType === 'email'" class="cursor-label">EMAIL &nearr;</span>
        <span v-else-if="activeType === 'click'" class="cursor-label">CLICK</span>
      </div>
    </div>
  </div>
</template>

<style>
/* Document-wide cursor hiding for fine pointer/hover devices only, using custom class */
.has-custom-cursor,
.has-custom-cursor body {
  cursor: none !important;
}

.has-custom-cursor a,
.has-custom-cursor button,
.has-custom-cursor [role="button"],
.has-custom-cursor input,
.has-custom-cursor select,
.has-custom-cursor textarea,
.has-custom-cursor iframe {
  cursor: none !important;
}

.custom-cursor-container {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
  transition: opacity 0.3s ease;
}

.custom-cursor {
  width: 8px;
  height: 8px;
  max-width: 8px;
  background-color: var(--color-accent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: max-width 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              height 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              padding 0.3s cubic-bezier(0.25, 1, 0.5, 1),
              background-color 0.3s ease,
              border-radius 0.3s ease,
              transform 0.15s ease;
  overflow: hidden;
  white-space: nowrap;
  padding: 0;
}

.custom-cursor.is-active {
  max-width: 200px;
  height: 26px;
  border-radius: 13px;
  padding: 0 12px;
  width: auto;
  background-color: var(--color-accent);
  color: var(--color-selection-text);
  border: 1px solid var(--color-accent);
}

.custom-cursor.is-clicked {
  transform: translate(-50%, -50%) scale(0.9);
}

.cursor-content {
  opacity: 0;
  white-space: nowrap;
  font-family: var(--font-sans);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-selection-text);
  line-height: 1;
  transition: opacity 0.15s ease;
}

.custom-cursor.is-active .cursor-content {
  opacity: 1;
  transition-delay: 0.1s;
}
</style>
