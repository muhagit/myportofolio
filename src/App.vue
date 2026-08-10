<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import CustomCursor from '@/components/CustomCursor.vue'
</script>

<template>
  <div class="min-h-screen bg-bg text-text flex flex-col font-sans antialiased">
    <Navbar />
    
    <main class="flex-grow">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    
    <Footer />
    <CustomCursor />
  </div>
</template>
