<template>
  <div class="social-links">

    <div
      v-for="link in socialLinks"
      :key="link.name"
      class="social-link-wrapper"
    >
      <span class="tooltip">{{ link.name }}</span>
      <a
        :href="link.url"
        :aria-label="link.name"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
        @contextmenu.prevent="copyLink(link)"
        @click="trackClick(link)"
        @keydown.enter.prevent="openLink(link)"
        @keydown.space.prevent="openLink(link)"
        tabindex="0"
      >
        <i :class="link.icon"></i>
      </a>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

// Inject global notification system from App.vue
const notification = inject('notification')

// Right-click to copy the link or email address to clipboard
const copyLink = async (link) => {
  const text = link.url.startsWith('mailto:') ? link.url.replace('mailto:', '') : link.url
  await navigator.clipboard.writeText(text)
  const message = link.name === 'Email' ? 'Email copied!' : `${link.name} link copied!`
  notification.value.addNotification(message, 'info')
}

// Track clicks for analytics (logged to console)
const trackClick = (link) => {
  console.log(`[Analytics] Clicked: ${link.name} — ${new Date().toISOString()}`)
}

// Open link in a new tab (used for keyboard navigation)
const openLink = (link) => {
  window.open(link.url, '_blank', 'noopener,noreferrer')
}

// Social media links configuration
const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/wassimtajeddin',
    icon: 'fab fa-github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/wassim-tajeddin-82a563201/',
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

.social-link-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--secondary-color);
  color: var(--accent-color);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.social-link-wrapper:hover .tooltip {
  opacity: 1;
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
  outline: none;
}

.social-link:hover,
.social-link:focus {
  background: var(--accent-color);
  color: black;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 212, 170, 0.4);
}

.social-link i {
  font-size: 1.2rem;
}

</style>