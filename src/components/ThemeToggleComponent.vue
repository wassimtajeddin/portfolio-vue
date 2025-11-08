<template>
  <button id="themeToggle" class="theme-toggle" @click="toggleTheme">
    <i :class="themeIcon"></i>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  data() {
    return {
      currentTheme: 'light'
    }
  },
  computed: {
    themeIcon() {
      return this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun'
    }
  },
  mounted() {
    this.currentTheme = localStorage.getItem('theme') || 'light'
    this.applyTheme(this.currentTheme)
  },
  methods: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark'
      this.applyTheme(this.currentTheme)
      localStorage.setItem('theme', this.currentTheme)
    },
    applyTheme(theme) {
      document.body.setAttribute('data-theme', theme)
    }
  }
}
</script>
<style scoped>

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--secondary-color);
  border: 1px solid var(--accent-color);
  border-radius: 50%;
  width: 50px;
  height: 50px;
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

.theme-toggle {
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
}

.theme-toggle i {
  font-size: 1.2rem;
}

</style>