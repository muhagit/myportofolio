<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { projects } from '@/data/projects'
import { ArrowLeft } from '@lucide/vue'

const route = useRoute()
const coverError = ref(false)

const project = computed(() => {
  return projects.find(p => p.id === route.params.id)
})

const projectIndex = computed(() => {
  return projects.findIndex(p => p.id === route.params.id)
})

const prevProject = computed(() => {
  const idx = projectIndex.value
  return idx > 0 ? projects[idx - 1] : null
})

const nextProject = computed(() => {
  const idx = projectIndex.value
  return idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null
})

// Dynamic title and meta tags configuration for SEO
const updateSEO = () => {
  if (project.value) {
    document.title = `${project.value.title} — Muhammad`
    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      document.head.appendChild(metaDesc)
    }
    metaDesc.setAttribute('content', project.value.shortDescription || '')
  } else {
    document.title = 'Project Not Found — Muhammad'
  }
}

onMounted(() => {
  updateSEO()
})

// Update SEO tags when route parameters switch
watch(project, () => {
  coverError.value = false
  updateSEO()
  window.scrollTo({ top: 0, behavior: 'instant' })
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-24 space-y-16 min-h-screen bg-primary-bg">
    
    <!-- Loaded Case Study layout -->
    <div v-if="project" class="space-y-16">
      
      <!-- Back Navigation Header -->
      <div>
        <RouterLink 
          to="/" 
          class="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-secondary-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm transition-colors duration-200"
        >
          <ArrowLeft class="w-4 h-4" />
          Back to Projects
        </RouterLink>
      </div>

      <!-- Main Case Study Intro Header -->
      <div class="grid grid-cols-12 gap-8 pt-4">
        <div class="col-span-12 md:col-span-3">
          <span class="font-heading font-bold text-xs md:text-sm uppercase tracking-widest text-accent">
            04 / Case Study
          </span>
        </div>
        <div class="col-span-12 md:col-span-9 space-y-6">
          <h1 class="font-heading font-bold uppercase tracking-tight text-4xl md:text-6xl text-primary-text leading-[1.0]">
            {{ project.title }}
          </h1>
          <p class="font-sans text-lg md:text-xl text-secondary-text leading-relaxed max-w-3xl">
            {{ project.shortDescription }}
          </p>
        </div>
      </div>

      <!-- Core Details Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border-custom">
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-secondary-text mb-1">Role</span>
          <span class="text-primary-text font-sans font-medium text-sm">
            {{ project.caseStudy.role }}
          </span>
        </div>
        
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-secondary-text mb-1">Year</span>
          <span class="text-primary-text font-sans font-medium text-sm">
            {{ project.year }}
          </span>
        </div>
        
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-secondary-text mb-1">Technologies</span>
          <div class="flex flex-wrap gap-1.5 mt-1">
            <span 
              v-for="tech in project.technologies" 
              :key="tech"
              class="text-[10px] font-semibold border border-border-custom px-2 py-0.5 text-secondary-text bg-primary-bg uppercase tracking-wide"
            >
              {{ tech }}
            </span>
          </div>
        </div>
        
        <div>
          <span class="block text-[10px] uppercase tracking-wider text-secondary-text mb-1">Links</span>
          <div class="flex flex-col gap-1.5 mt-1 text-xs">
            <a 
              v-if="project.links.live" 
              :href="project.links.live" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-primary-text hover:text-accent font-sans font-semibold underline inline-flex items-center gap-1 transition-colors duration-200"
            >
              Visit Live Project ↗
            </a>
            <a 
              v-if="project.links.github" 
              :href="project.links.github" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-primary-text hover:text-accent font-sans font-semibold underline inline-flex items-center gap-1 transition-colors duration-200"
            >
              Source Code &rarr;
            </a>
            <span v-if="!project.links.live && !project.links.github" class="text-secondary-text">No public links</span>
          </div>
        </div>
      </div>

      <!-- Large Cover Image -->
      <div class="relative overflow-hidden aspect-[16/9] md:aspect-[21/9] border border-border-custom bg-border-custom/5">
        <img 
          v-if="project.image && !coverError"
          :src="project.image" 
          :alt="project.title"
          @error="coverError = true"
          class="w-full h-full object-cover"
        />
        <!-- Cover Editorial Placeholder -->
        <div v-else class="w-full h-full flex flex-col items-center justify-center p-8 bg-border-custom/10 text-center select-none">
          <span class="font-heading font-bold text-sm uppercase tracking-widest text-secondary-text mb-1">
            {{ project.title }}
          </span>
          <span class="font-sans text-xs text-accent font-semibold tracking-widest uppercase">
            Case Study Cover Image
          </span>
        </div>
      </div>

      <!-- Editorial Longform Content (Clamped Width: max-w-3xl (~750px)) -->
      <div class="max-w-[750px] mx-auto space-y-16 pt-8">
        
        <section v-if="project.description" class="space-y-4">
          <h2 class="font-heading text-xs font-semibold tracking-widest text-accent uppercase">Overview</h2>
          <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text">
            {{ project.description }}
          </p>
        </section>

        <section v-if="project.caseStudy.problem" class="space-y-4">
          <h2 class="font-heading text-xs font-semibold tracking-widest text-accent uppercase">The Problem</h2>
          <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text">
            {{ project.caseStudy.problem }}
          </p>
        </section>

        <section v-if="project.caseStudy.solution" class="space-y-4">
          <h2 class="font-heading text-xs font-semibold tracking-widest text-accent uppercase">The Solution</h2>
          <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text">
            {{ project.caseStudy.solution }}
          </p>
        </section>

        <section v-if="project.caseStudy.challenges" class="space-y-4">
          <h2 class="font-heading text-xs font-semibold tracking-widest text-accent uppercase">Key Challenges</h2>
          <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text">
            {{ project.caseStudy.challenges }}
          </p>
        </section>

        <section v-if="project.caseStudy.contribution" class="space-y-4">
          <h2 class="font-heading text-xs font-semibold tracking-widest text-accent uppercase">My Contribution</h2>
          <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text">
            {{ project.caseStudy.contribution }}
          </p>
        </section>

        <section v-if="project.caseStudy.result" class="space-y-4">
          <h2 class="font-heading text-xs font-semibold tracking-widest text-accent uppercase">The Result</h2>
          <p class="font-sans text-sm md:text-base leading-relaxed text-secondary-text">
            {{ project.caseStudy.result }}
          </p>
        </section>

      </div>

      <!-- Reusable Project Gallery -->
      <div v-if="project.gallery && project.gallery.length" class="space-y-8 pt-8 max-w-7xl mx-auto">
        <h2 class="font-heading text-xs font-semibold tracking-widest text-accent uppercase max-w-[750px] mx-auto">
          Gallery
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            v-for="(img, idx) in project.gallery" 
            :key="idx"
            class="border border-border-custom aspect-[16/10] overflow-hidden bg-border-custom/5"
          >
            <img :src="img" :alt="`${project.title} screenshot ${idx + 1}`" class="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </div>

      <!-- Case Study Previous/Next Navigation -->
      <div class="flex items-center justify-between border-t border-border-custom pt-8 mt-12 max-w-7xl mx-auto">
        <div>
          <RouterLink 
            v-if="prevProject" 
            :to="{ name: 'project-detail', params: { id: prevProject.id } }"
            class="group text-left space-y-1 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <span class="block text-[9px] font-semibold tracking-widest uppercase text-secondary-text">
              &larr; Previous Case Study
            </span>
            <span class="block font-heading font-bold text-sm md:text-base text-primary-text group-hover:text-accent transition-colors duration-200">
              {{ prevProject.title }}
            </span>
          </RouterLink>
        </div>
        
        <div>
          <RouterLink 
            v-if="nextProject" 
            :to="{ name: 'project-detail', params: { id: nextProject.id } }"
            class="group text-right space-y-1 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <span class="block text-[9px] font-semibold tracking-widest uppercase text-secondary-text">
              Next Case Study &rarr;
            </span>
            <span class="block font-heading font-bold text-sm md:text-base text-primary-text group-hover:text-accent transition-colors duration-200">
              {{ nextProject.title }}
            </span>
          </RouterLink>
        </div>
      </div>

    </div>

    <!-- Case study not found (404 state) -->
    <div v-else class="py-32 text-center space-y-6 max-w-md mx-auto">
      <h2 class="text-4xl font-heading font-bold uppercase text-primary-text">Project Not Found</h2>
      <p class="text-secondary-text font-sans text-sm leading-relaxed">
        The dynamic case study you are looking for does not exist or has been relocated.
      </p>
      <RouterLink 
        to="/" 
        class="inline-block border border-primary-text px-6 py-3 text-xs font-semibold tracking-widest uppercase text-primary-bg bg-primary-text hover:bg-transparent hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all duration-300"
      >
        Return to Projects
      </RouterLink>
    </div>

  </div>
</template>
