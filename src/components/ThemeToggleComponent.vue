<template>
  <button id="themeToggle" class="theme-toggle" @click="toggleTheme">
    <i :class="themeIcon"></i>
  </button>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'

const notification = inject('notification')
const currentTheme = ref('light')

const themeIcon = computed(() => 
  currentTheme.value === 'light' ? 'fas fa-moon' : 'fas fa-sun'
)

function applyTheme(theme) {
  document.body.setAttribute('data-theme', theme)
}

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark'
  applyTheme(currentTheme.value)
  localStorage.setItem('theme', currentTheme.value)
  
  const themeName = currentTheme.value === 'dark' ? 'Dark' : 'Light'
  notification.value?.addNotification(`${themeName} mode activated`, 'info')
}

onMounted(() => {
  currentTheme.value = localStorage.getItem('theme') || 'light'
  applyTheme(currentTheme.value)
})
</script>

<style scoped>

.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  background: var(--secondary-color);
  border: 1px solid var(--accent-color);
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: var(--transition);
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.theme-toggle i {
  font-size: 1.5rem;
  color: var(--accent-color);
  transition: var(--transition);
}

</style>