<script setup>
import { onMounted } from 'vue'
import HeroSection from '@/sections/HeroSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import SkillsSection from '@/sections/SkillsSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import JourneySection from '@/sections/JourneySection.vue'
import ContactSection from '@/sections/ContactSection.vue'

onMounted(() => {
  document.title = 'Build. Solve. Create. | Developer Portfolio'
  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) {
    metaDesc.setAttribute('content', 'A minimal, modern, editorial-style developer portfolio website showcasing custom case studies, frontend engineering, and clean design.')
  }
})
</script>

<template>
  <div class="space-y-24 pb-24">
    <!-- 01 / Introduction -->
    <HeroSection />

    <!-- 02 / About -->
    <AboutSection />

    <!-- 03 / Skills -->
    <SkillsSection />

    <!-- 04 / Selected Work -->
    <ProjectsSection />

    <!-- 05 / Journey -->
    <JourneySection />

    <!-- 06 / Contact -->
    <ContactSection />
  </div>
</template>

