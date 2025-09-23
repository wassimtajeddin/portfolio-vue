<template>
  <header>
    <div class="theme-toggle" id="themeToggle">
        <i class="fas fa-moon"></i>
    </div>
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
export default {
  name: 'HeaderComponent'
}
</script>