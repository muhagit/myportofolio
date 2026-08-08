<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journey } from '@/data/journey'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const journeyRef = ref(null)
let ctx

onMounted(() => {
  // Respect prefers-reduced-motion
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: journeyRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    // Stagger reveal section label
    tl.from('.journey-label', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    })

    // Stagger reveal journey entry details
    tl.from('.journey-content', {
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.4')

    // Animate divider lines drawing in from the left
    tl.from('.journey-divider', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.0,
      ease: 'power2.out',
      stagger: 0.15
    }, '-=0.8')
  }, journeyRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section 
    ref="journeyRef" 
    id="journey" 
    class="py-24 md:py-32 border-t border-border-custom bg-primary-bg relative overflow-hidden"
    aria-labelledby="journey-heading"
  >
    <!-- Background Grid Lines (Subtle Editorial Alignment) -->
    <div class="absolute inset-0 grid grid-cols-12 max-w-7xl mx-auto px-6 pointer-events-none opacity-5" aria-hidden="true">
      <div v-for="n in 12" :key="n" class="border-r border-primary-text h-full last:border-r-0"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-12 gap-8 md:gap-12 items-start">
        
        <!-- Left Column: Section Label (3 cols) -->
        <div class="col-span-12 md:col-span-3 space-y-4">
          <div class="font-heading font-bold text-lg tracking-wider text-primary-text journey-label">05</div>
          <h2 
            id="journey-heading" 
            class="font-sans text-[11px] font-semibold tracking-widest text-secondary-text uppercase journey-label"
          >
            Journey
          </h2>
        </div>

        <!-- Right Column: Timeline Content (9 cols) -->
        <div class="col-span-12 md:col-span-9">
          <div class="space-y-0">
            <div 
              v-for="(item, idx) in journey" 
              :key="item.year" 
              class="relative journey-item"
            >
              <!-- Subtle Animated Divider (except before first item) -->
              <div 
                v-if="idx > 0" 
                class="journey-divider w-full h-[1px] bg-border-custom absolute top-0 left-0"
                aria-hidden="true"
              ></div>

              <!-- Main Content Grid -->
              <div class="grid grid-cols-12 gap-6 md:gap-8 items-start py-8 md:py-12 journey-content">
                <!-- Year -->
                <div class="col-span-12 md:col-span-3">
                  <span class="font-heading font-bold text-xl md:text-2xl text-primary-text tracking-tight block">
                    {{ item.year }}
                  </span>
                </div>
                
                <!-- Milestone Title -->
                <div class="col-span-12 md:col-span-4">
                  <h3 class="font-heading font-bold uppercase tracking-tight text-base md:text-lg text-primary-text leading-snug">
                    {{ item.title }}
                  </h3>
                </div>
                
                <!-- Description -->
                <div class="col-span-12 md:col-span-5">
                  <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text">
                    {{ item.description }}
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
