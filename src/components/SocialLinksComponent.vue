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
.social-links {
 display: flex;
 gap: 1rem;
 justify-content: center;
 margin: 1rem 0;
}

.social-link {
 display: flex;
 align-items: center;
 justify-content: center;
 width: 45px;
 height: 45px;
 background: var(--secondary-color);
 color: var(--accent-color);
 border-radius: 50%;
 text-decoration: none;
 transition: all 0.3s ease;
 border: 2px solid transparent;
}

.social-link:hover {
 background: var(--accent-color);
 color: black;
 transform: translateY(-3px);
 box-shadow: 0 5px 15px rgba(0, 212, 170, 0.4);
}

.social-link i {
 font-size: 1.2rem;
}

</style>