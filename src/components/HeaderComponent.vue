<template>
  <header>
    <ThemeToggle />
    <div class="header-container">
      <h1>Wassim Tajeddin</h1>
      <img src="../assets/ProfilePicture.png" alt="Photo of Wassim Tajeddin" class="profile-pic">
      <nav>
        <router-link to="/" :class="{ active: $route.path === '/' }">Home</router-link>
        <router-link to="/cv" :class="{ active: $route.path === '/cv' }">CV</router-link>
        <router-link to="/projects" :class="{ active: $route.path === '/projects' }">Projects</router-link>
        <router-link to="/contact" :class="{ active: $route.path === '/contact' }">Contact</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import ThemeToggle from '@/components/ThemeToggleComponent.vue'
</script>
<style scoped>

.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.5rem 2rem;
  background: var(--dark-bg);
  color: var(--text-color);
  border-bottom: 1px solid rgba(0, 212, 170, 0.3);
  position: relative;
  overflow: hidden;
}

.header-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, rgba(0, 212, 170, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

[data-theme="light"] .header-container::before {
  background: linear-gradient(45deg, rgba(0, 122, 99, 0.05) 0%, transparent 70%);
}

.profile-pic {
  width: 170px;
  height: 170px;
  border-radius: 50%;
  object-fit: cover;
  margin: 1rem 0;
  border: 2px solid var(--accent-color);
  box-shadow: 0 0 20px rgba(0, 212, 170, 0.3);
  transition: var(--transition);
}

.profile-pic:hover {
  transform: scale(1.03);
  box-shadow: 0 0 25px rgba(0, 212, 170, 0.5);
}

header h1::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-color);
  transition: width 0.5s ease;
}

.header-container:hover header h1::after {
  width: 100%;
}

header h1 {
  margin-bottom: 1rem;
  font-weight: 700;
  color: var(--accent-color);
  font-size: 2.2rem;
  position: relative;
  display: inline-block;
}

@media (max-width: 768px) {
  .header-container {
    padding: 1.2rem;
  }

  header h1 {
    font-size: 1.8rem;
  }

  .profile-pic {
    width: 140px;
    height: 140px;
  }

  nav {
    gap: 1rem;

  }

  nav a {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    padding: 1rem;
  }

  header h1 {
    font-size: 1.6rem;
  }

  .profile-pic {
    width: 120px;
    height: 120px;
  }

  main {
    padding: 1rem;
  }
}
</style>