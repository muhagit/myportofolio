<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { contact } from '@/data/contact'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const contactRef = ref(null)
let ctx

onMounted(() => {
  // Respect prefers-reduced-motion
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (isReduced) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.value,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    // Reveal section label
    tl.from('.contact-label', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1
    })

    // Reveal title lines
    tl.from('.contact-title-line', {
      y: '100%',
      duration: 0.8,
      stagger: 0.12,
      ease: 'power4.out'
    }, '-=0.4')

    // Reveal details grid (description, mail cta, socials)
    tl.from('.contact-details', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.4')
  }, contactRef.value)
})

onUnmounted(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <section 
    ref="contactRef" 
    id="contact" 
    class="py-24 md:py-32 border-t border-border-custom bg-primary-bg relative overflow-hidden"
    aria-labelledby="contact-heading"
  >
    <!-- Background Grid Lines (Subtle Editorial Alignment) -->
    <div class="absolute inset-0 grid grid-cols-12 max-w-7xl mx-auto px-6 pointer-events-none opacity-5" aria-hidden="true">
      <div v-for="n in 12" :key="n" class="border-r border-primary-text h-full last:border-r-0"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <div class="grid grid-cols-12 gap-8 md:gap-12 items-start">
        
        <!-- Left Column: Section Label (3 cols) -->
        <div class="col-span-12 md:col-span-3 space-y-4">
          <div class="font-heading font-bold text-lg tracking-wider text-primary-text contact-label">08</div>
          <h2 
            id="contact-heading" 
            class="font-sans text-[11px] font-semibold tracking-widest text-secondary-text uppercase contact-label"
          >
            Contact
          </h2>
        </div>

        <!-- Right Column: Editorial Contact Content (9 cols) -->
        <div class="col-span-12 md:col-span-9 space-y-12 md:space-y-16">
          
          <!-- Editorial Bold Headline -->
          <h3 class="font-heading font-bold uppercase tracking-tight text-[clamp(2.2rem,6.5vw,5.5rem)] leading-[0.9] text-primary-text select-none">
            <span class="block overflow-hidden pb-1">
              <span class="block contact-title-line">LET'S BUILD</span>
            </span>
            <span class="block overflow-hidden pb-1">
              <span class="block contact-title-line">SOMETHING</span>
            </span>
            <span class="block overflow-hidden pb-1">
              <span class="block contact-title-line">TOGETHER.</span>
            </span>
          </h3>

          <!-- Details Grid: Message/CTA & Social Links -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-border-custom contact-details">
            
            <!-- Left Side: Copy and Main Action -->
            <div class="space-y-8">
              <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text max-w-md">
                Have an idea, project, or just want to talk? I'd be happy to connect.
              </p>
              
              <div v-if="contact.email" class="pt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a 
                  :href="`mailto:${contact.email}`"
                  data-cursor="email"
                  class="group inline-flex items-center text-lg md:text-xl font-heading font-bold tracking-wider text-primary-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors duration-300 relative pb-2"
                >
                  <span>EMAIL ME</span>
                  <span 
                    class="ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 font-sans font-normal"
                    aria-hidden="true"
                  >
                    &nearr;
                  </span>
                  <!-- Animated Underline -->
                  <span class="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary-text group-hover:bg-accent transform scale-x-100 group-hover:scale-x-105 transition-all duration-300 origin-left"></span>
                </a>

                <a 
                  href="/cv/Muhammad-Nur-Syafii-CV.pdf"
                  download
                  data-cursor="download"
                  aria-label="Download CV"
                  class="group inline-flex items-center text-lg md:text-xl font-heading font-bold tracking-wider text-secondary-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors duration-300 relative pb-2"
                >
                  <span>DOWNLOAD CV</span>
                  <span 
                    class="ml-2 transform group-hover:translate-y-1 transition-transform duration-300 font-sans font-normal"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                  <!-- Animated Underline -->
                  <span class="absolute bottom-0 left-0 w-full h-[1.5px] bg-secondary-text group-hover:bg-accent transform scale-x-100 group-hover:scale-x-105 transition-all duration-300 origin-left"></span>
                </a>
              </div>
            </div>

            <!-- Right Side: Social Media Links -->
            <div class="space-y-6 flex flex-col md:items-end justify-start">
              <span class="font-sans text-[10px] tracking-widest text-secondary-text uppercase md:text-right block w-full">
                On the web
              </span>

              <nav class="flex flex-col gap-4 w-full md:items-end" aria-label="Social links">
                <!-- GitHub -->
                <a 
                  v-if="contact.github" 
                  :href="contact.github" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="group flex items-center gap-1.5 text-xs md:text-sm font-sans font-semibold tracking-widest uppercase text-secondary-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1 transition-colors duration-300"
                  aria-label="GitHub (opens in a new tab)"
                >
                  <span>GitHub</span>
                  <span class="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-xs font-normal" aria-hidden="true">&nearr;</span>
                </a>

                <!-- LinkedIn -->
                <a 
                  v-if="contact.linkedin" 
                  :href="contact.linkedin" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="group flex items-center gap-1.5 text-xs md:text-sm font-sans font-semibold tracking-widest uppercase text-secondary-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1 transition-colors duration-300"
                  aria-label="LinkedIn (opens in a new tab)"
                >
                  <span>LinkedIn</span>
                  <span class="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-xs font-normal" aria-hidden="true">&nearr;</span>
                </a>

                <!-- Instagram -->
                <a 
                  v-if="contact.instagram" 
                  :href="contact.instagram" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="group flex items-center gap-1.5 text-xs md:text-sm font-sans font-semibold tracking-widest uppercase text-secondary-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1 transition-colors duration-300"
                  aria-label="Instagram (opens in a new tab)"
                >
                  <span>Instagram</span>
                  <span class="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-xs font-normal" aria-hidden="true">&nearr;</span>
                </a>

                <!-- TikTok -->
                <a 
                  v-if="contact.tiktok" 
                  :href="contact.tiktok" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="group flex items-center gap-1.5 text-xs md:text-sm font-sans font-semibold tracking-widest uppercase text-secondary-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-1 transition-colors duration-300"
                  aria-label="TikTok (opens in a new tab)"
                >
                  <span>TikTok</span>
                  <span class="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-xs font-normal" aria-hidden="true">&nearr;</span>
                </a>
              </nav>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>
</template>
