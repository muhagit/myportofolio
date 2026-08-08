<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}
</script>

<template>
  <div class="group grid grid-cols-12 gap-8 md:gap-12 items-start py-8">
    
    <!-- Index Indicator & Separator Line -->
    <div class="col-span-12 flex items-center justify-between">
      <span class="font-heading font-bold text-xs md:text-sm text-secondary-text">
        {{ String(index + 1).padStart(2, '0') }}
      </span>
      <span class="text-[10px] font-sans font-semibold text-accent uppercase tracking-widest">
        Featured Showcase
      </span>
    </div>
    
    <div class="col-span-12 border-t border-border pb-4"></div>

    <!-- Alternating Column Layout -->
    <!-- Image block takes 7 cols on desktop, Order is 1 if even, 2 if odd -->
    <div 
      :class="[
        'col-span-12 md:col-span-7',
        index % 2 === 0 ? 'md:order-1' : 'md:order-2'
      ]"
    >
      <RouterLink 
        :to="{ name: 'project-detail', params: { id: project.id } }"
        class="block overflow-hidden border border-border bg-border/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
        aria-label="View case study for {{ project.title }}"
      >
        <div class="relative overflow-hidden aspect-[16/9] w-full">
          <img 
            v-if="project.image && !imageError"
            :src="project.image" 
            :alt="project.title"
            @error="handleImageError"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            loading="lazy"
          />
          <!-- Editorial Placeholder Fallback -->
          <div v-else class="w-full h-full flex flex-col items-center justify-center p-8 bg-border/10 text-center select-none">
            <span class="font-heading font-bold text-xs uppercase tracking-widest text-text-secondary mb-1">
              Project Preview
            </span>
            <span class="font-sans text-[10px] text-accent font-semibold tracking-widest uppercase">
              Image Coming Soon
            </span>
          </div>
        </div>
      </RouterLink>
    </div>

    <!-- Info block takes 5 cols on desktop, Order is 2 if even, 1 if odd -->
    <div 
      :class="[
        'col-span-12 md:col-span-5 flex flex-col justify-center h-full space-y-6',
        index % 2 === 0 ? 'md:order-2' : 'md:order-1'
      ]"
    >
      <div class="space-y-2">
        <span class="font-sans text-[10px] md:text-xs font-semibold tracking-widest text-accent uppercase">
          {{ project.category }} &middot; {{ project.year }}
        </span>
        <h3 class="font-heading font-bold uppercase tracking-tight text-2xl md:text-3xl text-text group-hover:text-accent transition-colors duration-300">
          {{ project.title }}
        </h3>
      </div>

      <p class="font-sans text-sm leading-relaxed text-text-secondary">
        {{ project.shortDescription }}
      </p>

      <!-- Technologies -->
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="tech in project.technologies" 
          :key="tech"
          class="font-sans text-[10px] font-semibold tracking-wider uppercase border border-border/60 px-2 py-0.5 text-text-secondary bg-bg"
        >
          {{ tech }}
        </span>
      </div>

      <!-- Action link -->
      <div class="pt-2">
        <RouterLink 
          :to="{ name: 'project-detail', params: { id: project.id } }"
          class="inline-flex items-center gap-2 text-xs font-bold font-sans tracking-widest uppercase text-text hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors duration-300"
        >
          View Case Study 
          <span class="inline-block transform group-hover:translate-x-1.5 transition-transform duration-300">
            &rarr;
          </span>
        </RouterLink>
      </div>
    </div>

  </div>
</template>
