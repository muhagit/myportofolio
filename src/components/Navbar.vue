<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Sun, Moon } from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const route = useRoute()
const { theme, toggleTheme } = useTheme()

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isMenuOpen.value) {
    closeMenu()
  }
}

watch(isMenuOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

watch(() => route.fullPath, () => {
  closeMenu()
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('keydown', handleKeyDown)
  // Run once initially
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeyDown)
  document.body.classList.remove('overflow-hidden')
})

const menuLinks = [
  { num: '01', name: 'About', to: '/#about' },
  { num: '02', name: 'Skills', to: '/#skills' },
  { num: '03', name: 'Projects', to: '/#projects' },
  { num: '04', name: 'Journey', to: '/#journey' },
  { num: '05', name: 'Achievements', to: '/#achievements' },
  { num: '06', name: 'Lab', to: '/#lab' },
  { num: '07', name: 'Contact', to: '/#contact' }
]
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 w-full z-50 transition-all duration-300',
      (isScrolled || isMenuOpen)
        ? 'bg-bg/90 backdrop-blur-md border-b border-border py-4' 
        : 'bg-transparent py-6 border-b border-transparent'
    ]"
  >
    <nav class="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-50">
      <RouterLink 
        to="/" 
        @click="closeMenu"
        class="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded transition-colors duration-200"
      >
        <img 
          src="/logo.png" 
          alt="Logo" 
          :class="[
            'h-9 md:h-10 w-auto object-contain transition-transform duration-300 hover:scale-105',
            theme === 'dark' ? 'invert' : ''
          ]" 
        />
      </RouterLink>
      
      <!-- Desktop Menu Links (Unchanged) -->
      <div class="hidden md:flex items-center gap-6 md:gap-10 font-sans text-[11px] md:text-xs font-semibold tracking-widest uppercase">
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
          to="/#lab" 
          class="text-text-secondary hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded transition-colors duration-200"
        >
          Lab
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

      <!-- Mobile Controls (Hamburger & Theme Switch) -->
      <div class="flex md:hidden items-center gap-4">
        <!-- Hamburger Button -->
        <button 
          @click="toggleMenu"
          :aria-label="isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          data-cursor="click"
          class="text-text-secondary hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded p-1 flex items-center justify-center cursor-pointer transition-colors duration-200"
        >
          <!-- SVG icon toggles between Hamburger (☰) and Close (✕) -->
          <svg 
            class="w-6 h-6 stroke-current stroke-2" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke-linecap="round" 
            stroke-linejoin="round"
          >
            <line 
              v-if="isMenuOpen" 
              x1="18" y1="6" x2="6" y2="18" 
              class="transition-transform duration-300"
            />
            <line 
              v-if="isMenuOpen" 
              x1="6" y1="6" x2="18" y2="18" 
              class="transition-transform duration-300"
            />
            <line 
              v-if="!isMenuOpen" 
              x1="3" y1="12" x2="21" y2="12" 
              class="transition-transform duration-300"
            />
            <line 
              v-if="!isMenuOpen" 
              x1="3" y1="6" x2="21" y2="6" 
              class="transition-transform duration-300"
            />
            <line 
              v-if="!isMenuOpen" 
              x1="3" y1="18" x2="21" y2="18" 
              class="transition-transform duration-300"
            />
          </svg>
        </button>

        <!-- Theme Switch (always visible on mobile outside menu) -->
        <button
          @click="toggleTheme"
          :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
          class="text-text-secondary hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center p-1 cursor-pointer"
        >
          <Moon v-if="theme === 'dark'" class="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
          <Sun v-else class="w-4 h-4 transition-transform duration-300 hover:rotate-12" />
        </button>
      </div>
    </nav>
  </header>

  <!-- Mobile Navigation Overlay Menu -->
  <transition name="menu-fade">
    <div 
      v-if="isMenuOpen" 
      id="mobile-menu"
      class="fixed inset-0 z-40 bg-bg pt-28 pb-12 px-6 flex flex-col justify-between overflow-y-auto"
    >
      <!-- Background Grid Lines (Subtle Editorial Alignment) -->
      <div class="absolute inset-0 grid grid-cols-12 max-w-7xl mx-auto px-6 pointer-events-none opacity-5">
        <div v-for="n in 12" :key="n" class="border-r border-text h-full last:border-r-0"></div>
      </div>

      <!-- Menu Links -->
      <div class="relative z-10 flex flex-col justify-center flex-grow max-w-lg mx-auto w-full gap-2">
        <RouterLink 
          v-for="link in menuLinks" 
          :key="link.to"
          :to="link.to"
          @click="closeMenu"
          data-cursor="click"
          class="group flex items-baseline gap-4 py-3 border-b border-border/30 last:border-0 hover:border-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded px-2"
        >
          <span class="font-heading font-bold text-xs text-accent tracking-wider w-8 select-none">
            {{ link.num }}
          </span>
          <span class="font-heading font-bold text-2xl tracking-tight uppercase text-text group-hover:text-accent transition-colors duration-300">
            {{ link.name }}
          </span>
        </RouterLink>
      </div>
      
      <!-- Footer inside menu -->
      <div class="relative z-10 text-center pt-6 border-t border-border/30 max-w-lg mx-auto w-full">
        <span class="font-sans text-[10px] tracking-widest text-text-secondary uppercase select-none">
          &copy; {{ new Date().getFullYear() }} MUHAMMAD
        </span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .menu-fade-enter-active,
  .menu-fade-leave-active {
    transition: none !important;
  }
  .menu-fade-enter-from,
  .menu-fade-leave-to {
    opacity: 0 !important;
    transform: none !important;
  }
}
</style>
