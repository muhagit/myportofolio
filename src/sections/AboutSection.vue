<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const aboutRef = ref(null)
let ctx

onMounted(() => {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    tl.from('.about-label', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    })

    tl.from('.about-title-line', {
      y: '100%',
      duration: 0.8,
      stagger: 0.12,
      ease: 'power4.out'
    }, '-=0.4')

    tl.from('.about-desc', {
      y: 20,
      opacity: 0,
      duration: 0.6
    }, '-=0.4')

    tl.from('.about-meta-item', {
      y: 15,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    }, '-=0.4')
  }, aboutRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section 
    ref="aboutRef" 
    id="about" 
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
          <div class="font-heading font-bold text-lg tracking-wider text-primary-text about-label">02</div>
          <div class="font-sans text-[11px] font-semibold tracking-widest text-secondary-text uppercase about-label">
            About
          </div>
        </div>

        <!-- Right Column: Editorial Grid Content (9 cols) -->
        <div class="col-span-12 md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          <!-- Statement Headline -->
          <div class="space-y-6">
            <h2 class="font-heading font-bold uppercase tracking-tight text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.0] text-primary-text select-none">
              <span class="block overflow-hidden pb-1">
                <span class="block about-title-line">I BUILD</span>
              </span>
              <span class="block overflow-hidden pb-1">
                <span class="block about-title-line">THINGS THAT</span>
              </span>
              <span class="block overflow-hidden pb-1">
                <span class="block about-title-line">ACTUALLY WORK.</span>
              </span>
            </h2>
          </div>

          <!-- Description and Subtitle Metadata -->
          <div class="space-y-10">
            <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text about-desc">
              I'm an Informatics student focused on web development and software engineering. I enjoy turning ideas into functional digital products, experimenting with new technologies, and continuously improving how I build software.
            </p>

            <!-- Metadata Area -->
            <div class="grid grid-cols-3 gap-4 pt-8 border-t border-border-custom">
              <div class="about-meta-item space-y-1">
                <span class="block font-sans text-[10px] tracking-widest text-secondary-text uppercase">Field</span>
                <span class="block font-sans text-xs font-semibold text-primary-text">SOFTWARE ENG.</span>
              </div>
              <div class="about-meta-item space-y-1">
                <span class="block font-sans text-[10px] tracking-widest text-secondary-text uppercase">Focus</span>
                <span class="block font-sans text-xs font-semibold text-primary-text">WEB DEV.</span>
              </div>
              <div class="about-meta-item space-y-1">
                <span class="block font-sans text-[10px] tracking-widest text-secondary-text uppercase">Based</span>
                <span class="block font-sans text-xs font-semibold text-primary-text">INDONESIA</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
