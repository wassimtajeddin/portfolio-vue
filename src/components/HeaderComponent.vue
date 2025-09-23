<template>
  <header>
    <ThemeToggle />
    <div class="header-container">
      <h1>Wassim Tajeddin</h1>
      <img src="../assets/Wassim.png" alt="Photo of Wassim Tajeddin" class="profile-pic">
      <nav>
        <router-link to="/" :class="{ active: $route.path === '/' }">Home</router-link>
        <router-link to="/cv" :class="{ active: $route.path === '/cv' }">CV</router-link>
        <router-link to="/projects" :class="{ active: $route.path === '/projects' }">Projects</router-link>
        <router-link to="/contact" :class="{ active: $route.path === '/contact' }">Contact</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
import ThemeToggle from '@/components/ThemeToggle.vue'
export default {
   components: {
    ThemeToggle
  },
  name: 'HeaderComponent'
}
</script>