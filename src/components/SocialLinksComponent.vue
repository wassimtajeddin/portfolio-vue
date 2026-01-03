<template>
  <div class="social-links">
    <a 
      v-for="link in socialLinks" 
      :key="link.name"
      :href="link.url" 
      :aria-label="link.name"
      target="_blank" 
      rel="noopener noreferrer"
      class="social-link"
    >
      <i :class="link.icon"></i>
    </a>
  </div>
</template>

<script setup>
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/wassimtajeddin',
    icon: 'fab fa-github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/wassim-tajeddin',
    icon: 'fab fa-linkedin'
  },
  {
    name: 'Email',
    url: 'mailto:wassim.tajeddin@gmail.com',
    icon: 'fas fa-envelope'
  }
]
</script>

<style scoped>
</style>