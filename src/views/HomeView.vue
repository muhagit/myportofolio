<script setup>
import HeroSection from '@/sections/HeroSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import SkillsSection from '@/sections/SkillsSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
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

    <!-- 05 / Contact (Placeholder for Phase 4) -->
    <section id="contact" class="max-w-7xl mx-auto px-6 pt-16">
      <div class="border-t border-border-custom pt-12 space-y-4">
        <h2 class="text-xs font-semibold tracking-widest text-accent uppercase">05 / Contact</h2>
        <p class="text-secondary-text max-w-xl text-sm leading-relaxed">
          Contact options and network details to be implemented in a future phase.
        </p>
      </div>
    </section>
  </div>
</template>
