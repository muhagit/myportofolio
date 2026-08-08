<script setup>
import { contact } from '@/data/contact'
</script>

<template>
  <footer class="w-full border-t border-border-custom bg-primary-bg py-12 mt-auto">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        
        <!-- Left Side: Name and Role -->
        <div class="space-y-2">
          <div class="font-heading font-bold text-sm tracking-widest text-primary-text uppercase">
            MUHAMMAD
          </div>
          <div class="font-sans text-xs text-secondary-text">
            Software Engineer / Web Developer
          </div>
        </div>

        <!-- Right Side: Copyright & Socials -->
        <div class="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 w-full md:w-auto justify-between md:justify-end">
          
          <!-- Social Icons (only rendered if URL is provided) -->
          <div class="flex items-center gap-6">
            <!-- GitHub SVG -->
            <a 
              v-if="contact.github" 
              :href="contact.github" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-secondary-text hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors duration-200" 
              aria-label="GitHub (opens in a new tab)"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            
            <!-- LinkedIn SVG -->
            <a 
              v-if="contact.linkedin" 
              :href="contact.linkedin" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-secondary-text hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors duration-200" 
              aria-label="LinkedIn (opens in a new tab)"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z"/>
              </svg>
            </a>

            <!-- Instagram SVG -->
            <a 
              v-if="contact.instagram" 
              :href="contact.instagram" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="text-secondary-text hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors duration-200" 
              aria-label="Instagram (opens in a new tab)"
            >
              <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <!-- Email SVG -->
            <a 
              v-if="contact.email" 
              :href="`mailto:${contact.email}`" 
              class="text-secondary-text hover:text-primary-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded transition-colors duration-200" 
              aria-label="Email"
            >
              <svg class="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>

          <div class="text-xs font-sans text-secondary-text">
            &copy; {{ new Date().getFullYear() }} MUHAMMAD. All rights reserved.
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>

