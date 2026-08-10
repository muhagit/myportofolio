<script setup>
import { onMounted, onUnmounted, ref, computed, watch, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { achievements } from '@/data/achievements'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const activeFilter = ref('ALL')
const selectedAchievement = ref(null)
const isModalOpen = ref(false)
const modalRef = ref(null)
let ctx

// Filter achievements
const filteredAchievements = computed(() => {
  if (activeFilter.value === 'ALL') return achievements
  return achievements.filter(
    (item) => item.type.toUpperCase() === activeFilter.value.slice(0, -1) // remove 'S' (AWARDS -> AWARD)
  )
})

// Open modal
const openModal = (item) => {
  selectedAchievement.value = item
  isModalOpen.value = true
}

// Close modal
const closeModal = () => {
  isModalOpen.value = false
  selectedAchievement.value = null
}

// Handle close on Escape key
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

// Prevent body scroll when modal is open
watch(isModalOpen, (newVal) => {
  if (newVal) {
    document.body.classList.add('overflow-hidden')
  } else {
    document.body.classList.remove('overflow-hidden')
  }
})

// GSAP Animations
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)

  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    // Reveal section labels
    tl.from('.achievements-label', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    })

    // Reveal title lines
    tl.from('.achievements-title-line', {
      y: '100%',
      duration: 0.8,
      stagger: 0.12,
      ease: 'power4.out'
    }, '-=0.4')

    // Reveal intro paragraph
    tl.from('.achievements-intro', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')

    // Reveal cards grid
    tl.from('.achievement-card-wrapper', {
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.4')
  }, sectionRef.value)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  document.body.classList.remove('overflow-hidden')
  if (ctx) ctx.revert()
})
</script>

