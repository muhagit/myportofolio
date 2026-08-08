<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const isScrolled = ref(false)

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
        ? 'bg-primary-bg/90 backdrop-blur-md border-b border-border-custom py-4' 
        : 'bg-transparent py-6 border-b border-transparent'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <RouterLink 
        to="/" 
        class="font-heading font-bold text-sm md:text-base tracking-widest text-primary-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg rounded transition-colors duration-200"
      >
        M.
      </RouterLink>
      
      <div class="flex items-center gap-6 md:gap-10 font-sans text-[11px] md:text-xs font-semibold tracking-widest uppercase">
        <a 
          href="#about" 
          class="text-secondary-text hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg rounded transition-colors duration-200"
        >
          About
        </a>
        <a 
          href="#projects" 
          class="text-secondary-text hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg rounded transition-colors duration-200"
        >
          Projects
        </a>
        <a 
          href="#contact" 
          class="text-secondary-text hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-bg rounded transition-colors duration-200"
        >
          Contact
        </a>
      </div>
    </nav>
  </header>
</template>
