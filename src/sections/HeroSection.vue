<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const heroRef = ref(null)

onMounted(() => {
  // Check for prefers-reduced-motion
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) return

  // Stagger reveal of hero layout items
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  tl.from('.hero-label', {
    y: 20,
    opacity: 0,
    duration: 0.6
  })

  tl.from('.hero-title-line', {
    y: '100%',
    duration: 0.8,
    stagger: 0.12,
    ease: 'power4.out'
  }, '-=0.4')

  tl.from('.hero-badge', {
    y: 20,
    opacity: 0,
    duration: 0.6
  }, '-=0.4')

  tl.from('.hero-desc', {
    y: 20,
    opacity: 0,
    duration: 0.6
  }, '-=0.4')

  tl.from('.hero-cta', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1
  }, '-=0.4')

  tl.from('.hero-meta-item', {
    y: 15,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1
  }, '-=0.4')

  tl.from('.hero-scroll', {
    opacity: 0,
    y: 10,
    duration: 0.6
  }, '-=0.2')
})
</script>

<template>
  <section 
    ref="heroRef" 
    class="min-h-screen pt-32 pb-12 flex flex-col justify-between relative overflow-hidden bg-primary-bg"
  >
    <!-- Background Grid Lines (Subtle Editorial Aesthetic) -->
    <div class="absolute inset-0 grid grid-cols-12 max-w-7xl mx-auto px-6 pointer-events-none opacity-5">
      <div v-for="n in 12" :key="n" class="border-r border-primary-text h-full last:border-r-0"></div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-6 w-full flex-grow flex flex-col justify-center relative z-10">
      <div class="grid grid-cols-12 gap-8 md:gap-12 items-start">
        
        <!-- Left Side: Editorial Introduction Column (Desktop only) -->
        <div class="hidden md:block col-span-3 border-t border-border-custom pt-6 space-y-4">
          <div class="font-heading font-bold text-lg tracking-wider text-primary-text">01</div>
          <div class="font-sans text-[11px] font-semibold tracking-widest text-secondary-text uppercase">
            Introduction
          </div>
        </div>

        <!-- Right Side: Heading, Subheading, Description, and CTAs -->
        <div class="col-span-12 md:col-span-9 space-y-10 md:space-y-12">
          <div class="space-y-6">
            <span class="block font-sans text-xs md:text-sm font-semibold tracking-[0.2em] text-accent uppercase hero-label">
              HELLO, I'M
            </span>
            
            <h1 class="font-heading font-bold uppercase tracking-tight text-[clamp(2.2rem,7vw,6rem)] leading-[0.95] text-primary-text select-none">
              <span class="block overflow-hidden pb-1">
                <span class="block hero-title-line">MUHAMMAD.</span>
              </span>
              <span class="block overflow-hidden pb-1">
                <span class="block hero-title-line">I BUILD</span>
              </span>
              <span class="block overflow-hidden pb-1">
                <span class="block hero-title-line">DIGITAL</span>
              </span>
              <span class="block overflow-hidden pb-1">
                <span class="block hero-title-line">PRODUCTS.</span>
              </span>
            </h1>
          </div>

          <div class="space-y-4 max-w-2xl">
            <!-- Professional Title -->
            <p class="font-sans text-lg md:text-xl font-medium tracking-wide text-primary-text hero-badge">
              Software Engineer / Web Developer
            </p>
            <!-- Description -->
            <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text hero-desc">
              I design and build modern web applications with a focus on clean interfaces, scalable architecture and great user experience.
            </p>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4 items-center">
            <a 
              href="#projects" 
              class="hero-cta inline-flex items-center justify-center px-6 py-3.5 border border-primary-text text-xs font-semibold tracking-widest uppercase text-primary-bg bg-primary-text hover:bg-transparent hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300"
            >
              View My Work <span class="ml-2 font-sans font-normal">&rarr;</span>
            </a>
            <a 
              href="#contact" 
              class="hero-cta inline-flex items-center justify-center px-6 py-3.5 border border-border-custom text-xs font-semibold tracking-widest uppercase text-primary-text hover:border-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300"
            >
              Let's Talk
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- Bottom Footer Grid / Metadata -->
    <div class="max-w-7xl mx-auto px-6 w-full border-t border-border-custom pt-8 mt-12 relative z-10">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12">
        <div class="flex flex-wrap gap-8 md:gap-16">
          <div class="hero-meta-item space-y-1">
            <span class="block font-sans text-[10px] tracking-widest text-secondary-text uppercase">Location</span>
            <span class="block font-sans text-xs font-medium text-primary-text">BASED IN INDONESIA</span>
          </div>
          <div class="hero-meta-item space-y-1">
            <span class="block font-sans text-[10px] tracking-widest text-secondary-text uppercase">Availability</span>
            <span class="block font-sans text-xs font-medium text-primary-text">AVAILABLE FOR OPPORTUNITIES</span>
          </div>
        </div>

        <div class="hero-scroll flex items-center gap-3 text-secondary-text font-sans text-[10px] tracking-widest uppercase select-none">
          <span>Scroll to explore</span>
          <span class="inline-block animate-custom-bounce">↓</span>
        </div>
      </div>
    </div>
  </section>
</template>
