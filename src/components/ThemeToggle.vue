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
      return this.currentTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun'
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