<template>
  <section 
    ref="sectionRef" 
    id="achievements" 
    class="py-24 md:py-32 border-t border-border-custom bg-primary-bg relative overflow-hidden"
    aria-labelledby="achievements-heading"
  >
    <!-- Background Grid Lines (Subtle Editorial Alignment) -->
    <div class="absolute inset-0 grid grid-cols-12 max-w-7xl mx-auto px-6 pointer-events-none opacity-5" aria-hidden="true">
      <div v-for="n in 12" :key="n" class="border-r border-primary-text h-full last:border-r-0"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-12 gap-8 md:gap-12 items-start">
        
        <!-- Left Column: Section Label (3 cols) -->
        <div class="col-span-12 md:col-span-3 space-y-4">
          <div class="font-heading font-bold text-lg tracking-wider text-primary-text achievements-label">06</div>
          <h2 
            id="achievements-heading" 
            class="font-sans text-[11px] font-semibold tracking-widest text-secondary-text uppercase achievements-label"
          >
            Achievements
          </h2>
        </div>

        <!-- Right Column: Editorial Lab Content (9 cols) -->
        <div class="col-span-12 md:col-span-9 space-y-12">
          
          <!-- Editorial Bold Headline -->
          <div class="space-y-6">
            <h3 class="font-heading font-bold uppercase tracking-tight text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.9] text-primary-text select-none">
              <span class="block overflow-hidden pb-1">
                <span class="block achievements-title-line">RECOGNITION.</span>
              </span>
            </h3>
            <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text max-w-md achievements-intro">
              Certifications, honors, and milestones earned along the journey of learning and engineering.
            </p>
          </div>

          <!-- Filter Navigation -->
          <div class="flex items-center gap-6 border-b border-border-custom pb-4 achievements-intro">
            <button 
              v-for="filter in ['ALL', 'AWARDS', 'CERTIFICATES']" 
              :key="filter"
              @click="activeFilter = filter"
              :class="[
                'font-sans text-[11px] font-semibold tracking-widest uppercase pb-2 transition-all duration-300 relative cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1',
                activeFilter === filter ? 'text-primary-text font-bold' : 'text-secondary-text hover:text-primary-text'
              ]"
            >
              {{ filter }}
              <span 
                v-if="activeFilter === filter" 
                class="absolute bottom-0 left-0 w-full h-[2px] bg-accent"
              ></span>
            </button>
          </div>

          <!-- Grid of Cards -->
          <transition-group 
            tag="div" 
            name="list" 
            class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4"
          >
            <div 
              v-for="item in filteredAchievements" 
              :key="item.id"
              class="achievement-card-wrapper"
            >
              <div 
                @click="openModal(item)"
                data-cursor="view"
                :class="[
                  'group p-6 md:p-8 border bg-surface/30 hover:bg-surface/80 rounded-sm flex flex-col justify-between h-full transition-all duration-300 cursor-pointer relative overflow-hidden',
                  item.type === 'award' ? 'border-accent/40 hover:border-accent' : 'border-border-custom hover:border-primary-text'
                ]"
              >
                <!-- Card content -->
                <div class="space-y-4">
                  <div class="flex justify-between items-start">
                    <span 
                      :class="[
                        'font-sans text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 border rounded-sm',
                        item.type === 'award' ? 'border-accent text-accent bg-accent-soft' : 'border-border-strong text-secondary-text'
                      ]"
                    >
                      {{ item.type }}
                    </span>
                    <span class="font-heading font-semibold text-xs text-secondary-text">{{ item.year }}</span>
                  </div>

                  <div class="space-y-2">
                    <h4 class="font-heading font-bold uppercase tracking-tight text-base md:text-lg text-primary-text group-hover:text-accent transition-colors duration-300">
                      {{ item.title }}
                    </h4>
                    <span class="block font-sans text-xs text-secondary-text/80 font-medium">
                      {{ item.issuer }}
                    </span>
                  </div>

                  <p class="font-sans text-xs md:text-sm leading-relaxed text-secondary-text line-clamp-3">
                    {{ item.description }}
                  </p>
                </div>

                <!-- Footer details of card -->
                <div class="pt-6 border-t border-border-custom/50 mt-6 flex justify-between items-center text-xs font-sans font-bold tracking-wider text-secondary-text group-hover:text-accent transition-colors duration-300 uppercase">
                  <span>View Details</span>
                  <span class="transform group-hover:translate-x-1 transition-transform duration-300 font-sans font-normal">&rarr;</span>
                </div>
              </div>
            </div>
          </transition-group>

        </div>

      </div>
    </div>

    <!-- Modal / Lightbox Certificate Viewer -->
    <transition name="fade">
      <div 
        v-if="isModalOpen && selectedAchievement"
        class="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div 
          ref="modalRef"
          class="relative max-w-4xl w-full bg-surface border border-border-custom p-6 md:p-10 text-primary-text flex flex-col md:flex-row gap-6 md:gap-8 items-center rounded-sm transition-all duration-300 transform scale-100"
        >
          <!-- Close button inside modal -->
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 text-secondary-text hover:text-primary-text p-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <!-- Visual Column -->
          <div class="w-full md:w-1/2 aspect-[4/3] bg-bg border border-border-custom flex flex-col justify-center items-center p-4 text-center relative overflow-hidden select-none">
            <img 
              v-if="selectedAchievement.image" 
              :src="selectedAchievement.image" 
              data-cursor="view"
              :alt="selectedAchievement.title" 
              class="w-full h-full object-contain"
            />
            <!-- Premium Fallback Digital Certificate -->
            <div 
              v-else 
              data-cursor="view"
              class="w-full h-full flex flex-col justify-between p-6 border border-accent/20 bg-accent-soft/10 relative"
            >
              <div class="absolute inset-2 border border-accent/10 pointer-events-none"></div>
              
              <div class="space-y-2 mt-4 text-left">
                <span class="text-[9px] tracking-widest text-accent font-bold uppercase block">VERIFIED CREDENTIAL</span>
                <h4 class="font-heading font-bold text-base md:text-lg uppercase tracking-tight text-primary-text leading-snug">
                  {{ selectedAchievement.title }}
                </h4>
                <span class="text-xs text-secondary-text font-medium block">Issued by {{ selectedAchievement.issuer }}</span>
              </div>

              <div class="flex justify-between items-end mt-8 border-t border-border-custom/80 pt-4 text-left">
                <div>
                  <span class="text-[9px] text-secondary-text/60 uppercase block">Year</span>
                  <span class="text-xs font-semibold text-primary-text font-heading">{{ selectedAchievement.year }}</span>
                </div>
                <div class="text-right">
                  <span class="text-[9px] text-secondary-text/60 uppercase block">Status</span>
                  <span class="text-xs font-semibold text-green-500 font-heading">ACTIVE</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Info Column -->
          <div class="w-full md:w-1/2 space-y-6">
            <div class="space-y-2 text-left">
              <span class="text-[10px] tracking-widest font-semibold text-accent uppercase block">{{ selectedAchievement.type }}</span>
              <h3 class="font-heading font-bold text-xl md:text-2xl uppercase tracking-tight text-primary-text">
                {{ selectedAchievement.title }}
              </h3>
              <p class="text-xs md:text-sm font-sans text-secondary-text leading-relaxed">
                {{ selectedAchievement.description }}
              </p>
            </div>
            
            <div class="pt-4 flex flex-wrap gap-4">
              <a 
                v-if="selectedAchievement.credentialUrl" 
                :href="selectedAchievement.credentialUrl" 
                data-cursor="open"
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center px-5 py-2.5 border border-primary-text text-xs font-semibold tracking-widest uppercase text-primary-bg bg-primary-text hover:bg-transparent hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300"
              >
                View Credential <span class="ml-2 font-sans font-normal">&nearr;</span>
              </a>
              <button 
                @click="closeModal"
                class="inline-flex items-center justify-center px-5 py-2.5 border border-border-custom text-xs font-semibold tracking-widest uppercase text-primary-text hover:border-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
/* List transitions for filtering achievements */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

.list-leave-active {
  position: absolute;
  width: 100%;
}

/* Modal fade animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .scale-100,
.fade-leave-active .scale-100 {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-enter-from .scale-100 {
  transform: scale(0.95);
}

.fade-leave-to .scale-100 {
  transform: scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .list-enter-active,
  .list-leave-active,
  .fade-enter-active,
  .fade-leave-active,
  .fade-enter-active .scale-100,
  .fade-leave-active .scale-100 {
    transition: none !important;
    transform: none !important;
  }
}
</style>
