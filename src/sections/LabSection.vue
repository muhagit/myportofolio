<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lab } from '@/data/lab'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const labRef = ref(null)
let ctx

onMounted(() => {
  // Respect prefers-reduced-motion
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: labRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    // Reveal section label
    tl.from('.lab-label', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    })

    // Reveal title lines
    tl.from('.lab-title-line', {
      y: '100%',
      duration: 0.8,
      stagger: 0.12,
      ease: 'power4.out'
    }, '-=0.4')

    // Reveal intro paragraph
    tl.from('.lab-intro', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')

    // Stagger reveal lab item rows
    tl.from('.lab-item-row', {
      y: 24,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.4')

    // Animate dividers
    tl.from('.lab-divider', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.0,
      ease: 'power2.out',
      stagger: 0.15
    }, '-=0.8')
  }, labRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section 
    ref="labRef" 
    id="lab" 
    class="py-24 md:py-32 border-t border-border-custom bg-primary-bg relative overflow-hidden"
    aria-labelledby="lab-heading"
  >
    <!-- Background Grid Lines (Subtle Editorial Alignment) -->
    <div class="absolute inset-0 grid grid-cols-12 max-w-7xl mx-auto px-6 pointer-events-none opacity-5" aria-hidden="true">
      <div v-for="n in 12" :key="n" class="border-r border-primary-text h-full last:border-r-0"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-12 gap-8 md:gap-12 items-start">
        
        <!-- Left Column: Section Label (3 cols) -->
        <div class="col-span-12 md:col-span-3 space-y-4">
          <div class="font-heading font-bold text-lg tracking-wider text-primary-text lab-label">07</div>
          <h2 
            id="lab-heading" 
            class="font-sans text-[11px] font-semibold tracking-widest text-secondary-text uppercase lab-label"
          >
            Developer Lab
          </h2>
        </div>

        <!-- Right Column: Editorial Lab Content (9 cols) -->
        <div class="col-span-12 md:col-span-9 space-y-12 md:space-y-16">
          
          <!-- Editorial Bold Headline -->
          <div class="space-y-6">
            <h3 class="font-heading font-bold uppercase tracking-tight text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.9] text-primary-text select-none">
              <span class="block overflow-hidden pb-1">
                <span class="block lab-title-line">EXPERIMENTS.</span>
              </span>
            </h3>
            <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text max-w-md lab-intro">
              Things I build while learning, exploring, and breaking things.
            </p>
          </div>

          <!-- Experiments List -->
          <div class="space-y-0 border-t border-border-custom relative">
            <div 
              v-for="(item, idx) in lab" 
              :key="item.id" 
              class="relative lab-item-group"
            >
              <!-- Animated Divider (except first item) -->
              <div 
                v-if="idx > 0" 
                class="lab-divider w-full h-[1px] bg-border-custom absolute top-0 left-0"
                aria-hidden="true"
              ></div>

              <!-- Item Row -->
              <div class="grid grid-cols-12 gap-6 md:gap-8 items-start py-8 md:py-12 lab-item-row group transition-colors duration-300">
                
                <!-- Index -->
                <div class="col-span-12 md:col-span-1">
                  <span class="font-heading font-bold text-base md:text-lg text-secondary-text/50 group-hover:text-accent transition-colors duration-300">
                    {{ String(idx + 1).padStart(2, '0') }}
                  </span>
                </div>

                <!-- Title & Status -->
                <div class="col-span-12 md:col-span-4 space-y-2">
                  <h4 class="font-heading font-bold uppercase tracking-tight text-base md:text-lg text-primary-text group-hover:text-accent transition-colors duration-300">
                    {{ item.title }}
                  </h4>
                  <div class="flex items-center gap-2">
                    <span 
                      :class="[
                        'w-1.5 h-1.5 rounded-full', 
                        item.status === 'COMPLETED' ? 'bg-green-500' : 'bg-amber-500'
                      ]"
                    ></span>
                    <span class="font-sans text-[9px] font-semibold tracking-widest text-secondary-text uppercase">
                      {{ item.status }}
                    </span>
                  </div>
                </div>

                <!-- Tech & Description -->
                <div class="col-span-12 md:col-span-5 space-y-3">
                  <div class="flex flex-wrap gap-x-2 gap-y-1">
                    <span 
                      v-for="(tech, tIdx) in item.technologies" 
                      :key="tech"
                      class="font-sans text-[10px] font-semibold tracking-wider text-secondary-text uppercase"
                    >
                      {{ tech }}<span v-if="tIdx < item.technologies.length - 1" class="ml-2 opacity-40">&middot;</span>
                    </span>
                  </div>
                  <p class="font-sans text-sm leading-relaxed text-secondary-text">
                    {{ item.description }}
                  </p>
                </div>

                <!-- Link -->
                <div class="col-span-12 md:col-span-2 md:text-right flex items-center md:justify-end">
                  <a 
                    v-if="item.link" 
                    :href="item.link" 
                    data-cursor="view"
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="View Experiment"
                    class="inline-flex items-center text-xs font-semibold tracking-widest uppercase text-secondary-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors duration-300"
                  >
                    <span>View Experiment</span>
                    <span class="ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300 font-sans font-normal">&rarr;</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
