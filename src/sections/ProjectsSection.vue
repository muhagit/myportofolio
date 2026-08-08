<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '@/data/projects'
import ProjectCard from '@/components/ProjectCard.vue'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

const projectsSectionRef = ref(null)
</script>

<template>
  <section 
    ref="projectsSectionRef" 
    id="projects" 
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
          <div class="font-heading font-bold text-lg tracking-wider text-primary-text projects-label">04</div>
          <div class="font-sans text-[11px] font-semibold tracking-widest text-secondary-text uppercase projects-label">
            Selected Work
          </div>
        </div>

        <!-- Right Column: Projects List (9 cols) -->
        <div class="col-span-12 md:col-span-9 space-y-12">
          
          <!-- Section Heading -->
          <h2 class="font-heading font-bold uppercase tracking-tight text-[clamp(1.8rem,4vw,3.5rem)] leading-[1.0] text-primary-text select-none">
            <span class="block overflow-hidden pb-1">
              <span class="block projects-title-line">SELECTED</span>
            </span>
            <span class="block overflow-hidden pb-1">
              <span class="block projects-title-line">PROJECTS.</span>
            </span>
          </h2>

          <!-- Alternating Projects Grid list -->
          <div class="space-y-16 pt-8">
            <div 
              v-for="(project, idx) in projects" 
              :key="project.id" 
              class="projects-list-card"
            >
              <ProjectCard :project="project" :index="idx" />
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>
