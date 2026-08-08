<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-primary-bg text-primary-text flex flex-col font-sans antialiased selection:bg-accent selection:text-primary-text">
    <Navbar />
    
    <main class="flex-grow">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    
    <Footer />
  </div>
</template>
