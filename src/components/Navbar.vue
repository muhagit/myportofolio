<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Sun, Moon } from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'

const isScrolled = ref(false)
const { theme, toggleTheme } = useTheme()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // Run once initially
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      isScrolled 
        ? 'bg-bg/90 backdrop-blur-md border-b border-border py-4' 
        : 'bg-transparent py-6 border-b border-transparent'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <RouterLink 
        to="/" 
        class="font-heading font-bold text-sm md:text-base tracking-widest text-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded transition-colors duration-200"
      >
        M.
      </RouterLink>
      
      <div class="flex items-center gap-6 md:gap-10 font-sans text-[11px] md:text-xs font-semibold tracking-widest uppercase">
        <RouterLink 
          to="/#about" 
          class="text-text-secondary hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded transition-colors duration-200"
        >
          About
        </RouterLink>
        <RouterLink 
          to="/#projects" 
          class="text-text-secondary hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded transition-colors duration-200"
        >
          Projects
        </RouterLink>
        <RouterLink 
          to="/#contact" 
          class="text-text-secondary hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded transition-colors duration-200"
        >
          Contact
        </RouterLink>

        <!-- Theme Switch -->
        <button
          @click="toggleTheme"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          class="text-text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded transition-all duration-300 transform hover:scale-105 active:scale-95 motion-reduce:transform-none motion-reduce:transition-none flex items-center justify-center p-1 cursor-pointer"
        >
          <Moon v-if="theme === 'dark'" class="w-4 h-4 transition-transform duration-300 hover:rotate-12 motion-reduce:transform-none motion-reduce:transition-none" />
          <Sun v-else class="w-4 h-4 transition-transform duration-300 hover:rotate-12 motion-reduce:transform-none motion-reduce:transition-none" />
        </button>
      </div>
    </nav>
  </header>
</template>
