<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const skillsRef = ref(null)
let ctx

const categories = [
  {
    name: 'Frontend',
    skills: ['Vue', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap']
  },
  {
    name: 'Backend',
    skills: ['Node.js', 'Express', 'Laravel', 'REST API', 'MongoDB', 'MySQL']
  },
  {
    name: 'Tools',
    skills: ['Git', 'GitHub', 'Postman', 'Figma', 'Vite']
  }
]

onMounted(() => {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: skillsRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    tl.from('.skills-label', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    })

    tl.from('.skills-title-line', {
      y: '100%',
      duration: 0.8,
      stagger: 0.12,
      ease: 'power4.out'
    }, '-=0.4')

    tl.from('.skills-category-block', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    }, '-=0.4')
  }, skillsRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section 
    ref="skillsRef" 
    id="skills" 
    class="py-24 md:py-32 border-t border-border-custom bg-primary-bg relative overflow-hidden"
  >
    <!-- Background Grid Lines (Subtle Editorial Alignment) -->
    <div class="absolute inset-0 grid grid-cols-12 max-w-7xl mx-auto px-6 pointer-events-none opacity-5">
      <div v-for="n in 12" :key="n" class="border-r border-primary-text h-full last:border-r-0"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-12 gap-8 md:gap-12 items-start">
        
        <!-- Left Column: Section Label (3 cols) -->
        <div class="col-span-12 md:col-span-3 space-y-4">
          <div class="font-heading font-bold text-lg tracking-wider text-primary-text skills-label">03</div>
          <div class="font-sans text-[11px] font-semibold tracking-widest text-secondary-text uppercase skills-label">
            Skills
          </div>
        </div>

        <!-- Right Column: Skills Layout Content (9 cols) -->
        <div class="col-span-12 md:col-span-9 space-y-12">
          
          <!-- Headline -->
          <h2 class="font-heading font-bold uppercase tracking-tight text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.0] text-primary-text select-none">
            <span class="block overflow-hidden pb-1">
              <span class="block skills-title-line">TOOLS I</span>
            </span>
            <span class="block overflow-hidden pb-1">
              <span class="block skills-title-line">WORK WITH.</span>
            </span>
          </h2>

          <!-- Categories Stack -->
          <div class="space-y-12 pt-8">
            <div 
              v-for="(cat, idx) in categories" 
              :key="cat.name" 
              class="skills-category-block space-y-8"
            >
              <!-- Category Divider (Except first one) -->
              <div v-if="idx > 0" class="border-t border-border-custom/50"></div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <!-- Category Name -->
                <h3 class="font-heading text-xs font-semibold tracking-widest text-accent uppercase md:col-span-1">
                  {{ cat.name }}
                </h3>
                
                <!-- Skills Grid List -->
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-8 md:col-span-2">
                  <div 
                    v-for="skill in cat.skills" 
                    :key="skill"
                    class="group flex items-center justify-between py-2 border-b border-border-custom/20 text-secondary-text hover:text-primary-text transition-colors duration-300 select-none cursor-pointer"
                  >
                    <span class="font-sans text-xs md:text-sm font-medium tracking-wide transition-colors duration-300 group-hover:text-accent">
                      {{ skill }}
                    </span>
                    <span class="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-accent font-semibold text-xs leading-none">
                      &rarr;
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
